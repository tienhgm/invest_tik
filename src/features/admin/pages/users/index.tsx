import React, { useState, useEffect } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Button, Tag, Select, Input, Tooltip, Modal, Skeleton } from 'antd';
import { getColorStatusAccount, getNameStatusAccount, formatDate, getNameStatusEKYC, getColorEKYC } from 'helper/generate';
import TableUser from 'features/admin/components/TableUser';
import { useHistory } from 'react-router-dom';
import {
    UndoOutlined,
    PlusOutlined
} from '@ant-design/icons';
import './index.scss';
import adminApi from 'apis/admin';
import { errorMes, successMes } from 'helper/notify';
import { useAppSelector } from 'app/hooks';
function Users() {
    const columns: ColumnsType<any> = [
        {
            title: 'STT',
            dataIndex: 'id',
        },
        {
            title: 'Email',
            width: 100,
            dataIndex: 'email',
        },
        {
            title: 'Họ và tên',
            width: 100,
            dataIndex: 'name',
        },
        {
            title: 'Phân quyền',
            width: 150,
            key: 'updated_at',
            render: (user: any) => <>
                <Select
                    style={{ width: 120 }}
                    placeholder={'Quyền'}
                    value={user.role}
                    onFocus={() => setUserFocus(user)}
                    onChange={onChangeRole}
                    options={[
                        {
                            value: 0,
                            label: 'Người dùng',
                        },
                        {
                            value: 1,
                            label: 'Admin',
                        },
                    ]}
                /></>,
        },
        {
            title: 'Trạng thái toàn khoản',
            key: 'email_verified_at',
            render: (user: any) => <div className="actions">
                <Tag color={getColorStatusAccount(Boolean(user?.is_activated))}>
                    {getNameStatusAccount(Boolean(user?.is_activated))}
                </Tag>
            </div>,
        },
        {
            title: 'Xác minh eKYC',
            key: 'id',
            render: (user: any) => <div className="actions">
                <Tag color={getColorEKYC(Boolean(user?.is_verify))}>
                    {getNameStatusEKYC(Boolean(user?.is_verify))}
                </Tag>
            </div>,
        },
        {
            title: 'Ngày tạo tài khoản',
            key: 'created_at',
            render: (user: any) => <div>
                {formatDate(user.created_at)}
            </div>,
        },
        {
            title: '',
            fixed: 'right',
            width: 250,
            render: (user: any) => <div className="actions">
                <Button type="primary" size={'medium'} onClick={() => onDetail(user, 'detail')}>Chi tiết</Button>
                <Button type="danger" size={'medium'} onClick={() => onDetail(user, 'delete')}>Xóa</Button>
                {!user.is_activated ? <Button size={'mediu'} onClick={() => onDetail(user, 'active')}>Kich hoạt</Button> : <Button size={'mediu'} onClick={() => onDetail(user, 'active')}>Hủy kich hoạt</Button>}
            </div>,
        },
    ];
    const history = useHistory();
    const [filter, setFilter] = useState<any>({
        sort_by: 'desc',
        per_page: 10,
        name: null,
        total: 0,
        page: 1,
        email: null
    });
    let userInfo = useAppSelector((state: any) => state.user.userInfo);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [userFocus, setUserFocus] = useState<any>(null);
    const [listUser, setListUser] = useState<any>(null);
    const onDetail = (user: any, type: any) => {
        switch (type) {
            case 'delete':
                setUserFocus(user);
                setIsOpenDelete(true);
                break;
            case 'active':
                onChangeActive(user);
                break;
            case 'detail':
                history.push(`/admin/users/${user.id}`);
                break;
        }
    }
    const onSort = (value: string) => {
        setFilter((prevState: any) => ({ ...prevState, sort_by: value }));
    };
    const onChangeRole = async (value: any) => {
        try {
            const payload = { role: value };
            await adminApi.updateUser(userFocus.id, payload);
            await onGetListUsers();
            successMes('Bạn đã cập nhật thành công')
        } catch (error) {
            errorMes('Đã có lỗi xảy ra, vui lòng thử lại sau!')
        }

    }
    const onChangeActive = async (user: any) => {
        try {
            const payload = { active: !user.is_activated };
            await adminApi.updateUser(user.id, payload);
            await onGetListUsers();
            successMes('Bạn đã cập nhật thành công')
        } catch (error) {
            errorMes('Đã có lỗi xảy ra, vui lòng thử lại sau!')
        }
    }
    const onDeleteUsers = async () => {
        try {
            setLoadingDelete(true)
            const payload = {
                ids: [...selectedRowKeys]
            }
            await adminApi.deleteUsers(payload);
            await onGetListUsers();
            successMes('Bạn đã xóa người dùng thành công')
            setLoadingDelete(false)
        } catch (error) {
            setLoadingDelete(false)
            errorMes('Đã có lỗi xảy ra, vui lòng thử lại sau!')
        }
    }
    const onSelectPerPage = (value: string) => {
        setFilter((prevState: any) => ({ ...prevState, per_page: value }));
    };
    const onChangeFilterName = (e: any) => {
        setFilter((prevState: any) => ({ ...prevState, name: e.target.value }));
    };
    const onChangeFilterEmail = (e: any) => {
        setFilter((prevState: any) => ({ ...prevState, email: e.target.value }));
    };
    const onChangePage = (value: any) => {
        setFilter((prevState: any) => ({ ...prevState, page: value }));
    }
    const onResetFilter = () => {
        setFilter({
            sort_by: 'desc',
            page: 1,
            per_page: 10,
            name: null,
            email: null
        })
        setSelectedRowKeys([])
    }
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const onGetListUsers = async () => {
        try {
            setLoading(true)
            let payload = { ...filter }
            const { data } = await adminApi.getListUsers(payload);
            if (data) {
                let mapData = data.data.map((item: any) => {
                    return { ...item, key: item.id }
                })
                mapData = mapData.filter((item: any) => item.email !== userInfo.email)
                setListUser(mapData)
                setFilter((prevState: any) => ({ ...prevState, total: data.total }));
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    const onCancelModal = () => {
        setUserFocus(null)
        setIsOpenDelete(false)
    }
    const onOkModal = async () => {
        try {
            await adminApi.deleteUser(userFocus.id);
            await onGetListUsers();
            onCancelModal();
            successMes('Bạn đã xóa thành công')
        } catch (error) {
            errorMes('Đã có lỗi, vui lòng thử lại sau!')
        }
    }
    useEffect(() => {
        setSelectedRowKeys([])
        const getData = setTimeout(() => {
            onGetListUsers();
        }, 500)
        return () => {
            clearTimeout(getData)
        }
    }, [filter.per_page, filter.sort_by, filter.page, filter.name, filter.email])

    return (
        <>
            <Modal title="Xóa người dùng" visible={isOpenDelete} onOk={onOkModal} onCancel={onCancelModal} okText="Xóa" cancelText="Hủy">
                <p>Bạn có muốn xóa người dùng?</p>
            </Modal>
            <div className="users">
                <h4>Quản lý người dùng</h4>
                <div className="users__filter">
                    <Tooltip placement="top" title={'Tạo mới người dùng'}>
                        <PlusOutlined onClick={() => history.push(`/admin/users/create`)} style={{ padding: '0.4rem', fontSize: '1.1rem', backgroundColor: '#fff', border: '1px solid #ddd', cursor: 'pointer' }} />
                    </Tooltip>
                    <Tooltip placement="top" title={'Đặt lại'}>
                        <UndoOutlined onClick={onResetFilter} style={{ padding: '0.4rem', fontSize: '1.1rem', backgroundColor: '#fff', border: '1px solid #ddd', cursor: 'pointer' }} />
                    </Tooltip>
                    <Select
                        style={{ width: 120 }}
                        placeholder={'Sắp xếp'}
                        value={filter.sort_by}
                        onChange={onSort}
                        options={[
                            {
                                value: 'asc',
                                label: 'Tăng dần',
                            },
                            {
                                value: 'desc',
                                label: 'Giảm dần',
                            },
                        ]}
                    />
                    <Select
                        style={{ width: 100 }}
                        placeholder={'Số bản ghi'}
                        value={filter.per_page}
                        onChange={onSelectPerPage}
                        options={[
                            {
                                value: 10,
                            },
                            {
                                value: 20,
                            },
                            {
                                value: 50,
                            },
                        ]}
                    />
                    <Input value={filter.name} onChange={onChangeFilterName} placeholder="Tìm theo tên" />
                    <Input value={filter.email} onChange={onChangeFilterEmail} placeholder="Tìm theo email" />
                    <Button disabled={selectedRowKeys.length === 0} loading={loadingDelete} onClick={onDeleteUsers} type="danger" size={'medium'}>Xóa người dùng</Button>
                </div>
            </div>
            {
                listUser ? <div>
                    <TableUser data={listUser} columns={columns} rowSelection={rowSelection} loading={loading} perPage={filter.per_page} page={filter.page} total={filter.total} onChangePage={onChangePage} />
                </div> : <Skeleton active/>
            }

        </>
    );
}

export default Users;

import React, { useState, useEffect } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Button, Tag, Select, Input, Tooltip, Modal } from 'antd';
import { getColorStatusAccount, getNameStatusAccount, formatDate } from 'helper/generate';
import TableUser from 'features/admin/components/TableUser';
import { useHistory } from 'react-router-dom';
import {
    UndoOutlined,
    PlusOutlined
} from '@ant-design/icons';
import './index.scss';
import adminApi from 'apis/admin';
import { errorMes, successMes } from 'helper/notify';
import fundApi from 'apis/funds';

function FundManagement() {
    const columns: ColumnsType<any> = [
        {
            title: 'STT',
            dataIndex: 'id',
        },
        {
            title: 'Tên quỹ',
            dataIndex: 'name',
        },
        {
            title: 'Nội dung quỹ',
            dataIndex: 'email',
        },
        {
            title: 'Ngày tạo quỹ',
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
        email: null
    });
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
            await onGetListFunds();
            successMes('Bạn đã cập nhật thành công')
        } catch (error) {
            errorMes('Đã có lỗi xảy ra, vui lòng thử lại sau!')
        }

    }
    const onChangeActive = async (user: any) => {
        try {
            const payload = { active: !user.is_activated };
            await adminApi.updateUser(user.id, payload);
            await onGetListFunds();
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
            await onGetListFunds();
            successMes('Bạn đã xóa người dùng thành công')
            setLoadingDelete(false)
        } catch (error) {
            setLoadingDelete(false)
            errorMes('Đã có lỗi xảy ra, vui lòng thử lại sau!')
        }
    }
    const onSelectper_page = (value: string) => {
        setFilter((prevState: any) => ({ ...prevState, per_page: value }));
    };
    const onChangeFilterName = (e: any) => {
        setFilter((prevState: any) => ({ ...prevState, name: e.target.value }));
    };
    const onChangeFilterEmail = (e: any) => {
        setFilter((prevState: any) => ({ ...prevState, email: e.target.value }));
    };
    const onResetFilter = () => {
        setFilter({
            sort_by: 'desc',
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
    const onGetListFunds = async () => {
        try {
            setLoading(true)
            let payload = { ...filter }
            const { data } = await fundApi.getListFunds();
            if (data) {
              
                setListUser(data)
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
            await onGetListFunds();
            onCancelModal();
            successMes('Bạn đã xóa thành công')
        } catch (error) {
            errorMes('Đã có lỗi, vui lòng thử lại sau!')
        }
    }
    useEffect(() => {
        setSelectedRowKeys([])
        onGetListFunds();
        return () => {

        }
    }, [filter.per_page, filter.name, filter.email, filter.sort_by])

    return (
        <>
            <Modal title="Xóa người dùng" visible={isOpenDelete} onOk={onOkModal} onCancel={onCancelModal} okText="Xóa" cancelText="Hủy">
                <p>Bạn có muốn xóa người dùng?</p>
            </Modal>
            <div className="funds">
                <h4>Quản lý người dùng</h4>
                <div className="funds__filter">
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
                        onChange={onSelectper_page}
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
                listUser && <div>
                    <TableUser data={listUser} columns={columns} rowSelection={rowSelection} loading={loading} perPage={filter.per_page} />
                </div>
            }

        </>
    );
}

export default FundManagement;

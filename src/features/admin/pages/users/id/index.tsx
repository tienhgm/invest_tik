import React, { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Breadcrumb, Card, Form, Select, Input, Popconfirm, Button, Tabs, Tooltip, Modal, Tag } from 'antd';
import {
    UndoOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './index.scss'
import adminApi from 'apis/admin';
import { errorMes, successMes } from 'helper/notify';
import { formatDate, formatDateVN, removeString, getNameStatusNotify, getColorStatusAccount } from 'helper/generate';
import { REGEX_CHECK_EMAIL } from 'helper/regex';
import './index.scss';
import FrontImg from 'assets/images/front_img.png';
import BackImg from 'assets/images/back_img.png';
import TableNotify from '../../../components/TableUser';
import TableTransaction from '../../../components/TableUser';
import TablePackages from '../../../components/TableUser';
import { TRANSACTION_TYPE } from 'enum';
const { TabPane } = Tabs;
function DetailUser() {
    const history = useHistory();
    const match = useRouteMatch();
    const onNavigate = (link: string) => {
        history.push(link);
    };
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const [initFormData, setInitFormData] = useState<any>({});
    const [listNotify, setListNotify] = useState<any>([])
    const [user, setUser] = useState<any>(null)
    const [listTransaction, setListTransaction] = useState<any>(null);
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState<any>({
        sort_by: 'desc',
        page: 1,
        total: 0,
        per_page: 10,
        message: null,
    });
    const [keyTab, setKeyTab] = useState<any>('1');
    const onChangeFilterMessage = (e: any) => {
        setFilter((prevState: any) => ({ ...prevState, message: e.target.value }));
    };
    const onResetFilter = () => {
        setFilter({
            sort_by: 'desc',
            page: 1,
            total: 0,
            per_page: 10,
            message: null,
        })
    }
    const onGetDetailUser = async () => {
        try {
            const { data } = await adminApi.getDetailUser(match.params.id)
            if (data) {
                setUser(data)
                setInitFormData(data)
                form.setFieldsValue({
                    email: data?.email,
                });
            }
        } catch (error) {
        }
    }
    const onGetListNotify = async () => {
        try {
            setLoading(true)
            const payload = { ...filter }
            const { data } = await adminApi.getListNotify(match.params.id, payload)
            if (data) {
                let mapData = data.data.map((item: any) => {
                    return { ...item, key: item.id }
                })
                setListNotify(mapData)
                setFilter((prevState: any) => ({ ...prevState, total: data.total }));
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
        }
    }
    const onFinishFailed = (errorInfo: any) => { };
    const onFinish = async (values: any) => {
        console.log(values);

        if (initFormData.email === values.email) return
        try {
            const payload = { email: values.email };
            await adminApi.updateUser(match.params.id, payload);
            onGetDetailUser();
            successMes('Bạn đã thay đổi thông tin thành công');
        } catch (error: any) {
            errorMes('Đã có lỗi, vui lòng thử lại sau!')
            form.setFieldsValue({
                email: initFormData?.email,
            });
        }
    };
    const onConfirmDelete = async () => {
        try {
            await adminApi.deleteUser(match.params.id);
            onNavigate('/admin/users');
            successMes('Bạn đã xóa thành công')
        } catch (error) {
            errorMes('Đã có lỗi, vui lòng thử lại sau!')
        }
    }
    useEffect(() => {
        onResetFilterTs()
        onResetFilter()
        onResetFilterPk()
        switch (keyTab) {
            case '1':
                onGetDetailUser();
                break;
            case '2':
                onGetListNotify();
                break;
            case '3':
                onGetlistTransactions();
                break;
            case '4':
                onGetlistPackages();
                break;
        }
        return () => {
        }
    }, [keyTab])
    useEffect(() => {
        const getData = setTimeout(() => {
            onGetListNotify();
        }, 500)
        return () => {
            clearTimeout(getData)
        }
    }, [filter.per_page, filter.message, filter.sort_by, filter.page])
    const onChangeActive = async (value: any) => {
        try {
            const payload = { active: value };
            await adminApi.updateUser(match.params.id, payload);
            await onGetDetailUser();
            successMes('Bạn đã cập nhật thành công')
        } catch (error) {
            errorMes('Đã có lỗi xảy ra, vui lòng thử lại sau!')
        }
    }
    const onChangeKey = (key: string) => {
        setKeyTab(key);
    };
    const listTab = [
        { name: 'Thông tin cá nhân', key: '1' },
        { name: 'Thông báo', key: '2' },
        { name: 'Lịch sử giao dịch', key: '3' },
        { name: 'Các gói đầu tư', key: '4' },
    ];
    const onSort = (value: string) => {
        setFilter((prevState: any) => ({ ...prevState, sort_by: value }));
    };
    const onChangePage = (value: any) => {
        setFilter((prevState: any) => ({ ...prevState, page: value }));
    }
    const columnsNotify: ColumnsType<any> = [
        {
            title: 'STT',
            dataIndex: 'id',
        },
        {
            title: 'Nội dung',
            dataIndex: 'message',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (record: any) => <div>
                {getNameStatusNotify(record.status)}
            </div>,
        },
        {
            title: 'Ngày tạo thông báo',
            key: 'created_at',
            render: (record: any) => <div>
                {formatDate(record.created_at)}
            </div>,
        },
    ];
    const [isOpenNoti, setIsOpenNoti] = useState(false)
    const [contentNoti, setContentNoti] = useState<any>('');
    const onChangeContentNoti = (e: any) => {
        setContentNoti(e.target.value);
    }
    const onOkModal = async () => {
        try {
            const payload = {
                message: contentNoti
            }
            await adminApi.createNotify(match.params.id, payload);
            await onGetListNotify();
            setIsOpenNoti(false)
            successMes('Bạn tạo mới thông báo thành công')
        } catch (error) {
            errorMes('Đã có lỗi, vui lòng thử lại sau!')

        }
    }

    const columnsTransaction: ColumnsType<any> = [
        {
            title: 'Mã tham chiếu',
            dataIndex: 'id',
            width: 200,
        },
        {
            title: 'Tên người giao dịch',
            dataIndex: 'purchaser_name',
            width: 200,
        },
        {
            title: 'Số tiền giao dịch',
            dataIndex: 'amount',
            key: 'transfer_amount',
            render: (value: any) => (
                <div>
                    {value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ
                </div>
            ),
        },
        {
            title: 'Loại giao dịch',
            key: 'type',
            render: (record: any) => <div className="actions">
                <Tag color={getColorStatusAccount(!Boolean(record?.type))}>
                    {record.type === TRANSACTION_TYPE.DEPOSIT ? 'NẠP TIỀN' : 'RÚT TIỀN'}
                </Tag>
            </div>,
        },
        {
            title: 'Trạng thái',
            key: '',
            render: (_: any, record: any) => (
                <Tag color={
                    record.status === 1
                        ? '#87d068'
                        : record.status === -1
                            ? '#f50'
                            : !record.status
                                ? '#f9bf57'
                                : ''} key={record.name
                                }>
                    {record.status === 1
                        ? 'Thành công'
                        : record.status === -1
                            ? 'Thất bại'
                            : !record.status
                                ? 'Đang chờ'
                                : ''}
                </Tag>
            ),
        },
        {
            title: 'Ngày giao dịch',
            key: 'created_at',
            render: (record: any) => <div>
                {formatDate(record.created_at)}
            </div>,
        },
    ];
    const onGetlistTransactions = async () => {
        try {
            setLoading(true)
            let payload = { ...filterTs, purchaser_id: match.params.id }
            const { data } = await adminApi.getListTransaction(payload);
            if (data) {
                let mapData = data.data.map((item: any) => {
                    return { ...item, key: item.id }
                })
                setListTransaction(mapData)
                setFilterTs((prevState: any) => ({ ...prevState, total: data.total }));
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    const [filterTs, setFilterTs] = useState<any>({
        sort_by: 'desc',
        page: 1,
        total: 0,
        per_page: 10,
        ref: null,
        purchaser_name: null,
    });
    const onResetFilterTs = () => {
        setFilterTs({
            sort_by: 'desc',
            per_page: 10,
            purchaser_name: null,
            ref: null,
            page: 1,
        })
    }
    const onSortTs = (value: string) => {
        setFilterTs((prevState: any) => ({ ...prevState, sort_by: value }));
    };
    const onChangePageTs = (value: any) => {
        setFilterTs((prevState: any) => ({ ...prevState, page: value }));
    }
    const onSelectPerPageTs = (value: string) => {
        setFilterTs((prevState: any) => ({ ...prevState, per_page: value }));
    };
    const onChangeFilterRefTs = (e: any) => {
        setFilterTs((prevState: any) => ({ ...prevState, ref: e.target.value }));
    };
    useEffect(() => {
        const getData = setTimeout(() => {
            onGetlistTransactions();
        }, 500)
        return () => {
            clearTimeout(getData)
        }
    }, [filterTs.per_page, filterTs.purchaser_name, filterTs.sort_by, filterTs.ref, filterTs.page])


    const columnsPackages: ColumnsType<any> = [
        {
            title: 'STT',
            dataIndex: 'id',
            width: 80,
        },
        {
            title: 'Tên gói đầu tư',
            dataIndex: 'name',
            width: 300,
        },
        {
            title: 'Loại gói đầu tư',
            width: 300,
            key: 'is_default',
            render: (record: any) => <div className="actions">
                {record.is_default ? 'GÓI LINH HOẠT' : 'GÓI GỢI Ý'}
            </div>,
        },
        {
            title: 'Tỉ lệ phân bổ',
            key: 'updated_at',
            render: (record: any) => (
                <div>
                    {record.funds.map((item: any) => (
                        <>{item.code}: {item.pivot.allocation_percentage}% <br /></>
                    ))}
                </div>
            ),
        },
        {
            title: 'Ngày tạo',
            width: 200,
            key: 'created_at',
            render: (record: any) => <div>
                {formatDate(record.created_at)}
            </div>,
        },
    ];
    const [listPackages, setListPackages] = useState<any>([]);
    const [filterPk, setFilterPk] = useState({
        sort_by: 'desc',
        per_page: 10,
        fund_code: null,
        package_name: null,
        fund_name: null,
        page: 1,
    })
    const onResetFilterPk = () => {
        setFilterPk({
            sort_by: 'desc',
            per_page: 10,
            fund_code: null,
            package_name: null,
            fund_name: null,
            page: 1,
        })
    }
    const onGetlistPackages = async () => {
        try {
            setLoading(true)
            let payload = { ...filterPk, owner_id: match.params.id }
            const { data } = await adminApi.getListPackages(payload);
            if (data) {
                let mapData = data.data.map((item: any) => {
                    return { ...item, key: item.id }
                })
                setListPackages(mapData)
                setFilterPk((prevState: any) => ({ ...prevState, total: data.total }));
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    const onSortPk = (value: string) => {
        setFilterPk((prevState: any) => ({ ...prevState, sort_by: value }));
    };
    const onChangePagePk = (value: any) => {
        setFilterPk((prevState: any) => ({ ...prevState, page: value }));
    }
    const onSelectPerPagePk = (value: string) => {
        setFilterPk((prevState: any) => ({ ...prevState, per_page: value }));
    };
    const onChangeFilterNamePk = (e: any) => {
        setFilterPk((prevState: any) => ({ ...prevState, package_name: e.target.value }));
    };
    useEffect(() => {
        const getData = setTimeout(() => {
            onGetlistPackages();
        }, 500)
        return () => {
            clearTimeout(getData)
        }
    }, [filterPk.per_page, filterPk.package_name, filterPk.sort_by, filterPk.page])
    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <span className="link" onClick={() => onNavigate('/admin/users')}>
                        Quản lý người dùng
                    </span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{match.params.id}</Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <Tabs defaultActiveKey={keyTab} onChange={onChangeKey} style={{ marginTop: '1rem' }}>
                {listTab.map((item: any) => (
                    <TabPane tab={item.name} key={item.key}></TabPane>
                ))}
            </Tabs>
            {keyTab === '1' && user && (
                <Card className="profile">
                    <div className="profile__block">
                        <div className="profile__block--title">Trạng thái tài khoản</div>
                        <Select
                            style={{ width: 200 }}
                            placeholder={'Trạng thái tài khoản'}
                            value={user.is_activated}
                            onChange={onChangeActive}
                            options={[
                                {
                                    value: false,
                                    label: 'Chưa kích hoạt',
                                },
                                {
                                    value: true,
                                    label: 'Đã kích hoạt',
                                },
                            ]}
                        />
                    </div>
                    <Form
                        form={form}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 24 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <div className="profile__block">
                            <div className="profile__block--title">Thông tin cá nhân</div>

                            <div className="profile__block--content">
                                <div style={{ width: '100%' }}>
                                    Họ và tên
                                    <Input disabled placeholder="Họ và tên" value={user?.name} />
                                </div>
                            </div>
                            <div className="profile__block--content">
                                <div style={{ width: '100%' }}>
                                    Email
                                    <Form.Item
                                        style={{ width: '100%' }}
                                        name={'email'}
                                        rules={[
                                            { required: true, message: t('validate.email_required') },
                                            { pattern: REGEX_CHECK_EMAIL, message: t('validate.email_invalid') },
                                            { max: 50, message: t('validate.max_length_email') },
                                        ]}
                                    >
                                        <Input placeholder="Email" />
                                    </Form.Item>
                                </div>
                                <div style={{ width: '100%' }}>
                                    Giới tính
                                    <Input disabled placeholder="Giới tính" value={user?.gender} />
                                </div>
                            </div>
                            <div className="profile__block--content">
                                <div style={{ width: '100%' }}>
                                    Địa chỉ
                                    <Form.Item
                                        style={{ width: '100%' }}
                                        rules={[{ max: 255, message: t('validate.max_length_address') }]}
                                    >
                                        <Input disabled placeholder="Địa chỉ" />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                        <div className="profile__block">
                            <div className="profile__block--title">Thông tin CCCD</div>
                            <div className="profile__block--content">
                                <div style={{ width: '100%' }}>
                                    Số CCCD
                                    <Input disabled placeholder="Số CCCD" value={user?.identity_number} />
                                </div>
                                <div style={{ width: '100%' }}>
                                    Sinh nhật
                                    <Input disabled placeholder="Sinh nhật" value={user?.dob ? formatDate(user?.dob) : null} />
                                </div>
                            </div>
                            <div className="profile__block--content">
                                <div style={{ width: '100%' }}>
                                    Ngày bắt đầu
                                    <Input disabled placeholder="Ngày bắt đầu" value={user?.issue_date ? formatDate(user?.issue_date) : null} />
                                </div>
                                <div style={{ width: '100%' }}>
                                    Ngày hết hạn
                                    <Input disabled placeholder="Ngày hết hạn" value={user?.valid_date ? formatDateVN(user?.valid_date) : null} />
                                </div>
                            </div>
                            <div className="profile__block--content">
                                <div style={{ width: '100%' }}>
                                    Địa điểm
                                    <Input disabled placeholder="Địa điểm làm CCCD" value={user?.issue_place ? user?.issue_place : null} />
                                </div>
                            </div>
                            <div className="profile__block--content">
                                <div style={{ width: '100%' }}>
                                    <div> Mặt trước</div>
                                    {user.identity_image_front ? <img
                                        src={removeString(user?.identity_image_front, '/api')}
                                        width={300}
                                        height={180}
                                        alt="front_img"
                                    /> : <img width={300} height={180} src={FrontImg} alt="img_front" />
                                    }

                                </div>
                                <div style={{ width: '100%' }}>
                                    <div> Mặt sau</div>

                                    {user.identity_image_back ? <img
                                        src={removeString(user?.identity_image_back, '/api')}
                                        width={300}
                                        height={180}
                                        alt="back_img"
                                    /> : <img width={300} height={180} src={BackImg} alt="img_back" />}
                                </div>
                            </div>
                        </div>
                        <Button
                            style={{ marginTop: '3rem', marginBottom: '0.4rem', width: '100%' }}
                            size="medium"
                            type="primary"
                            htmlType="submit"
                        >
                            Thay đổi
                        </Button>
                        <Popconfirm placement="top" title={'Bạn có muốn xóa người dùng này?'} onConfirm={onConfirmDelete} okText="Xác nhận" cancelText="Hủy">
                            <Button style={{ width: '100%' }} type="danger" size={'medium'} >Xóa</Button>
                        </Popconfirm>
                    </Form>
                </Card>
            )}
            {keyTab === '2' && listNotify && <>
                <Modal title="Tạo thông báo" visible={isOpenNoti} onOk={onOkModal} onCancel={() => setIsOpenNoti(false)} okText="Tạo mới" cancelText="Hủy">
                    <Input placeholder="Nhập nội dung thông báo..." value={contentNoti} onChange={onChangeContentNoti} />
                </Modal>
                <div className="users">
                    <h4>Quản lý thông báo</h4>
                    <div className="users__filter">
                        <Tooltip placement="top" title={'Tạo mới thông báo'}>
                            <PlusOutlined onClick={() => setIsOpenNoti(true)} style={{ padding: '0.4rem', fontSize: '1.1rem', backgroundColor: '#fff', border: '1px solid #ddd', cursor: 'pointer' }} />
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
                        <Input value={filter.message} onChange={onChangeFilterMessage} placeholder="Tìm theo nội dung" />
                    </div>
                </div>
                <TableNotify data={listNotify} columns={columnsNotify} loading={loading} perPage={filter.per_page} page={filter.page} total={filter.total} onChangePage={onChangePage} />
            </>}
            {keyTab === '3' && listTransaction && <>
                <div className="users">
                    <h4>Quản lý giao dịch</h4>
                    <div className="users__filter">
                        <Tooltip placement="top" title={'Đặt lại'}>
                            <UndoOutlined onClick={onResetFilterTs} style={{ padding: '0.4rem', fontSize: '1.1rem', backgroundColor: '#fff', border: '1px solid #ddd', cursor: 'pointer' }} />
                        </Tooltip>
                        <Select
                            style={{ width: 120 }}
                            placeholder={'Sắp xếp'}
                            value={filterTs.sort_by}
                            onChange={onSortTs}
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
                            value={filterTs.per_page}
                            onChange={onSelectPerPageTs}
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
                        <Input value={filterTs.ref} onChange={onChangeFilterRefTs} placeholder="Tìm theo tham chiếu" />
                    </div>
                </div>
                <TableTransaction data={listTransaction} columns={columnsTransaction} loading={loading} perPage={filterTs.per_page} page={filterTs.page} total={filterTs.total} onChangePage={onChangePageTs} />
            </>}
            {keyTab === '4' && listPackages && <>
                <div className="users">
                    <h4>Quản lý gói đầu tư</h4>
                    <div className="users__filter">
                        <Tooltip placement="top" title={'Đặt lại'}>
                            <UndoOutlined onClick={onResetFilterPk} style={{ padding: '0.4rem', fontSize: '1.1rem', backgroundColor: '#fff', border: '1px solid #ddd', cursor: 'pointer' }} />
                        </Tooltip>
                        <Select
                            style={{ width: 120 }}
                            placeholder={'Sắp xếp'}
                            value={filterPk.sort_by}
                            onChange={onSortPk}
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
                            value={filterPk.per_page}
                            onChange={onSelectPerPagePk}
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
                        <Input value={filterPk.package_name} onChange={onChangeFilterNamePk} placeholder="Tìm theo tên gói" />
                    </div>
                </div>
                <TablePackages data={listPackages} columns={columnsPackages} loading={loading} perPage={filterPk.per_page} page={filterPk.page} total={filterPk.total} onChangePage={onChangePagePk} />
            </>}
        </>
    );
}

export default DetailUser;
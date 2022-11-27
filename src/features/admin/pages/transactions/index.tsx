import React, { useState, useEffect } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Select, Input, Tooltip, Tag, Tabs } from 'antd';
import TableTransaction from 'features/admin/components/TableUser';
import TableTransactionFund from 'features/admin/components/TableUser';
import { TRANSACTION_TYPE } from 'enum';
import { getColorStatusAccount, formatDate } from 'helper/generate';
import {
    UndoOutlined,
} from '@ant-design/icons';
import './index.scss';
import adminApi from 'apis/admin';
const { TabPane } = Tabs;
function TransactionManagement() {
    const columns: ColumnsType<any> = [
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
                    {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ
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
    const [filter, setFilter] = useState<any>({
        sort_by: 'desc',
        page: 1,
        total: 0,
        per_page: 10,
        ref: null,
        purchaser_name: null,
    });
    const [keyTab, setKeyTab] = useState<any>('1');
    const listTab = [
        { name: 'Giao dịch của người dùng', key: '1' },
        { name: 'Giao dịch với bên Quỹ', key: '2' },
    ];
    const onChangeKey = (key: string) => {
        setKeyTab(key);
    };
    const [loading, setLoading] = useState(false);
    const [listTransaction, setListTransaction] = useState<any>(null);

    const onSort = (value: string) => {
        setFilter((prevState: any) => ({ ...prevState, sort_by: value }));
    };
    const onChangeFilterName = (e: any) => {
        setFilter((prevState: any) => ({ ...prevState, purchaser_name: e.target.value }));
    };
    const onChangeFilterRef = (e: any) => {
        setFilter((prevState: any) => ({ ...prevState, ref: e.target.value }));
    };
    const onResetFilter = () => {
        setFilter({
            sort_by: 'desc',
            per_page: 10,
            purchaser_name: null,
            ref: null,
            page: 1
        })
    }
    const onChangePage = (value: any) => {
        setFilter((prevState: any) => ({ ...prevState, page: value }));
    }
    const onSelectPerPage = (value: string) => {
        setFilter((prevState: any) => ({ ...prevState, per_page: value }));
    };
    const onGetlistTransactions = async () => {
        try {
            setLoading(true)
            let payload = { ...filter }
            const { data } = await adminApi.getListTransaction(payload);
            if (data) {
                let mapData = data.data.map((item: any) => {
                    return { ...item, key: item.id }
                })
                setListTransaction(mapData)
                setFilter((prevState: any) => ({ ...prevState, total: data.total }));
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    useEffect(() => {
        const getData = setTimeout(() => {
            onGetlistTransactions();
        }, 500)
        return () => {
            clearTimeout(getData)
        }
    }, [filter.per_page, filter.purchaser_name, filter.sort_by, filter.ref, filter.page])

    useEffect(() => {
        onResetFilterFunds();
        onResetFilter();
        switch (keyTab) {
            case '1':
                onGetlistTransactions();
                break;
            case '2':
                onGetlistTransactionsFunds();
                break;
        }
        return () => {
        }
    }, [keyTab])
    const columnsFunds: ColumnsType<any> = [
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
                    {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ
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
    const [filterFunds, setFilterFunds] = useState<any>({
        sort_by: 'desc',
        page: 1,
        total: 0,
        per_page: 10,
        ref: null,
        purchaser_name: null,
    });
    const [listTransactionFunds, setListTransactionFunds] = useState<any>(null);

    const onSortFunds = (value: string) => {
        setFilterFunds((prevState: any) => ({ ...prevState, sort_by: value }));
    };
    const onChangeFilterNameFunds = (e: any) => {
        setFilterFunds((prevState: any) => ({ ...prevState, purchaser_name: e.target.value }));
    };
    const onChangeFilterRefFunds = (e: any) => {
        setFilterFunds((prevState: any) => ({ ...prevState, ref: e.target.value }));
    };
    const onResetFilterFunds = () => {
        setFilterFunds({
            sort_by: 'desc',
            per_page: 10,
            purchaser_name: null,
            ref: null,
            page: 1
        })
    }
    const onChangePageFunds = (value: any) => {
        setFilterFunds((prevState: any) => ({ ...prevState, page: value }));
    }
    const onSelectPerPageFunds = (value: string) => {
        setFilterFunds((prevState: any) => ({ ...prevState, per_page: value }));
    };
    const onGetlistTransactionsFunds = async () => {
        try {
            setLoading(true)
            let payload = { ...filterFunds }
            const { data } = await adminApi.getListTransactionFunds(payload);
            if (data) {
                let mapData = data.data.map((item: any) => {
                    return { ...item, key: item.id }
                })
                setListTransactionFunds(mapData)
                setFilterFunds((prevState: any) => ({ ...prevState, total: data.total }));
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    useEffect(() => {
        const getData = setTimeout(() => {
            onGetlistTransactionsFunds();
        }, 500)
        return () => {
            clearTimeout(getData)
        }
    }, [filterFunds.per_page, filterFunds.purchaser_name, filterFunds.sort_by, filterFunds.ref, filterFunds.page])
    return (
        <>
            <Tabs defaultActiveKey={keyTab} onChange={onChangeKey} style={{ marginTop: '1rem' }}>
                {listTab.map((item: any) => (
                    <TabPane tab={item.name} key={item.key}></TabPane>
                ))}
            </Tabs>
            {keyTab === '1' && listTransaction &&
                <>
                    <div className="transactions">
                        <h4>Quản lý giao dịch người dùng</h4>
                        <div className="transactions__filter">
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
                            <Input value={filter.purchaser_name} onChange={onChangeFilterName} placeholder="Tìm theo tên người giao dịch" />
                            <Input value={filter.ref} onChange={onChangeFilterRef} placeholder="Tìm theo tham chiếu" />
                        </div>
                    </div>
                    <TableTransaction data={listTransaction} columns={columns} loading={loading} perPage={filter.per_page} page={filter.page} total={filter.total} onChangePage={onChangePage} />
                </>
            }
            {keyTab === '2' && listTransactionFunds &&
                <>
                    <div className="transactions">
                        <h4>Quản lý giao dịch với Quỹ</h4>
                        <div className="transactions__filter">
                            <Tooltip placement="top" title={'Đặt lại'}>
                                <UndoOutlined onClick={onResetFilterFunds} style={{ padding: '0.4rem', fontSize: '1.1rem', backgroundColor: '#fff', border: '1px solid #ddd', cursor: 'pointer' }} />
                            </Tooltip>
                            <Select
                                style={{ width: 120 }}
                                placeholder={'Sắp xếp'}
                                value={filterFunds.sort_by}
                                onChange={onSortFunds}
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
                                value={filterFunds.per_page}
                                onChange={onSelectPerPageFunds}
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
                            <Input value={filterFunds.purchaser_name} onChange={onChangeFilterNameFunds} placeholder="Tìm theo tên người giao dịch" />
                            <Input value={filterFunds.ref} onChange={onChangeFilterRefFunds} placeholder="Tìm theo tham chiếu" />
                        </div>
                    </div>
                    <TableTransactionFund data={listTransactionFunds} columns={columnsFunds} loading={loading} perPage={filterFunds.per_page} page={filterFunds.page} total={filterFunds.total} onChangePage={onChangePageFunds} />
                </>
            }
        </>
    );
}

export default TransactionManagement;

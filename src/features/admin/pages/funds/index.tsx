import React, { useState, useEffect } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Button, Select, Input, Tooltip, Modal, Skeleton } from 'antd';
import { formatDate } from 'helper/generate';
import TableFund from 'features/admin/components/TableUser';
import { useHistory } from 'react-router-dom';
import {
    UndoOutlined,
} from '@ant-design/icons';
import './index.scss';
import adminApi from 'apis/admin';
import { errorMes, successMes } from 'helper/notify';

function FundManagement() {
    const columns: ColumnsType<any> = [
        {
            title: 'STT',
            dataIndex: 'id',
            width: 70,
        },
        {
            title: 'Mã quỹ',
            dataIndex: 'code',
            width: 70,
        },
        {
            title: 'Tên quỹ',
            dataIndex: 'name',
            width: 200,
        },
        {
            title: 'Nội dung quỹ',
            width: 800,
            dataIndex: 'description',
        },
        {
            title: 'Giá hiện tại (đ)',
            key: 'current_value',
            render: (record: any) => <div>
                {(record.current_value)}đ
            </div>,
        },
        {
            title: 'Ngày tạo quỹ',
            key: 'created_at',
            render: (record: any) => <div>
                {formatDate(record.created_at)}
            </div>,
        },
        {
            title: '',
            fixed: 'right',
            width: 120,
            render: (record: any) => <div className="actions">
                <Button type="primary" size={'medium'} onClick={() => onDetail(record, 'detail')}>Chi tiết</Button>
            </div>,
        },
    ];
    const history = useHistory();
    const [filter, setFilter] = useState<any>({
        sort_by: 'desc',
        page: 1,
        total: 0,
        per_page: 10,
        code: null,
        name: null,
    });
    const [loading, setLoading] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [recordFocus, setRecordFocus] = useState<any>(null);
    const [listFund, setListFund] = useState<any>(null);
    const onDetail = (record: any, type: any) => {
        switch (type) {
            case 'delete':
                setRecordFocus(record);
                setIsOpenDelete(true);
                break;
            case 'detail':
                history.push(`/admin/funds/${record.id}`);
                break;
        }
    }
    const onSort = (value: string) => {
        setFilter((prevState: any) => ({ ...prevState, sort_by: value }));
    };
    const onChangeFilterName = (e: any) => {
        setFilter((prevState: any) => ({ ...prevState, name: e.target.value }));
    };
    const onChangeFilterCode = (e: any) => {
        setFilter((prevState: any) => ({ ...prevState, code: e.target.value }));
    };
    const onResetFilter = () => {
        setFilter({
            sort_by: 'desc',
            per_page: 10,
            name: null,
            code: null,
            page: 1
        })
    }
    const onChangePage = (value: any) => {
        setFilter((prevState: any) => ({ ...prevState, page: value }));
    }

    const onGetListFunds = async () => {
        try {
            setLoading(true)
            let payload = { ...filter }
            const { data } = await adminApi.getListFunds(payload);
            if (data) {
                let mapData = data.data.map((item: any) => {
                    return { ...item, key: item.id }
                })
                setListFund(mapData)
                setFilter((prevState: any) => ({ ...prevState, total: data.total }));
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    const onCancelModal = () => {
        setRecordFocus(null)
        setIsOpenDelete(false)
    }
    const onOkModal = async () => {
        try {
            await adminApi.deleteFund(recordFocus.id);
            await onGetListFunds();
            onCancelModal();
            successMes('Bạn đã xóa thành công')
        } catch (error) {
            errorMes('Đã có lỗi, vui lòng thử lại sau!')
        }
    }
    useEffect(() => {
        const getData = setTimeout(() => {
            onGetListFunds();
        }, 500)
        return () => {
            clearTimeout(getData)
        }
    }, [filter.per_page, filter.name, filter.sort_by, filter.code, filter.page])

    return (
        <>
            <Modal title="Xóa quỹ" visible={isOpenDelete} onOk={onOkModal} onCancel={onCancelModal} okText="Xóa" cancelText="Hủy">
                <p>Bạn có muốn xóa quỹ?</p>
            </Modal>
            <div className="funds">
                <h4>Quản lý quỹ</h4>
                <div className="funds__filter">
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
                    <Input value={filter.name} onChange={onChangeFilterName} placeholder="Tìm theo tên quỹ" />
                    <Input value={filter.code} onChange={onChangeFilterCode} placeholder="Tìm theo mã code" />
                </div>
            </div>
            {
                listFund ? <div>
                    <TableFund data={listFund} columns={columns} loading={loading} perPage={filter.per_page} page={filter.page} total={filter.total} onChangePage={onChangePage} />
                </div> : <Skeleton active/>
            }

        </>
    );
}

export default FundManagement;

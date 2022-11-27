import { Select, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import transactionApi from 'apis/transaction';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './index.scss';
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
function Transactions() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState<any>([]);
  const [sort, setSort] = useState<any>(null);
  const onGoToDetail = (link: string) => {
    history.push(link);
  };
  const columns: ColumnsType<DataType> = [
    {
      title: 'Ngày giao dịch',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => <div style={{ fontWeight: 'bold' }}>{text}</div>,
    },
    {
      title: 'Số tham chiếu',
      dataIndex: 'reference_number',
      key: 'reference_number',
    },
    {
      title: 'Số tiền giao dịch',
      dataIndex: 'transfer_amount',
      key: 'transfer_amount',
      render: (value) => (
        <div style={{ fontWeight: 'bold' }}>
          {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      key: '',
      render: (_ :any, record: any) => (
        <Tag color={ 
          record.payment_status === 1
          ? '#87d068'
          : record.payment_status === -1
          ? '#f50'
          : !record.payment_status
          ? '#f9bf57'
          : ''} key={record.name
          }>
           { record.payment_status === 1
              ? 'Thành công'
              : record.payment_status === -1
              ? 'Thất bại'
              : !record.payment_status
              ? 'Đang chờ'
              : ''}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <div
            style={{ cursor: 'pointer', color: '#32c610' }}
            onClick={() => onGoToDetail(`/transactions/${record.reference_number}`)}
          >
            Chi tiết {record.name}
          </div>
        </Space>
      ),
    },
  ];
  const getListTransactions = async () => {
    try {
      setLoading(true);
      const { data } = await transactionApi.getTransaction();
      if (data) {
        setLoading(false);
        setDataList(data);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const handleChange = (value: string) => {
    setSort(value);
  };
  useEffect(() => {
    getListTransactions();
    return () => {
      setDataList([]);
    };
  }, []);

  return (
    <div className="transactions">
      <div className="transactions__title">
        <h3>Lịch sử giao dịch</h3>
        <div>
          <Select
            style={{ width: 120 }}
            placeholder={'Sắp xếp'}
            value={sort}
            onChange={handleChange}
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
        </div>
      </div>
      <Table columns={columns} dataSource={dataList} loading={loading} />
    </div>
  );
}

export default Transactions;

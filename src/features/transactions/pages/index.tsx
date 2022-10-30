import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import transactionApi from 'apis/transaction';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
function Transactions() {
  const history = useHistory();
  const [dataList, setDataList] = useState<any>([]);
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
      render: (_, record: any) => (
        <Tag color={record.payment_status ? '#87d068' : '#f50'} key={record.name}>
          {record.payment_status ? 'Thành công' : 'Thất bại'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record: any) => (
        <Space size="middle">
          <div
            style={{ cursor: 'pointer', color: '#32c610' }}
            onClick={() => onGoToDetail(`transactions/${record.reference_number}`)}
          >
            Chi tiết {record.name}
          </div>
        </Space>
      ),
    },
  ];
  const getListTransactions = async () => {
    const { data } = await transactionApi.getTransaction();
    if (data) {
      setDataList(data);
    }
  };
  useEffect(() => {
    getListTransactions();
    return () => {
      setDataList([]);
    };
  }, []);

  return (
    <div>
      <h3>Lịch sử giao dịch</h3>
      <Table columns={columns} dataSource={dataList} />
    </div>
  );
}

export default Transactions;

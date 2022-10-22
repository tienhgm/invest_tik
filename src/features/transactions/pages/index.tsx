import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import transactionApi from 'apis/transaction';
import React, { useEffect, useState } from 'react';
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
function Transactions() {
  const [dataList, setDataList] = useState<any>([]);
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
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <div style={{ cursor: 'pointer', color: '#32c610' }}>Chi tiết {record.name}</div>
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

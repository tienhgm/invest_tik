import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Breadcrumb, Card, Skeleton, Table, Tag } from 'antd';
import { formatDate } from 'helper/generate';
import transactionApi from 'apis/transaction';
import { STATUS_TRANSACTION, TRANSACTION_TYPE } from 'enum';
import { formatCurrency, formatDateTime } from 'helper/common';
import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import './index.scss';
function TransactionDetail() {
  const history = useHistory();
  const match = useRouteMatch<any>();
  const [detail, setDetail] = useState<any>(null);
  const onGoBack = () => {
    history.push('/transactions');
  };
  const getDetailTransaction = async (id: string) => {
    try {
      const { data } = await transactionApi.getDetailTransaction(id);
      if (data) {
        setDetail(data);
      }
    } catch (error) { }
  };
  useEffect(() => {
    getDetailTransaction(match.params.id);
  }, [match.params.id]);
  const columns: ColumnsType<DataType> = [
    {
      title: 'Ngày giao dịch',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: any) => <div style={{ fontWeight: 'bold' }}>{formatDate(text)}</div>,
    },
    {
      title: 'Số tham chiếu',
      dataIndex: 'transaction_id',
      key: 'transaction_id',
    },
    {
      title: 'Số tiền giao dịch',
      dataIndex: 'amount',
      key: 'amount',
      render: (value: any) => (
        <div style={{ fontWeight: 'bold' }}>
          {value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') ? value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0} đ
        </div>
      ),
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
                ? 'Đang chờ đặt lệnh'
                : ''}
        </Tag>
      ),
    },
    {
      title: 'Số lượng CCCQ',
      dataIndex: 'volume',
      key: 'volume',
      render: (value: any) => (
        <div style={{ fontWeight: 'bold' }}>
          {value ? value : 0}
        </div>
      ),
    },
  ];
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <span className="link" onClick={() => onGoBack()}>
            Lịch sử giao dịch
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{match.params.id}</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      {detail ? (
        <>
          <Card title="Thông tin giao dịch" className="transaction_detail">
            <div className="transaction_detail__info">
              {detail.status === STATUS_TRANSACTION.SUCCESS ? (
                <CheckCircleOutlined className="icon-success" />
              ) : detail.status === STATUS_TRANSACTION.FAILED ? (
                <CloseCircleOutlined className="icon-failed" />
              ) : detail.status === STATUS_TRANSACTION.PENDING ? (
                <ExclamationCircleOutlined className="icon-pending" />
              ) : ""}
              <div
                className={
                  detail.status === STATUS_TRANSACTION.SUCCESS ? 'payment-success' : detail.status === STATUS_TRANSACTION.FAILED ? 'payment-failed' : detail.status === STATUS_TRANSACTION.PENDING ? 'payment-pending' : ''
                }
              >
                <div>
                  {detail.status === STATUS_TRANSACTION.SUCCESS
                    ? 'Nạp tiền thành công'
                    : detail.status === STATUS_TRANSACTION.FAILED ? 'Nạp tiền thất bại' :
                      detail.status === STATUS_TRANSACTION.PENDING ? detail.type === 2 ? 'Đang tạo lệnh rút' : detail.type === 0 ? 'Đang chờ thanh toán' : '' : ''
                  }
                </div>

                {detail.status === STATUS_TRANSACTION.SUCCESS && (
                  <div>
                    {detail.type === TRANSACTION_TYPE.DEPOSIT
                      ? '+'
                      : TRANSACTION_TYPE.WITHDRAWAL
                        ? '-'
                        : ''}
                    {formatCurrency(detail.amount)}đ
                  </div>
                )}
              </div>
            </div>
            <div className="transaction_detail__child">
              <div>Mã giao dịch:</div>
              <div>{detail.id}</div>
            </div>
            <div className="transaction_detail__child">
              <div>Số tiền:</div>
              <div style={{ fontWeight: 'bold', color: '#4caf50' }}>
                {formatCurrency(detail.amount)}đ
              </div>
            </div>
            <div className="transaction_detail__child">
              <div>Thời gian:</div>
              <div>{formatDateTime(detail.created_at)}</div>
            </div>
          </Card>
          {detail.detail &&
            <>
              <Table locale={{ emptyText: 'Không có dữ liệu' }} columns={columns} dataSource={detail.detail} pagination={false} />
            </>
          }
        </>
      ) : (
        <Skeleton active />
      )}
    </>
  );
}

export default TransactionDetail;

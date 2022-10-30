import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Breadcrumb, Card, Skeleton } from 'antd';
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
      console.log(data);
      if (data) {
        setDetail(data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getDetailTransaction(match.params.id);
  }, [match.params.id]);

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
        <Card title="Thông tin giao dịch" className="transaction_detail">
          <div className="transaction_detail__info">
            {detail.status === STATUS_TRANSACTION.SUCCESS ? (
              <CheckCircleOutlined className="icon-success" />
            ) : (
              <CloseCircleOutlined className="icon-failed" />
            )}
            <div
              className={
                detail.status === STATUS_TRANSACTION.SUCCESS ? 'payment-success' : 'payment-failed'
              }
            >
              <div>
                {detail.status === STATUS_TRANSACTION.SUCCESS
                  ? 'Nạp tiền thành công'
                  : 'Nạp tiền thất bại'}
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
      ) : (
        <Skeleton active />
      )}
    </>
  );
}

export default TransactionDetail;

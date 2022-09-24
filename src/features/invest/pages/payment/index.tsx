import React from 'react';
import { Breadcrumb, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import custom_package from 'assets/images/custom_package.svg';
import default_package from 'assets/images/default_package.svg';
import './index.scss';
import { useHistory } from 'react-router-dom';
function PaymentPage() {
  const { t } = useTranslation();
  const history = useHistory();
  const onGoToDetail = (link: string) => {
    history.push(`/invest/${link}`);
  };
  const onGoBack = () => {
    history.push(`/invest`);
  };
  return (
    <div className="payment">
      <Breadcrumb>
        <Breadcrumb.Item>
          <span className="link" onClick={onGoBack}>
            Invest
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Payment</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <Card
        className="payment__item"
        title={t('common.title_custom_packages')}
        extra={<img src={custom_package} className="payment__title-img" />}
      >
        <p>Xây dựng danh mục đầu tư riêng của bạn</p>
        <div className="payment__detail" onClick={() => onGoToDetail('payment/default')}>
          Xem chi tiết {'>'}
        </div>
      </Card>
      <Card
        className="payment__item"
        title={t('common.title_default_packages')}
        extra={<img src={default_package} className="payment__title-img" />}
      >
        <p>Danh sách các gói đầu tư KLTN gợi ý cho bạn</p>
        <div className="payment__detail" onClick={() => onGoToDetail('payment/default')}>
          Xem chi tiết {'>'}
        </div>
      </Card>
    </div>
  );
}

export default PaymentPage;

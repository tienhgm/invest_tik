import React from 'react';
import { Card } from 'antd';
import { useTranslation } from 'react-i18next';
import custom_package from 'assets/images/custom_package.svg';
import default_package from 'assets/images/default_package.svg';
import './index.scss';
import { useHistory } from 'react-router-dom';
function DashboardPage() {
  const { t } = useTranslation();
  const history = useHistory();
  const onGoToDetail = (link: string) => {
    history.push(`/dashboard/${link}`)
  }
  return (
    <div className="dashboard">
      <Card
        className="dashboard__item"
        title={t('common.title_custom_packages')}
        extra={<img src={custom_package} className="dashboard__title-img" />}
      >
        <p>Xây dựng danh mục đầu tư riêng của bạn</p>
        <div className="dashboard__detail" onClick={() => onGoToDetail('default')}>Xem chi tiết {'>'}</div>
      </Card>
      <Card
        className="dashboard__item"
        title={t('common.title_default_packages')}
        extra={<img src={default_package} className="dashboard__title-img" />}
      >
        <p>Danh sách các gói đầu tư KLTN gợi ý cho bạn</p>
        <div className="dashboard__detail" onClick={() => onGoToDetail('default')}>Xem chi tiết {'>'}</div>
      </Card>
    </div>
  );
}

export default DashboardPage;

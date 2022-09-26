import React from 'react';
import { Breadcrumb, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import './index.scss';
import { PlusCircleOutlined } from '@ant-design/icons';
function CustomPackage() {
  const { t } = useTranslation();
  const history = useHistory();
  const onNavigate = (link: string) => {
    history.push(link);
  };
  const onGoToDetailPackage = (id: number) => {
    history.push(`/invest/recharge/customize/${id}`);
  };
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <span className="link" onClick={() => onNavigate('/invest')}>
            {t('common.invest')}
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span className="link" onClick={() => onNavigate('/invest/recharge')}>
            {t('common.recharge')}
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t('common.customize')}</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <div className="customize">
        <Card>
          <div className="customize__item">
            <PlusCircleOutlined
              onClick={() => onNavigate('/invest/recharge/customize/create')}
              style={{
                fontSize: '2.4rem',
                borderRadius: '50%',
                backgroundColor: '#4caf50',
                color: '#fff',
                cursor: 'pointer',
              }}
            />
            <div className="customize--text">Tạo gói mới</div>
          </div>
        </Card>
        <br />
        <div className="customize--text">Các gói đã tạo</div>
        <br />
        <Card title={'Gói của Tiến'}>
          <div className="customize__info">
            <span className="invest">Đã đầu tư:</span>
            <span className="currency">100.000đ</span>
          </div>
          <br />
          <div className="customize__detail" onClick={() => onGoToDetailPackage(1)}>
            Nạp tiền {'>'}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CustomPackage;

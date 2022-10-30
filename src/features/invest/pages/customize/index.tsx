import React, { useEffect, useState } from 'react';
import { Breadcrumb, Card, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import './index.scss';
import { PlusCircleOutlined } from '@ant-design/icons';
import packageApi from 'apis/packages';
function CustomPackage() {
  const { t } = useTranslation();
  const [listPackages, setListPackages] = useState<any>([]);
  const history = useHistory();
  const onNavigate = (link: string) => {
    history.push(link);
  };
  const onGoToDetailPackage = (id: number) => {
    history.push(`/invest/recharge/customize/${id}`);
  };
  const getListCustomizePackage = async () => {
    const { data } = await packageApi.getListCustomizePackage();
    if (data) {
      setListPackages(data);
    }
  };
  useEffect(() => {
    getListCustomizePackage();
    return () => {
      setListPackages([]);
    };
  }, []);

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
        {listPackages &&
          listPackages.map((item: any) => (
            <Card
              className="my-package"
              key={item.id}
              title={item.name}
              extra={
                <img src={item.avatar} className="customize__title-img" alt="title_recharge" />
              }
            >
              <div className="customize__info">
                <span className="invest">Đã đầu tư:</span>
                <span className="currency">{item.investment_amount} đ</span>
              </div>
              <br />
              <div className="customize__detail" onClick={() => onGoToDetailPackage(item.id)}>
                Nạp tiền {'>'}
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}

export default CustomPackage;

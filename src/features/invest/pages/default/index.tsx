import React, { useEffect, useState } from 'react';
import { Breadcrumb, Card } from 'antd';
import { useHistory } from 'react-router-dom';
import './index.scss';
import { useTranslation } from 'react-i18next';
import packageApi from 'apis/packages';
function DefaultPackagePage() {
  const { t } = useTranslation();
  const history = useHistory();
  const [listPackageDefault, setListPackageDefault] = useState<any>([]);
  const onGoBack = (link: string) => {
    history.push(link);
  };
  const onGoToDetailPackage = (id: number) => {
    history.push(`/invest/payment/default/${id}`);
  };
  const getDefaultPackage = async () => {
    try {
      const { data } = await packageApi.getListPackageDefault();
      if (data) {
        setListPackageDefault(data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getDefaultPackage();

    return () => {
      setListPackageDefault([]);
    };
  }, []);

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <span className="link" onClick={() => onGoBack('/invest')}>
            Invest
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span className="link" onClick={() => onGoBack('/invest/payment')}>
            Payment
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Default</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <div className="package">
        {listPackageDefault &&
          listPackageDefault.map((item: any) => (
            <Card
              key={item.id}
              className="package__item"
              title={item.name}
              extra={<img src={item.avatar} className="package__title-img" />}
            >
              <p>Xây dựng danh mục đầu tư riêng của bạn</p>
              <div className="package__detail" onClick={() => onGoToDetailPackage(item.id)}>
                Nạp tiền {'>'}
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}

export default DefaultPackagePage;

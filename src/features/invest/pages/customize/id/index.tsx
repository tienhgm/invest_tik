import { ArrowDownOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Input } from 'antd';
import packageApi from 'apis/packages';
import DonutChartPackage from 'features/invest/components/DonutChartPackage';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useRouteMatch } from 'react-router-dom';
import ModalPayment from 'components/Common/modal';
import './index.scss';
function CustomizeId() {
  const [detailCustomize, setDetailCustomize] = useState<any>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState<any>(false);
  const [amount, setAmount] = useState<any>(null);

  const match = useRouteMatch<any>();
  const { t } = useTranslation();
  const history = useHistory();
  const onNavigate = (link: string) => {
    history.push(link);
  };
  const getListCustomizePackage = async () => {
    let id = match.params.id;
    const { data } = await packageApi.getDetailPackageById(id);
    if (data) {
      setDetailCustomize(data);
    }
  };
  const computedDataPieChart = (data: any) => {
    if (!data) return;
    if (data) {
      return data.map((item: any) => {
        return { ...item, value: item.percentage, type: item.code };
      });
    }
  };
  let dataChart = useMemo(
    () => computedDataPieChart(detailCustomize?.allocation),
    [detailCustomize?.allocation]
  );
  const cancelModaPayment = (value: boolean) => {
    setOpenModal(value);
    setAmount(null);
    setStep(1);
  };
  const confirmModal = () => {
    if (step === 1) {
      setStep(2);
    }
    console.log('ok');
  };
  useEffect(() => {
    getListCustomizePackage();
  }, []);
  return (
    <>
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
        <Breadcrumb.Item>
          <span className="link" onClick={() => onNavigate('/invest/recharge/customize')}>
            {t('common.customize')}
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{match.params.id}</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      {detailCustomize && (
        <div className="customize-detail">
          <div className="customize-detail__block">
            <div className="customize-detail__block--title">{detailCustomize.name}</div>
            <br />
            <img src={detailCustomize.avatar} className="customize-detail__title-img" alt="" />
            <br />
            <div className="customize-detail__currency">{detailCustomize.investment_amount} đ</div>
            <div className="customize-detail__block__method">
              <div className="customize-detail__block__method--recharge">
                <div className="customize-detail__btn" onClick={() => setOpenModal(true)}>
                  <PlusOutlined
                    className="customize-detail__btn"
                    style={{
                      padding: '0.8rem',
                      fontSize: '1.2rem',
                      borderRadius: '50%',
                      backgroundColor: '#32c610',
                      border: '1.5px solid #32c610',
                      color: '#fff',
                      cursor: 'pointer',
                    }}
                  />
                </div>
                <div className="text-medium">Nạp tiền</div>
              </div>
              <div className="customize-detail__block__method--recharge">
                <div className="customize-detail__btn">
                  <ArrowDownOutlined
                    style={{
                      padding: '0.8rem',
                      fontSize: '1.2rem',
                      borderRadius: '50%',
                      backgroundColor: '#fff',
                      border: '1.5px solid #ddd',
                      cursor: 'pointer',
                    }}
                  />
                </div>
                <div className="text-medium">Rút tiền</div>
              </div>
            </div>
            <br />
          </div>
          <div className="customize-detail__block">
            <div className="customize-detail__block--title">Chi tiết phân bổ</div>
            <br />
            {!!dataChart && <DonutChartPackage data={dataChart} isNoLegend isSpiderLabel />}
          </div>
        </div>
      )}
      <ModalPayment
        open={openModal}
        title={'Deposit money'}
        cancelModal={cancelModaPayment}
        confirmModal={confirmModal}
        confirmLoading={loading}
      >
        <>{step === 1 && <Input placeholder='Input amount' value={amount} onChange={(e) => setAmount(e.target.value)} />}</>
      </ModalPayment>
    </>
  );
}

export default CustomizeId;

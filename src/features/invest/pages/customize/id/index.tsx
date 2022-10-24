import { ArrowDownOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Form, InputNumber } from 'antd';
import packageApi from 'apis/packages';
import DonutChartPackage from 'features/invest/components/DonutChartPackage';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useRouteMatch } from 'react-router-dom';
import ModalPayment from 'components/Common/modal';
import './index.scss';
import BlockInfoBank from 'components/Common/block_info_bank';
function CustomizeId() {
  const [detailCustomize, setDetailCustomize] = useState<any>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState<any>(false);
  const [amount, setAmount] = useState<any>(null);
  const [infoBank, setInfoBank] = useState<any>(null);
  const [form] = Form.useForm<any>();
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
    setInfoBank(null);
    form.resetFields();
  };
  const confirmModal = () => {
    if (!amount) return;
    if (step === 1) {

      setStep(2);
    }
  };
  const onFinish = async (values: any) => {
    switch (step) {
      case 1:

        try {
          setAmount(values.amount);
          let payload = {
            id: match.params.id,
            amount: values.amount,
          };
          const { data } = await packageApi.investPackage(payload);
          if (data) {
            setInfoBank(data);
            setStep(2);
          }
        } catch (error) {}
        break;
      case 2:
        cancelModaPayment(false);
        break;
    }
  };
  const onFinishFailed = (errorInfo: any) => {};
  useEffect(() => {
    getListCustomizePackage();
  }, []);
  useEffect(() => {
    getListCustomizePackage();
  }, [step]);
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
        width={700}
        title={'Nạp tiền đầu tư'}
        cancelModal={cancelModaPayment}
        confirmModal={confirmModal}
        confirmLoading={loading}
        getContainer={false}
        footer={[
          <Button key={'closePayment'} onClick={() => cancelModaPayment(false)} form="deposit">
            Hủy
          </Button>,
          <Button
            onClick={confirmModal}
            form="deposit"
            key="submit"
            type="primary"
            htmlType="submit"
          >
            {step === 1 ? 'Nạp' : 'Xác nhận'}
          </Button>,
        ]}
      >
        <>
          <Form
            style={{ display: step === 1 ? 'block' : 'none' }}
            name="deposit"
            wrapperCol={{ span: 24 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              name="amount"
              rules={[{ required: true, message: 'Hãy nhập số tiền nạp (vnd)' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="Nhập số tiền muốn nạp (vnd)"
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Form.Item>
          </Form>
          {step === 2 && infoBank && <BlockInfoBank info={infoBank} />}
        </>
      </ModalPayment>
    </>
  );
}

export default CustomizeId;

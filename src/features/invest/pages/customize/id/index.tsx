import { ArrowDownOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Form, InputNumber, Input, Skeleton, Table, Select } from 'antd';
import DonutChartPackage from 'features/invest/components/DonutChartPackage';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useRouteMatch } from 'react-router-dom';
import ModalPayment from 'components/Common/modal';
import ModalWithdrawal from 'components/Common/modal';
import './index.scss';
import BlockInfoBank from 'components/Common/block_info_bank';
import { formatCurrency } from 'helper/common';
import { formatDate } from 'helper/generate';
import { LIST_BANK } from 'enum';
import { errorMes, successMes } from 'helper/notify';
import bankApi from 'apis/bank'
import authApi from 'apis/auth'
import packageApi from 'apis/packages'
import { delay } from 'lodash'
function CustomizeId() {
  const [detailCustomize, setDetailCustomize] = useState<any>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalWithdrawal, setOpenModalWithdrawal] = useState<boolean>(false);
  const [step, setStep] = useState(1);
  const [stepWithdrawal, setStepWithdrawal] = useState(1);
  const [loading, setLoading] = useState<any>(false);
  const [amount, setAmount] = useState<any>(null);
  const [bankId, setBankId] = useState<any>(null);
  const [bankNumber, setBankNumber] = useState<any>(null);
  const [infoBank, setInfoBank] = useState<any>(null);
  const [password, setPassword] = useState<any>(null)
  const [infoWithdrawal, setInfoWithdrawal] = useState<any>(null)
  const [amountWithdraw, setAmountWithdraw] = useState<any>(null)
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
  const cancelModaWithdrawal = (value: boolean) => {
    setOpenModalWithdrawal(value);
    setAmount(null);
    setInfoWithdrawal(null)
    setStepWithdrawal(1);
    setPassword(null);
    setAmountWithdraw(null);
    form.resetFields();
  };
  const confirmModal = () => {
    if (!amount) return;
    if (step === 1) {
      setStep(2);
    }
  };
  const confirmModalWithDrawal = () => {
    if (!amount) return;
    if (stepWithdrawal === 1) {
      setStepWithdrawal(2);
    }
  };
  const confirmPassword = async (password: any) => {
    try {
      setLoading(true);
      const result = await authApi.confirmPassword({ password });
      if (result) {
        await onWithdrawMoney();
      }
    } catch (error: any) {
      errorMes(error?.data?.message);
    }
  };
  const onWithdrawMoney = async () => {
    try {
      const payload = { id: match.params.id, bank_id: bankId, bank_account_id: bankNumber, amount: amountWithdraw }
      await packageApi.withdrawMoney(payload)
      successMes('Bạn đã tạo lệnh rút tiền thành công!');
      cancelModaWithdrawal(false);
    } catch (error: any) {
      errorMes(error.data.message)
    }
  }
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
        } catch (error) { }
        break;
      case 2:
        cancelModaPayment(false);
        break;
    }
  };
  const onFinishWithdrawal = async (values: any) => {
    switch (stepWithdrawal) {
      case 1:
        setAmountWithdraw(values?.amountWithdraw)
        setStepWithdrawal(2);
        break;
      case 2:
        onGetUserInfoByBank(bankId, bankNumber)
        // setStepWithdrawal(3)
        break;
      case 3:
        // cancelModaPayment(false)
        confirmPassword(password)
        break;
    }
  };
  const onGetUserInfoByBank = async (bank_id: any, account_id: any) => {
    try {
      const payload = {
        bank_id,
        account_id
      }
      const { data } = await bankApi.getInfoUserByBank(payload)
      if (data) {
        setInfoWithdrawal(data)
        delay(() => {
          setStepWithdrawal(3)
        }, 1500)
      }
    } catch (error: any) {
      errorMes(error?.data?.message)
    }
  }
  const columns: ColumnsType<DataType> = [
    {
      title: 'Ngày giao dịch',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => <div style={{ fontWeight: 'bold' }}>{formatDate(text)}</div>,
    },
    {
      title: 'Số tham chiếu',
      dataIndex: 'transaction_id',
      key: 'transaction_id',
    },
    {
      title: 'Số tiền giao dịch',
      dataIndex: 'price',
      key: 'price',
      render: (value) => (
        <div style={{ fontWeight: 'bold' }}>
          {value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') ? value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0} đ
        </div>
      ),
    },
    {
      title: 'Số lượng CCCQ',
      dataIndex: 'volume',
      key: 'volume',
      render: (value) => (
        <div style={{ fontWeight: 'bold' }}>
          {value ? value : 0}
        </div>
      ),
    },
  ];
  const onChangePassword = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(e.target.value);
  };
  const onFinishFailed = (errorInfo: any) => { };
  const onSelectBank = (value: any) => {
    setBankId(value)
  }
  const onInputNumberBank = (e: any) => {
    setBankNumber(e.target.value)
  }
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
      {detailCustomize ? (
        <div className="customize-detail">
          <div className="customize-detail__block">
            <div className="customize-detail__block--title">{detailCustomize.name}</div>
            <br />
            <img src={detailCustomize.avatar} className="customize-detail__title-img" alt="" />
            <br />
            <div className="customize-detail__currency">
              {formatCurrency(detailCustomize.investment_amount)} đ
            </div>
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
              {detailCustomize.transactions && detailCustomize.transactions.length ? <div className="customize-detail__block__method--recharge">
                <div className="customize-detail__btn" onClick={() => setOpenModalWithdrawal(true)}>
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
              </div> : <></>}
            </div>
            <br />
          </div>
          <div className="customize-detail__block">
            <div className="customize-detail__block--title">Chi tiết phân bổ</div>
            <br />
            {!!dataChart && <DonutChartPackage data={dataChart} isNoLegend isSpiderLabel />}
          </div>
          {detailCustomize.transactions &&
            <>
              <div className="customize-detail__block">
                <div className="customize-detail__block--title">Lịch sử giao dịch</div>
              </div>
              <Table columns={columns} dataSource={detailCustomize.transactions} pagination={false} />
            </>
          }
        </div>
      ) : (
        <>
          <Skeleton active />
          <Skeleton active />
        </>
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
      {detailCustomize && <ModalWithdrawal
        open={openModalWithdrawal}
        width={700}
        title={'Rút tiền đầu tư'}
        cancelModal={cancelModaWithdrawal}
        confirmModal={confirmModalWithDrawal}
        confirmLoading={loading}
        getContainer={false}
        footer={[
          <Button key={'closePayment'} onClick={() => cancelModaWithdrawal(false)} form="withdrawal">
            Hủy
          </Button>,
          <Button
            onClick={confirmModalWithDrawal}
            form="withdrawal"
            key="submit"
            type="primary"
            htmlType="submit"
          >
            {stepWithdrawal === 1 ? 'Rút tiền' : stepWithdrawal === 2 ? 'Kiểm tra' : stepWithdrawal === 3 ? 'Xác nhận' : ''}
          </Button>,
        ]}
      >
        <>
          <Form
            style={{ display: stepWithdrawal === 1 ? 'block' : 'none' }}
            name="withdrawal"
            wrapperCol={{ span: 24 }}
            onFinish={onFinishWithdrawal}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              name="amountWithdraw"
              rules={[{ required: true, message: 'Hãy nhập số tiền rút (vnd)' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="Nhập số tiền muốn rút (vnd)"
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Form.Item>
          </Form>
          {stepWithdrawal === 2 && <>
            <h5>Chọn ngân hàng</h5>
            <Select
              style={{ width: '100%', marginBottom: '2rem' }}
              placeholder="Chọn ngân hàng"
              onChange={onSelectBank}
              options={LIST_BANK}
            />
            {bankId ? <>
              <h5>Số tài khoản</h5>
              <Input onChange={onInputNumberBank} placeholder="Nhập số tài khoản" style={{ marginBottom: '2rem' }} />
            </> : <></>}
            {infoWithdrawal ? <>
              <h5>Chủ tài khoản</h5>
              <Input value={infoWithdrawal.name} disabled placeholder="Chủ tài khoản" />
            </> : <></>}
          </>
          }
          {stepWithdrawal === 3 && <>
            <h5>Nhập mật khẩu để tiến hành rút tiền</h5>
            <Input type="password" value={password} onChange={onChangePassword} />
          </>}
        </>
      </ModalWithdrawal>}

    </>
  );
}

export default CustomizeId;

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Radio, Space, Input, RadioChangeEvent, Form, Button } from 'antd';
import { TWO_FA_SETTING } from 'enum';
import Modal from 'components/Common/modal';
import ModalRemoveTwoFa from 'components/Common/modal';
import OtpInput from 'react-otp-input';
import styles from './style.module.scss';
import { errorMes, successMes } from 'helper/notify';
import authApi from 'apis/auth';
import { REGEX_PASSWORD } from 'helper/regex';
function Settings() {
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };
  const { t } = useTranslation();
  const [password, setPassword] = useState<any>(null);
  const [step, setStep] = useState<number>(1);
  const [twofa, setTwofa] = useState<any>(false);
  const [otp, setOtp] = useState<any>(null);
  const [qr, setQr] = useState<string>('');
  const [open, setOpen] = useState<any>(false);
  const [openRemove, setOpenRemove] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);
  const [form] = Form.useForm();
  const listFormReset = [
    {
      label: 'Mật khẩu hiện tại',
      name: 'current_password',
      rules: [
        { required: true, message: 'Hãy nhập mật khẩu hiện tại' },
        {
          pattern: REGEX_PASSWORD,
          message: 'Hãy nhập mật khẩu ít nhất 8 kí tự và bao gồm kí tự đặc biệt sau @$!%*#?&',
        },
      ],
      childComponent: <Input.Password />,
    },
    {
      label: 'Mật khẩu mới',
      name: 'new_password',
      rules: [
        { required: true, message: 'Hãy nhập mật khẩu mới' },
        {
          pattern: REGEX_PASSWORD,
          message: 'Hãy nhập mật khẩu ít nhất 8 kí tự và bao gồm kí tự đặc biệt sau @$!%*#?&',
        },
      ],
      childComponent: <Input.Password />,
    },
    {
      label: 'Xác nhận mật khẩu',
      name: 'confirm_new_password',
      rules: [
        { required: true, message: 'Hãy nhập xác nhận mật khẩu' },
        ({ getFieldValue }: any) => ({
          validator(rule: any, value: any) {
            if (!value || getFieldValue('new_password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(t('validate.password_not_match'));
          },
        }),
      ],
      childComponent: <Input.Password />,
    },
  ];
  const onChange = (e: RadioChangeEvent) => {
    switch (twofa) {
      case TWO_FA_SETTING.PASSWORD:
        setOpen(true);
        break;
      case TWO_FA_SETTING.GG_AUTHENTICATOR:
        setOpenRemove(true);
        break;
    }
  };
  const cancelModal = (value: boolean) => {
    setOpen(value);
    setStep(1);
    setQr('');
    setPassword(null);
  };
  const cancelModalRemove = (value: boolean) => {
    setOpenRemove(value);
    setPassword(null);
  };

  const confirmPassword = async () => {
    try {
      setLoading(true);
      const result = await authApi.confirmPassword({ password });
      if (result) {
        setLoading(false);
        setStep(2);
      }
    } catch (error: any) {
      setLoading(false);
      errorMes(error?.data?.message);
    }
  };
  const confirmModal = () => {
    switch (step) {
      case 1:
        confirmPassword();
        break;
      case 2:
        confirm2Fa();
        break;
    }
  };
  const confirmModalRemove = async () => {
    if (!password) return;
    try {
      setLoading(true);
      const result = await authApi.confirmPassword({ password });
      if (result) {
        const result = await authApi.removeTwoFa();
        if (result) {
          setLoading(false);
          cancelModalRemove(false);
          getSettings();
          successMes(t('common.delete_two_fa'));
        }
      }
    } catch (error: any) {
      setLoading(false);
      errorMes(error?.data?.message);
    }
  };
  const confirm2Fa = async () => {
    try {
      if (otp.length < 6) return;
      setLoading(true);
      const result = await authApi.confirmToTurnOnTwoFa(otp);
      if (result) {
        cancelModal(false);
        successMes(t('common.success_two_fa'));
        getSettings();
        setLoading(false);
      }
    } catch (error: any) {
      setOtp(null);
      setLoading(false);
      errorMes(error?.data?.message);
    }
  };
  const onChangeOtp = (otp: string) => {
    setOtp(otp);
  };

  const onChangePassword = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(e.target.value);
  };
  const getTwoFactorQrCode = async () => {
    try {
      const result = await authApi.settingTwoFactor();
      if (result) {
        const { data } = await authApi.getTwoFactorQrCode();
        setQr(data.svg);
      }
    } catch (error: any) {
      errorMes(error?.data?.message);
    }
  };
  const onFinish = async (values: any) => {
    console.log(values);
    let payload = {
      current_password: values.current_password,
      password: values.new_password,
    };
    try {
      setLoading(true);
      const result = await authApi.changePassword(payload);
      if (result) {
        form.resetFields();
        successMes('Bạn đã thay đổi mật khẩu thành công!');
        setLoading(false);
      }
    } catch (error: any) {
      form.resetFields();
      errorMes('Đổi mật khẩu thất bại');
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {
    if (step === 2) {
      getTwoFactorQrCode();
    }
  }, [step]);
  const getSettings = async () => {
    const { data } = await authApi.getSettings();
    if (data) {
      setTwofa(data.enabled_2fa ? TWO_FA_SETTING.GG_AUTHENTICATOR : TWO_FA_SETTING.PASSWORD);
    }
  };

  useEffect(() => {
    getSettings();
    return () => {};
  }, []);

  return (
    <div>
      <Card title="Cài đặt bảo mật 2 lớp" bordered={false}>
        <Radio.Group onChange={onChange} value={twofa} size="large">
          <Space direction="vertical">
            <Radio style={radioStyle} value={TWO_FA_SETTING.PASSWORD}>
              {t('common.password')}
            </Radio>
            <Radio
              style={radioStyle}
              className={styles['style-radio']}
              value={TWO_FA_SETTING.GG_AUTHENTICATOR}
            >
              {t('common.gg_authenticator')}
            </Radio>
          </Space>
        </Radio.Group>
        {/* <div className="">

        </div> */}
        <Modal
          open={open}
          title={'Cài đặt bảo mật 2 lớp'}
          cancelModal={cancelModal}
          confirmModal={confirmModal}
          confirmLoading={loading}
        >
          <>
            {step === 1 && (
              <>
                <div>Bạn đang thay đổi phương thức xác thực hai bước.</div>
                <div>Vui lòng nhập mật khẩu của bạn để thay đổi xác thực hai bước.</div>
                <br />
                <Input type="password" value={password} onChange={onChangePassword} />
              </>
            )}
            {step === 2 && qr && (
              <div className={styles.step2Box}>
                <div>Từ ứng dụng đã tải xuống, hãy quét mã QR.</div>
                <div dangerouslySetInnerHTML={{ __html: qr }}></div>
                <div>Nhập mã gồm 6 chữ số được hiển thị trong Google Authenticator và ấn "Ok".</div>
                <OtpInput
                  shouldAutoFocus
                  className={styles.otpInput}
                  value={otp}
                  onChange={onChangeOtp}
                  numInputs={6}
                  isInputNum
                  inputStyle={styles.inputStyle}
                  separator={<span>-</span>}
                />
              </div>
            )}
            {/* {twofa === TWO_FA_SETTING.GG_AUTHENTICATOR && step === 2 && (
              <div>Click "Ok" to remove two factor authentication.</div>
            )} */}
          </>
        </Modal>
        <ModalRemoveTwoFa
          open={openRemove}
          title={'Cài đặt bảo mật 2 lớp'}
          cancelModal={cancelModalRemove}
          confirmModal={confirmModalRemove}
          confirmLoading={loading}
        >
          <>
            Bạn có muốn tắt xác thực hai yếu tố không? Vui lòng nhập mật khẩu của bạn.
            <br />
            <br />
            <Input
              placeholder="password"
              type={'Password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        </ModalRemoveTwoFa>
      </Card>
      <br />
      <Card title="Đổi mật khẩu" bordered={false}>
        <Form
          form={form}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 8 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {listFormReset.map((element: any) => (
            <Form.Item
              key={element.name}
              label={element.label}
              name={element.name}
              rules={element.rules}
            >
              {element.childComponent}
            </Form.Item>
          ))}
          <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Settings;

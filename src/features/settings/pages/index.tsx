import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, RadioChangeEvent } from 'antd';
import { Card, Radio, Space } from 'antd';
import { TWO_FA_SETTING } from 'enum';
import Modal from 'components/Common/modal';
import ModalRemoveTwoFa from 'components/Common/modal';
import OtpInput from 'react-otp-input';
import styles from './style.module.scss';
import { errorMes, successMes } from 'helper/notify';
import authApi from 'apis/auth';
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
    </div>
  );
}

export default Settings;

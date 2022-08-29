import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, RadioChangeEvent } from 'antd';
import { Card, Radio, Space } from 'antd';
import { TWO_FA_SETTING } from 'enum';
import Modal from 'components/Common/modal';
import OtpInput from 'react-otp-input';
import styles from './style.module.scss';
import { errorMes } from 'helper/notify';
import authApi from 'apis/auth';
function Settings() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [password, setPassword] = useState<any>(null);
  const [step, setStep] = useState<number>(1);
  const [twofa, setTwofa] = useState<any>(1);
  const [otp, setOtp] = useState<any>(null);
  const [open, setOpen] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);

  const listFormPassword = [
    {
      label: t('common.password'),
      name: 'password',
      rules: [{ required: true, message: t('validate.password_required') }],
      childComponent: <Input.Password />,
    },
  ];

  const onChange = (e: RadioChangeEvent) => {
    setOpen(true);
    // setTwofa(e.target.value);
  };
  const cancelModal = (value: boolean) => {
    setOpen(value);
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
    if (step === 1) {
      confirmPassword();
      //   setStep(2);
    }
  };
  const onChangeOtp = (otp: string) => {
    setOtp(otp);
  };
  //   useEffect(() => { 6) return;
  //     // handleActive
  //     if (otp.length <(otp);
  //   }, [otp]);
  const onChangePassword = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(e.target.value);
  };
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };
  return (
    <div>
      <Card title="Settings for Important Operations" bordered={false}>
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
          title={'Two factor authentication setting'}
          cancelModal={cancelModal}
          confirmModal={confirmModal}
          confirmLoading={loading}
        >
          <>
            {step === 1 && <Input type="password" onChange={onChangePassword} />}
            {step === 2 && (
              <div>
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
          </>
        </Modal>
      </Card>
    </div>
  );
}

export default Settings;

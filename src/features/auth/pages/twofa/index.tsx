import AuthLayout from 'components/Layout/AuthLayout';
import React,{ useState } from 'react';
import { useTranslation } from 'react-i18next';
import OtpInput from 'react-otp-input';
import styles from './style.module.scss';
export default function TwoFaPage() {
  const { t } = useTranslation();
  const [otp, setOtp] = useState<any>(null);
  const onChangeOtp = (otp: string) => {
    setOtp(otp);
  };
  return (
    <AuthLayout>
      <h4>{t('common.two_fa_title')}</h4>
      <div>
        {/* <div dangerouslySetInnerHTML={}></div> */}
      </div> 
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
    </AuthLayout>
  );
}

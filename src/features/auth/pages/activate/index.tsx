import OtpInput from 'react-otp-input';
import AuthLayout from 'components/Layout/AuthLayout';
import { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { Loading } from 'components/Common';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'app/hooks';
import { activateThunk } from 'app/slices/authSlice';
export default function Activate() {
  const [otp, setOtp] = useState<string>('');
  const { t } = useTranslation();
  const [isDisabledOtp, setIsDisabledOtp] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const onChangeOtp = (otp: string) => {
    setOtp(otp);
  };
  const handleActive = async (otp: string) => {
    try {
      setIsDisabledOtp(true);
      await dispatch(activateThunk(otp));
    } catch (error) {
    } finally {
      setIsDisabledOtp(false);
    }
  };
  useEffect(() => {
    if (otp.length < 6) return;
    handleActive(otp);
  }, [otp]);

  return (
    <AuthLayout>
      <h3 className={styles.title}>{t('common.input_otp')}</h3>
      <OtpInput
        shouldAutoFocus
        className={styles.otpInput}
        value={otp}
        onChange={onChangeOtp}
        numInputs={6}
        isInputNum
        isDisabled={isDisabledOtp}
        inputStyle={styles.inputStyle}
        separator={<span>-</span>}
      />
      {isDisabledOtp && <Loading />}
    </AuthLayout>
  );
}

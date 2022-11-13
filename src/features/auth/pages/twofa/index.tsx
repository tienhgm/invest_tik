import { Button } from 'antd';
import authApi from 'apis/auth';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'app/slices/authSlice';
import AuthLayout from 'components/Layout/AuthLayout';
import { errorMes, successMes } from 'helper/notify';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import OtpInput from 'react-otp-input';
import { useHistory } from 'react-router-dom';
import styles from './style.module.scss';
export default function TwoFaPage() {
  const history = useHistory();
  const [isGoto2fa, setIsGoto2fa] = useState<any>(localStorage.getItem('twoFa'));

  const { t } = useTranslation();
  const [otp, setOtp] = useState<any>(null);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState<any>(false);
  const dispatch = useAppDispatch();
  const onChangeOtp = (otp: string) => {
    setOtp(otp);
  };
  const onConfirm = async () => {
    try {
      setLoading(true);
      await authApi.confirmToTwoFaLogin(otp);
      setLoading(false);
      setOtp(null);
      dispatch(authActions.authSuccess(true));
      successMes(t('notify.login_success'));
      localStorage.removeItem('twoFa');
      setIsGoto2fa(null);
    } catch (error: any) {
      setOtp(null);
      setLoading(false);
      errorMes(error?.data?.message);
    }
  };
  useEffect(() => {
    if (!isGoto2fa) {
      history.push('/login');
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (!otp || otp.length < 6) return;
    setDisabled(false);
  }, [otp]);

  return (
    <AuthLayout>
      <h4>{t('common.two_fa_title')}</h4>
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

      <div className={styles.toSignUp}>
        <Button onClick={onConfirm} loading={loading} disabled={disabled} type="primary">
          {t('common.confirm')}
        </Button>
      </div>
    </AuthLayout>
  );
}

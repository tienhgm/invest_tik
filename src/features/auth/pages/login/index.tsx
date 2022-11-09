import { Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'app/slices/authSlice';
import { errorMes, successMes } from 'helper/notify';
import { LoginPayload } from 'model';
import AuthLayout from 'components/Layout/AuthLayout';
import { REGEX_CHECK_EMAIL } from 'helper/regex';

import styles from './style.module.scss';
import authApi from 'apis/auth';
import { useEffect, useState } from 'react';
export default function LoginPage() {
  const [loading, setLoading] = useState<any>(false);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const onFinish = async (values: LoginPayload) => {
    try {
      setLoading(true);
      const { data } = await authApi.login(values);
      if (data) {
        if (!data.two_factor) {
          form.resetFields();
          dispatch(authActions.authSuccess(true));
          successMes(t('notify.login_success'));
        } else {
          dispatch(authActions.authTwoFa(true));
          history.push('/confirm-2fa');
        }
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      errorMes(error?.data?.message);
    }
  };

  const onFinishFailed = (errorInfo: any) => {};

  const handleGoToPage = (route: string) => {
    history.push(route);
  };
  useEffect(() => {
    if (localStorage.verify === 'true') {
      successMes(t('notify.account_active'));
      localStorage.removeItem('verify');
    }
    return () => {}
  }, []);

  const listFormLogin = [
    {
      label: t('common.username'),
      name: 'email',
      rules: [
        { required: true, message: t('validate.email_required') },
        { pattern: REGEX_CHECK_EMAIL, message: t('validate.email_invalid') },
      ],
      childComponent: <Input />,
    },
    {
      label: t('common.password'),
      name: 'password',
      rules: [{ required: true, message: t('validate.password_required') }],
      childComponent: <Input.Password />,
    },
  ];

  return (
    <AuthLayout>
      <h4>{t('common.sign_in')}</h4>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {listFormLogin.map((element: any) => (
          <Form.Item
            key={element.name}
            label={element.label}
            name={element.name}
            rules={element.rules}
          >
            {element.childComponent}
          </Form.Item>
        ))}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
            {t('common.sign_in')}
          </Button>
          <Button type="link" onClick={() => handleGoToPage('/forgot-password')}>
            {t('common.forgot_password')}
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.toSignUp}>
        {t('common.havent_account')}
        <Button
          type="link"
          style={{ fontWeight: 'bold' }}
          onClick={() => handleGoToPage('/register')}
        >
          {t('common.sign_up')}
        </Button>
      </div>
    </AuthLayout>
  );
}

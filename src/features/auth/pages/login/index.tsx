import { Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selectAuthLoading } from 'app/slices/authSlice';
import { errorMes, successMes } from 'helper/notify';
import { LoginPayload } from 'model';
import AuthLayout from 'components/Layout/AuthLayout';
import SelectLanguage from 'components/Common/SelectLanguage';
import { REGEX_CHECK_EMAIL } from 'helper/regex';

import styles from './style.module.scss';
import authApi from 'apis/auth';
import { useEffect } from 'react';
export default function LoginPage() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const isLoading = useAppSelector(selectAuthLoading);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const onFinish = async (values: LoginPayload) => {
    try {
      dispatch(authActions.auth());
      const result = await authApi.login(values);
      if (result) {
        form.resetFields();
        dispatch(authActions.authSuccess());
        successMes(t('notify.login_success'));
      }
    } catch (error: any) {
      errorMes(error?.data?.message);
      dispatch(authActions.authFailed());
    }
  };

  const onFinishFailed = (errorInfo: any) => {};

  const handleGoToPage = (route: string) => {
    history.push(route);
  };
  useEffect(() => {
    if (localStorage.verify === 'true') {
      successMes('notify.account_active');
      localStorage.removeItem('verify')
    }
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
          <Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
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
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <SelectLanguage />
        </div>
      </div>
    </AuthLayout>
  );
}

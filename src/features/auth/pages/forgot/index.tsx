import { Form, Input, Button } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selectAuthLoading } from 'app/slices/authSlice';
import { ForgotPasswordPayload } from 'model';
import AuthLayout from 'components/Layout/AuthLayout';
import SelectLanguage from 'components/Common/SelectLanguage';
import { REGEX_CHECK_EMAIL } from 'helper/regex';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import styles from './style.module.scss';
import authApi from 'apis/auth';
export default function ForgotPasswordPage() {
  const [form] = Form.useForm();
  const isLoading = useAppSelector(selectAuthLoading);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const onFinish = async (values: ForgotPasswordPayload) => {
    try {
      dispatch(authActions.auth);
      const result = await authApi.forgotPassword(values);
      if (result) {
        form.resetFields();
        dispatch(authActions.authSuccess);
      }
    } catch (error) {
      dispatch(authActions.authFailed);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleGoToSignIn = () => {
    history.push('/login');
  };
  const { t } = useTranslation();
  return (
    <AuthLayout>
      <h4>{t('common.forgot_password')}</h4>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={t('common.email')}
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { pattern: REGEX_CHECK_EMAIL, message: 'Email is invalid' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
            {t('common.send')}
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.toSignUp}>
        {t('common.go_to_login')}
        <Button type="link" style={{ fontWeight: 'bold' }} onClick={handleGoToSignIn}>
          {t('common.sign_in')}
        </Button>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <SelectLanguage />
        </div>
      </div>
    </AuthLayout>
  );
}

import { Form, Input, Button } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { loginThunk, selectAuthLoading } from 'app/slices/authSlice';
import { LoginPayload } from 'common';
import AuthLayout from 'components/Layout/AuthLayout';
import SelectLanguage from 'features/auth/components/SelectLanguage';
import { REGEX_CHECK_EMAIL } from 'helper/regex';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import styles from './style.module.scss';
export default function LoginPage() {
  const [form] = Form.useForm();
  const isLoading = useAppSelector(selectAuthLoading);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const onFinish = async (values: LoginPayload) => {
    const result = await dispatch(loginThunk(values));
    if (result.meta.requestStatus === 'fulfilled') {
      history.push('/activate')
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleGoToSignUp = () => {
    history.push('/register');
  };
  const { t } = useTranslation();
  return (
    <AuthLayout>
      <h4>{t('common.signIn')}</h4>
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
          label={t('common.username')}
          name="email"
          rules={[
            { required: true, message: t('validate.usernameRequired') },
            { pattern: REGEX_CHECK_EMAIL, message: 'Email is invalid' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('common.password')}
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
            {t('common.signIn')}
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.toSignUp}>
        {t('common.haventAccount')}
        <Button type="link" style={{ fontWeight: 'bold' }} onClick={handleGoToSignUp}>
          {t('common.signUp')}
        </Button>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <SelectLanguage />
        </div>
      </div>
    </AuthLayout>
  );
}

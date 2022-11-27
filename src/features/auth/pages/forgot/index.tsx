import { Form, Input, Button } from 'antd';
import { ForgotPasswordPayload } from 'model';
import AuthLayout from 'components/Layout/AuthLayout';
import { REGEX_CHECK_EMAIL } from 'helper/regex';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import styles from './style.module.scss';
import authApi from 'apis/auth';
import { errorMes, successMes } from 'helper/notify';
import { useState } from 'react';
export default function ForgotPasswordPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<any>(false);

  const history = useHistory();
  const onFinish = async (values: ForgotPasswordPayload) => {
    try {
      setLoading(true);
      const result = await authApi.forgotPassword(values);
      if (result) {
        form.resetFields();
        successMes(t('notify.forgot_success'));
        setLoading(false);
      }
    } catch (error: any) {
      errorMes(error?.data?.message);
      setLoading(false);
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
            { required: true, message: 'Hãy nhập email!' },
            { max: 100, message: t('validate.email_maxLength') },
            { pattern: REGEX_CHECK_EMAIL, message: 'Email không đúng định dạng' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
            {t('common.send')}
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.toSignUp}>
        {t('common.go_to_login')}
        <Button type="link" style={{ fontWeight: 'bold' }} onClick={handleGoToSignIn}>
          {t('common.sign_in')}
        </Button>
      </div>
    </AuthLayout>
  );
}

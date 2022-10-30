import { Form, Input, Button } from 'antd';
import AuthLayout from 'components/Layout/AuthLayout';
import SelectLanguage from 'components/Common/SelectLanguage';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './style.module.scss';
import authApi from 'apis/auth';
import { errorMes, successMes } from 'helper/notify';
import useQuery from 'hooks/queryParams';
import { ResetPasswordPayload } from 'model';
import { useState } from 'react';
export default function ResetPasswordPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<any>(false);
  const history = useHistory();
  const { search } = useLocation();
  let query = useQuery(search);
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      let payloadValues: ResetPasswordPayload = {
        ...values,
        email: query.get('email'),
        token: query.get('token'),
      };
      const result = await authApi.resetPassword(payloadValues);
      if (result) {
        form.resetFields();
        successMes(t('notify.change_pass_success'));
        history.push('/login');
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      errorMes(error?.data?.message);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleGoToSignIn = () => {
    history.push('/login');
  };

  const { t } = useTranslation();
  const listFormReset = [
    {
      label: t('common.password'),
      name: 'password',
      rules: [{ required: true, message: t('validate.password_required') }],
      childComponent: <Input.Password />,
    },
    {
      label: t('common.rePassword'),
      name: 'password_confirmation',
      rules: [
        { required: true, message: t('validate.password_required') },
        ({ getFieldValue }: any) => ({
          validator(rule: any, value: any) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(t('validate.password_not_match'));
          },
        }),
      ],
      childComponent: <Input.Password />,
    },
  ];
  return (
    <AuthLayout>
      <h4>{t('common.reset_password')}</h4>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {listFormReset.map((element: any) => (
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

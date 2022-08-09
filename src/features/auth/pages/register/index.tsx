import { Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selectAuthLoading } from 'app/slices/authSlice';
import { errorMes, successMes } from 'helper/notify';
import AuthLayout from 'components/Layout/AuthLayout';
import SelectLanguage from 'components/Common/SelectLanguage';
import { REGEX_CHECK_EMAIL } from 'helper/regex';
import { RegisterPayload } from 'common';
import styles from './style.module.scss';
import authApi from 'apis/auth';
export default function RegisterPage() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const history = useHistory();
  const isLoading = useAppSelector(selectAuthLoading);
  const dispatch = useAppDispatch();
  const onFinish = async (values: RegisterPayload) => {
    try {
      dispatch(authActions.auth);
      const result = await authApi.register(values);
      if (result) {
        form.resetFields();
        successMes(t('notify.register_success'));
        dispatch(authActions.authSuccess);
      }
    } catch (error: any) {
      errorMes(error?.data?.message);
      dispatch(authActions.authFailed);
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const handleGoToSignIn = () => {
    history.push('/login');
  };
  const listFormRegister = [
    {
      label: t('common.email'),
      name: 'email',
      rules: [
        { required: true, message: t('validate.email_required') },
        { pattern: REGEX_CHECK_EMAIL, message: t('validate.email_invalid') },
      ],
      childComponent: <Input />,
    },
    {
      label: t('common.username'),
      name: 'name',
      rules: [
        { required: true, message: t('validate.username_required') },
        { max: 60, message: t('validate.username_maxLength') },
      ],
      childComponent: <Input />,
    },
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
      <h4>{t('common.signUp')}</h4>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {listFormRegister.map((element: any) => (
          <Form.Item label={element.label} name={element.name} rules={element.rules}>
            {element.childComponent}
          </Form.Item>
        ))}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
            {t('common.signUp')}
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.toSignUp}>
        {t('common.haveAccount')}
        <Button type="link" style={{ fontWeight: 'bold' }} onClick={handleGoToSignIn}>
          {t('common.signIn')}
        </Button>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <SelectLanguage />
        </div>
      </div>
    </AuthLayout>
  );
}
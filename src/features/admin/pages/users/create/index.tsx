import React, { useState } from 'react';
import { Breadcrumb, Card, Form, Select, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './index.scss'
import { REGEX_CHECK_EMAIL, REGEX_PASSWORD } from 'helper/regex';
import { errorMes, successMes } from 'helper/notify';
import adminApi from 'apis/admin';
function CreateUser() {
    const [form] = Form.useForm();
    const history = useHistory();
    const { t } = useTranslation();
    const onNavigate = (link: string) => {
        history.push(link);
    };
    const [loading, setLoading] = useState(false)
    const listFormCreate = [
        {
            label: t('common.email'),
            name: 'email',
            rules: [
                { required: true, message: t('validate.email_required') },
                { max: 100, message: t('validate.email_maxLength') },
                { pattern: REGEX_CHECK_EMAIL, message: t('validate.email_invalid') },
            ],
            childComponent: <Input />,
        },
        {
            label: t('common.password'),
            name: 'password',
            rules: [
                { required: true, message: t('validate.password_required') },
                { max: 100, message: t('validate.password_maxLength') },
                {
                    pattern: REGEX_PASSWORD,
                    message: 'Hãy nhập mật khẩu ít nhất 8 kí tự và bao gồm kí tự đặc biệt sau @$!%*#?&',
                },
            ],
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
        {
            label: 'Phân quyền',
            name: 'role',
            rules: [
                { required: true, message: 'Hãy lựa chọn quyền cho người dùng.' },
            ],
            childComponent: <Select
                style={{ width: 200 }}
                placeholder={'Chọn quyền'}
                options={[
                    {
                        value: 0,
                        label: 'Người dùng',
                    },
                    {
                        value: 1,
                        label: 'Admin',
                    },
                ]}
            />,
        },
    ];
    const onFinish = async (values: any) => {
        try {
            setLoading(true);
          
            const { data } = await adminApi.createUser(values);
            if (data) {
                form.resetFields();
                successMes('Bạn đã tạo mới người dùng thành công')
                setLoading(false);
            }
        } catch (error: any) {
            setLoading(false);
            errorMes('Đã có lỗi, vui lòng thử lại sau!')
        }
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <span className="link" onClick={() => onNavigate('/admin/users')}>
                        Quản lý người dùng
                    </span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Tạo mới người dùng</Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <Card title="Tạo mới người dùng">
                <Form
                    form={form}
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    {listFormCreate.map((element: any) => (
                        <Form.Item
                            key={element.name}
                            label={element.label}
                            name={element.name}
                            rules={element.rules}
                        >
                            {element.childComponent}
                        </Form.Item>
                    ))}
                    <Form.Item wrapperCol={{ offset: 2, span: 2 }}>
                        <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
                            Tạo mới
                        </Button>
                    </Form.Item>
                </Form></Card>
        </>
    );
}

export default CreateUser;
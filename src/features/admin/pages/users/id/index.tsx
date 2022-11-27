import React, { useEffect, useState } from 'react';
import { Breadcrumb, Card, Form, Select, Input, Popconfirm, Button } from 'antd'
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './index.scss'
import adminApi from 'apis/admin';
import { errorMes, successMes } from 'helper/notify';
import {  formatDate, formatDateVN, removeString } from 'helper/generate';
import { REGEX_CHECK_EMAIL } from 'helper/regex';
import './index.scss';
import FrontImg from 'assets/images/front_img.png';
import BackImg from 'assets/images/back_img.png';
function DetailUser() {
    const history = useHistory();
    const match = useRouteMatch();
    const onNavigate = (link: string) => {
        history.push(link);
    };
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const [initFormData, setInitFormData] = useState<any>({});
    const [user, setUser] = useState<any>(null)
    const onGetDetailUser = async () => {
        try {
            const { data } = await adminApi.getDetailUser(match.params.id)
            if (data) {
                setUser(data)
                setInitFormData(data)
                form.setFieldsValue({
                    email: data?.email,
                });
            }
        } catch (error) {
        }
    }
    const onFinishFailed = (errorInfo: any) => { };
    const onFinish = async (values: any) => {
        console.log(values);
        
        if (initFormData.email === values.email) return
        try {
            const payload = { email: values.email };
            await adminApi.updateUser(match.params.id, payload);
            onGetDetailUser();
            successMes('Bạn đã thay đổi thông tin thành công');
        } catch (error: any) {
            errorMes('Đã có lỗi, vui lòng thử lại sau!')
            form.setFieldsValue({
                email: initFormData?.email,
            });
        }
    };
    const onConfirmDelete = async () => {
        try {
            await adminApi.deleteUser(match.params.id);
            onNavigate('/admin/users');
            successMes('Bạn đã xóa thành công')
        } catch (error) {
            errorMes('Đã có lỗi, vui lòng thử lại sau!')
        }
    }
    useEffect(() => {
        onGetDetailUser();
        return () => {
        }
    }, [])
    const onChangeActive = async (value: any) => {
        try {
            const payload = { active: value };
            await adminApi.updateUser(match.params.id, payload);
            await onGetDetailUser();
            successMes('Bạn đã cập nhật thành công')
        } catch (error) {
            errorMes('Đã có lỗi xảy ra, vui lòng thử lại sau!')
        }
    }
    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <span className="link" onClick={() => onNavigate('/admin/users')}>
                        Quản lý người dùng
                    </span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{match.params.id}</Breadcrumb.Item>
            </Breadcrumb>
            <br />
            {user && (
                <Card className="profile">
                    <div className="profile__block">
                        <div className="profile__block--title">Trạng thái tài khoản</div>
                        <Select
                            style={{ width: 200 }}
                            placeholder={'Trạng thái tài khoản'}
                            value={user.is_activated}
                            onChange={onChangeActive}
                            options={[
                                {
                                    value: false,
                                    label: 'Chưa kích hoạt',
                                },
                                {
                                    value: true,
                                    label: 'Đã kích hoạt',
                                },
                            ]}
                        />
                    </div>
                    <Form
                        form={form}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 24 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <div className="profile__block">
                            <div className="profile__block--title">Thông tin cá nhân</div>

                            <div className="profile__block--content">
                                <div style={{ width: '100%' }}>
                                    Họ và tên
                                    <Input disabled placeholder="Họ và tên" value={user?.name} />
                                </div>
                            </div>
                            <div className="profile__block--content">
                                <div style={{ width: '100%' }}>
                                    Email
                                    <Form.Item
                                        style={{ width: '100%' }}
                                        name={'email'}
                                        rules={[
                                            { required: true, message: t('validate.email_required') },
                                            { pattern: REGEX_CHECK_EMAIL, message: t('validate.email_invalid') },
                                            { max: 50, message: t('validate.max_length_email') },
                                        ]}
                                    >
                                        <Input placeholder="Email" />
                                    </Form.Item>
                                </div>
                                <div style={{ width: '100%' }}>
                                    Giới tính
                                    <Input disabled placeholder="Giới tính" value={user?.gender} />
                                </div>
                            </div>
                            <div className="profile__block--content">
                                <div style={{ width: '100%' }}>
                                    Địa chỉ
                                    <Form.Item
                                        style={{ width: '100%' }}
                                        rules={[{ max: 255, message: t('validate.max_length_address') }]}
                                    >
                                        <Input disabled placeholder="Địa chỉ" />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                        <div className="profile__block">
                            <div className="profile__block--title">Thông tin CCCD</div>
                            <div className="profile__block--content">
                                <div style={{ width: '100%' }}>
                                    Số CCCD
                                    <Input disabled placeholder="Số CCCD" value={user?.identity_number} />
                                </div>
                                <div style={{ width: '100%' }}>
                                    Sinh nhật
                                    <Input disabled placeholder="Sinh nhật" value={user?.dob ? formatDate(user?.dob) : null} />
                                </div>
                            </div>
                            <div className="profile__block--content">
                                <div style={{ width: '100%' }}>
                                    Ngày bắt đầu
                                    <Input disabled placeholder="Ngày bắt đầu" value={user?.issue_date ? formatDate(user?.issue_date) : null} />
                                </div>
                                <div style={{ width: '100%' }}>
                                    Ngày hết hạn
                                    <Input disabled placeholder="Ngày hết hạn" value={user?.valid_date ? formatDateVN(user?.valid_date) : null} />
                                </div>
                            </div>
                            <div className="profile__block--content">
                                <div style={{ width: '100%' }}>
                                    Địa điểm
                                    <Input disabled placeholder="Địa điểm làm CCCD" value={user?.issue_place ? user?.issue_place : null} />
                                </div>
                            </div>
                            <div className="profile__block--content">
                                <div style={{ width: '100%' }}>
                                    <div> Mặt trước</div>
                                    {user.identity_image_front ? <img
                                        src={removeString(user?.identity_image_front, '/api')}
                                        width={300}
                                        height={180}
                                        alt="front_img"
                                    /> : <img width={300} height={180} src={FrontImg} alt="img_front" />
                                    }

                                </div>
                                <div style={{ width: '100%' }}>
                                    <div> Mặt sau</div>

                                    {user.identity_image_back ? <img
                                        src={removeString(user?.identity_image_back, '/api')}
                                        width={300}
                                        height={180}
                                        alt="back_img"
                                    /> : <img width={300} height={180} src={BackImg} alt="img_back" />}
                                </div>
                            </div>
                        </div>
                        <Button
                            style={{ marginTop: '3rem', marginBottom: '0.4rem', width: '100%' }}
                            size="medium"
                            type="primary"
                            htmlType="submit"
                        >
                            Thay đổi
                        </Button>
                        <Popconfirm placement="top" title={'Bạn có muốn xóa người dùng này?'} onConfirm={onConfirmDelete} okText="Xác nhận" cancelText="Hủy">
                            <Button style={{ width: '100%' }} type="danger" size={'medium'} >Xóa</Button>
                        </Popconfirm>
                    </Form>
                </Card>
            )}
        </>
    );
}

export default DetailUser;
import React, { useEffect, useState } from 'react';
import { Card, Tag, Input, Button, Form } from 'antd';
import UploadAvatar from 'components/Common/uploadAvatar';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import profileApi from 'apis/profile';
import { setIsGetMe } from 'app/slices/userSlice';
import { getColorStatusAccount, getNameGender, getNameStatusAccount } from 'helper/generate';
import { errorMes, successMes } from 'helper/notify';
import './index.scss';
import { REGEX_CHECK_EMAIL } from 'helper/regex';

function Profile() {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  let userInfo = useAppSelector((state) => state.user.userInfo);
  const dispatch = useAppDispatch();
  const [loadingAvatar, setLoadingAvatar] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [previewImg, setPreviewImg] = useState<any>(userInfo?.avatar ? userInfo?.avatar : '');
  const onFinishFailed = (errorInfo: any) => {};
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const { data } = await profileApi.updateProfile(values);
      if (data) {
        successMes(t('notify.update_success'));
      }
    } catch (error: any) {
      setLoading(false);
      errorMes(error?.data?.message);
    }
  };
  const setInitForm = (userInfo: any) => {
    form.setFieldsValue({
      email: userInfo?.email,
      address: userInfo?.address,
    });
  };
  const onUpdateAvatar = async (file: any) => {
    try {
      setLoadingAvatar(true);
      const { data } = await profileApi.uploadAvt(file);
      if (data) {
        dispatch(setIsGetMe(true));
        setLoadingAvatar(false);
      }
    } catch (error) {
      setLoadingAvatar(false);
    }
  };
  useEffect(() => {
    if (!userInfo) return;
    setPreviewImg(userInfo.avatar);
    setInitForm(userInfo);
  }, [userInfo]);
  return (
    <Card className="profile">
      <div className="profile__block">
        <div className="profile__block--title">Ảnh đại diện</div>
        <UploadAvatar
          disabled={false}
          loading={loadingAvatar}
          previewImg={previewImg}
          onUpdateAvatar={onUpdateAvatar}
        />
      </div>
      <div className="profile__block">
        <div className="profile__block--title">Trạng thái tài khoản</div>
        <Tag color={getColorStatusAccount(userInfo?.is_activated)}>
          {getNameStatusAccount(userInfo?.is_activated)}
        </Tag>
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
              <Input disabled placeholder="User name" value={userInfo?.name} />
            </div>{' '}
            <div style={{ width: '100%' }}>
              Số điện thoại
              <Input disabled placeholder="Phone number" value={userInfo?.phone_number} />
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
                <Input />
              </Form.Item>
            </div>
            <div style={{ width: '100%' }}>
              Giới tính
              <Input disabled placeholder="Gender" value={getNameGender(userInfo?.gender)} />
            </div>
          </div>
          <div className="profile__block--content">
            <div style={{ width: '100%' }}>
              Địa chỉ
              <Form.Item
                style={{ width: '100%' }}
                name={'address'}
                rules={[{ max: 255, message: t('validate.max_length_address') }]}
              >
                <Input placeholder="Address" />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="profile__block">
          <div className="profile__block--title">Info ID Card</div>
          <div className="profile__block--content">
            <div style={{ width: '100%' }}>
              Số CCCD
              <Input disabled placeholder="User name" value={userInfo?.name} />
            </div>
          </div>
          <div className="profile__block--content">
            <div style={{ width: '100%' }}>
              Ngày bắt đầu
              <Input disabled value={userInfo?.name} />
            </div>
            <div style={{ width: '100%' }}>
              Ngày hết hajn
              <Input disabled value={userInfo?.name} />
            </div>
          </div>
          <div className="profile__block--content">
            <div style={{ width: '100%' }}>
              Địa điểm
              <Input disabled placeholder="User name" value={userInfo?.name} />
            </div>
          </div>
          <div className="profile__block--content">
            <div style={{ width: '100%' }}>
              Mặt trước
              <Input disabled value={userInfo?.name} />
            </div>
            <div style={{ width: '100%' }}>
              Mặt sau
              <Input disabled value={userInfo?.name} />
            </div>
          </div>
        </div>
        <Button style={{ marginTop: '2rem' }} loading={loading} type="primary" htmlType="submit">
          Thay đổi
        </Button>
      </Form>
    </Card>
  );
}

export default Profile;

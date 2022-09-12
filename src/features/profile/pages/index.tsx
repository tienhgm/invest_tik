import React, { useEffect, useState } from 'react';
import { Card, Tag, Input, Button } from 'antd';
import UploadAvatar from 'components/Common/uploadAvatar';
import './index.scss';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import profileApi from 'apis/profile';
import { setIsGetMe } from 'app/slices/userSlice';
import { getColorStatusAccount, getNameGender, getNameStatusAccount } from 'helper/generate';
function Profile() {
  let userInfo = useAppSelector((state) => state.user.userInfo);
  const dispatch = useAppDispatch();
  const [loadingAvatar, setLoadingAvatar] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<any>(userInfo?.email);
  const [address, setAddress] = useState<any>(userInfo?.address);
  const [previewImg, setPreviewImg] = useState<any>(userInfo?.avatar ? userInfo?.avatar : '');
  useEffect(() => {
    if (!userInfo) return;
    setPreviewImg(userInfo.avatar);
  }, [userInfo]);

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const onChangeAddress = (e: any) => {
    setAddress(e.target.value);
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
  return (
    <Card className="profile">
      <div className="profile__block">
        <div className="profile__block--title">Avatar</div>
        <UploadAvatar
          disabled={false}
          loading={loadingAvatar}
          previewImg={previewImg}
          onUpdateAvatar={onUpdateAvatar}
        />
      </div>
      <div className="profile__block">
        <div className="profile__block--title">Status</div>
        <Tag color={getColorStatusAccount(userInfo?.is_activated)}>
          {getNameStatusAccount(userInfo?.is_activated)}
        </Tag>
      </div>
      <div className="profile__block">
        <div className="profile__block--title">Personal info</div>
        <div className="profile__block--content">
          <div style={{ width: '100%' }}>
            User name
            <Input disabled placeholder="User name" value={userInfo?.name} />
          </div>{' '}
          <div style={{ width: '100%' }}>
            Phone number
            <Input disabled placeholder="Phone number" value={userInfo?.phone_number} />
          </div>
        </div>
        <div className="profile__block--content">
          <div style={{ width: '100%' }}>
            Email
            <Input placeholder="Email" value={email} onChange={onChangeEmail} />
          </div>
          <div style={{ width: '100%' }}>
            Gender
            <Input disabled placeholder="Gender" value={getNameGender(userInfo?.gender)} />
          </div>
        </div>
        <div className="profile__block--content">
          <div style={{ width: '100%' }}>
            Address
            <Input placeholder="Address" value={address} onChange={onChangeAddress} />
          </div>
        </div>
      </div>
      <div className="profile__block">
        <div className="profile__block--title">Info ID Card</div>
        <div className="profile__block--content">
          <div style={{ width: '100%' }}>
            ID number
            <Input disabled placeholder="User name" value={userInfo?.name} />
          </div>
        </div>
        <div className="profile__block--content">
          <div style={{ width: '100%' }}>
            Start date
            <Input disabled value={userInfo?.name} />
          </div>
          <div style={{ width: '100%' }}>
            End date
            <Input disabled value={userInfo?.name} />
          </div>
        </div>
        <div className="profile__block--content">
          <div style={{ width: '100%' }}>
            Place
            <Input disabled placeholder="User name" value={userInfo?.name} />
          </div>
        </div>
        <div className="profile__block--content">
          <div style={{ width: '100%' }}>
            Front
            <Input disabled value={userInfo?.name} />
          </div>
          <div style={{ width: '100%' }}>
            Back
            <Input disabled value={userInfo?.name} />
          </div>
        </div>
      </div>
      <Button style={{ marginTop: '2rem' }} loading={loading} type="primary">
        Change
      </Button>
    </Card>
  );
}

export default Profile;

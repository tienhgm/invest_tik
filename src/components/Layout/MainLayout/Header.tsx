import React, { useEffect } from 'react';
import { Avatar, Badge, Dropdown, Menu } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useRouteMatch } from 'react-router-dom';
import authApi from 'apis/auth';
import { authActions } from 'app/slices/authSlice';
import styles from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { removeString } from 'helper/generate';
import socketClient from 'helper/socketClient';
import { useAppDispatch, useAppSelector } from 'app/hooks';

interface IHeader {
  avatar: string;
}
function Header({ avatar }: IHeader) {
  const match = useRouteMatch();
  const dispatch = useAppDispatch();
  let userInfo = useAppSelector((state) => state.user.userInfo);
  const { t } = useTranslation();
  const listNotify = [
    { key: '0', name: 'Noti 1' },
    { key: '1', name: 'Noti 2' },
    { key: '2', name: 'Noti 3' },
  ];

  const handleLogout = async () => {
    try {
      await authApi.logout();
      dispatch(authActions.logout());
    } catch (error) { }
  };
  const menuNavbar = (
    <Menu style={{ minWidth: '10rem' }}>
      <Menu.Item key="10">
        <Link to={`${match.path}/profile`}>{t('common.profile')}</Link>
      </Menu.Item>
      <Menu.Item key="11">
        <Link to={`${match.path}/profile`}>{t('common.setting')}</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="111" onClick={() => handleLogout()}>
        {t('common.logout')}
      </Menu.Item>
    </Menu>
  );
  const notifyNavbar = (
    <Menu style={{ minWidth: '20rem' }}>
      {listNotify &&
        listNotify.map((item: any) => (
          <Menu.Item key={item.key} style={{ padding: '1.3rem 0.4rem' }}>
            {item.name}
          </Menu.Item>
        ))}
    </Menu>
  );

  useEffect(() => {
    const channel = socketClient.private(`notification.${userInfo.id}`);
    console.log(channel);

    channel.listen('.notification.new', (e: any) => {
      console.log(e);
      console.log('zo');
      
    });
    return () => { };
  }, []);

  return (
    <div className={styles.headerPage}>
      <Dropdown overlay={notifyNavbar} trigger={['click']}>
        <Badge count={2}>
          <BellOutlined className={styles.notify} />
        </Badge>
      </Dropdown>
      <Dropdown overlay={menuNavbar} trigger={['click']}>
        {!avatar ? (
          <Avatar size={40} icon={<UserOutlined />} className={styles.dropAvt} />
        ) : (
          <img src={removeString(avatar, '/api')} className={styles.imgAvatar} alt="avt" />
        )}
      </Dropdown>
    </div>
  );
}

export default Header;

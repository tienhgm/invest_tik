import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Dropdown, Menu, Tooltip } from 'antd';
import { BellOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import authApi from 'apis/auth';
import { authActions } from 'app/slices/authSlice';
import styles from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { removeString } from 'helper/generate';
import socketClient from 'helper/socketClient';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import notiApi from 'apis/notification';

interface IHeader {
  avatar: string;
}
function Header({ avatar }: IHeader) {
  const match = useRouteMatch();
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(0);
  const history = useHistory();
  const [listNoti, setListNoti] = useState<any>(null);
  let userInfo = useAppSelector((state) => state.user.userInfo);
  const { t } = useTranslation();
  const onGoToNotiDetail = (link: string) => {
    history.push(link)
  }
  const handleLogout = async () => {
    try {
      await authApi.logout();
      dispatch(authActions.logout());
    } catch (error) { }
  };
  const onToggleNotify = async () => {
    try {
      setCount(0);
      const { data } = await notiApi.getNotification();
      if (data) {
        setListNoti(data)
      }
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
    <div style={{ width: '22rem', maxHeight: '40rem', overflow: 'scroll', backgroundColor: '#fff' }}>
      {listNoti && listNoti?.length ?
        listNoti.map((item: any) => (
          <div className={styles.notify} key={item.id} onClick={() => onGoToNotiDetail(item.related_url)}>
            <div className={styles.notify__block} >
              <MailOutlined style={{ fontSize: '2rem' }} />
              <div className={styles.notify__block__text}><Tooltip title={item.message} placement="topLeft">
                {item.message}
              </Tooltip></div>
              {item.status !== 0 ? <Badge color="green" /> : <></>}
            </div>
          </div>
        ))
        : <div style={{padding: '1rem 1rem 0 1rem', fontWeight: 600}}>Không có thông báo</div>
      }
          
    </div>
  );

  useEffect(() => {
    const channel = socketClient.private(`notification.${userInfo.id}`);
    console.log(channel);

    channel.listen('.notification.new', (e: any) => {
      setCount((prevState: any) => prevState + 1);

    });
    return () => { };
  }, []);

  return (
    <div className={styles.headerPage}>
      <Dropdown overlay={notifyNavbar} trigger={['click']} arrow={true}>
        <Badge count={count}>
          <BellOutlined className={styles.notifyBell} onClick={onToggleNotify} />
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

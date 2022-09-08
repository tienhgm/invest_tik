import { Avatar, Badge, Dropdown, Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  UserOutlined,
  DashboardOutlined,
  BellOutlined,
  CalculatorOutlined,
  HistoryOutlined,
  ProfileOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import styles from './style.module.scss';
import { getPathKey } from 'helper/generate';
import { lazy, useEffect, useRef, useState } from 'react';
import { Link, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import { NotFound } from 'components/Common';
import { useTranslation } from 'react-i18next';
import SelectLanguage from 'components/Common/SelectLanguage';
import authApi from 'apis/auth';
import { authActions } from 'app/slices/authSlice';
import { useAppDispatch } from 'app/hooks';
import { Footer } from 'antd/lib/layout/layout';
import { setUserInfo } from 'app/slices/userSlice';
const { Content, Sider } = Layout;
const Dashboard = lazy(() => import('features/dashboard/pages'));
const Funds = lazy(() => import('features/funds/pages'));
const InterestTool = lazy(() => import('features/tool-interest/pages'));
const Settings = lazy(() => import('features/settings/pages'));
const Profile = lazy(() => import('features/profile/pages'));
export default function MainLayout() {
  const { t } = useTranslation();
  const location = useLocation();
  const match = useRouteMatch();
  const [collapsed, setcollapsed] = useState(false);
  const [key, setKey] = useState<any>(getPathKey(location.pathname.split('/')[2]));
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    try {
      await authApi.logout();
      dispatch(authActions.logout());
    } catch (error) {}
  };
  const onCollapse = () => {
    setcollapsed(!collapsed);
  };
  const onGetMe = async () => {
    try {
      const { data } = await authApi.getMe();
      if (data) {
        dispatch(setUserInfo(data));
      }
    } catch (error) {}
  };
  useEffect(() => {
    onGetMe();
  }, []);

  let isLogout = useRef(localStorage.getItem('logoutSuccess'));
  useEffect(() => {
    if (isLogout.current === 'true') {
      dispatch(authActions.logout());
      localStorage.removeItem('logoutSuccess');
    }
    return () => {
      isLogout.current = null;
    };
  }, [isLogout]);

  const listNotify = [
    { key: '0', name: 'Noti 1' },
    { key: '1', name: 'Noti 2' },
    { key: '2', name: 'Noti 3' },
  ];
  const menuNavbar = (
    <Menu style={{ minWidth: '10rem' }}>
      <Menu.Item key="10">
        <Link to={`${match.path}/profile`}>{t('common.profile')}</Link>
      </Menu.Item>
      <Menu.Item key="11">
        <Link to={`${match.path}/profile`}>{t('common.setting')}</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="111" onClick={handleLogout}>
        {t('common.logout')}
      </Menu.Item>
    </Menu>
  );
  const menuSidebar = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      link: match.path,
      text: t('common.dashboard'),
    },
    {
      key: '2',
      icon: <DesktopOutlined />,
      link: `${match.path}/funds`,
      text: t('common.funds'),
    },
    {
      key: '3',
      icon: <CalculatorOutlined />,
      link: `${match.path}/interest-tool`,
      text: t('common.interest_tool'),
    },
    {
      key: '8',
      icon: <HistoryOutlined />,
      link: `${match.path}/interest-tool`,
      text: t('common.history_transaction'),
    },
    {
      key: '9',
      icon: <BellOutlined />,
      link: `${match.path}/interest-tool`,
      text: t('common.notify'),
    },
    {
      key: '10',
      icon: <ProfileOutlined />,
      link: `${match.path}/profile`,
      text: t('common.profile'),
    },
    {
      key: '11',
      icon: <SettingOutlined />,
      link: `${match.path}/settings`,
      text: t('common.setting'),
    },
  ];
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
    let path = location.pathname.split('/')[2];
    let key = getPathKey(path);
    setKey(key);
  }, [location.pathname.split('/')[2]]);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        className="site-layout-background"
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        theme="light"
      >
        <div className={styles.title}>
          <Link to={'/'}>KLTN</Link>
        </div>
        {key ? (
          <Menu defaultSelectedKeys={[key]} mode="inline">
            {menuSidebar.map((item: any) => (
              <Menu.Item key={`${item.key}`} icon={item.icon}>
                <Link to={item.link}>{item.text}</Link>
              </Menu.Item>
            ))}
          </Menu>
        ) : (
          <Menu mode="inline">
            <Menu.Item key="99" icon={<CalculatorOutlined />}>
              <Link to={`${match.path}/interest-tool`}>{t('common.home')}</Link>
            </Menu.Item>
          </Menu>
        )}
      </Sider>
      <Layout className="site-layout">
        <div className={styles.headerPage}>
          <Dropdown overlay={notifyNavbar} trigger={['click']}>
            <Badge count={2}>
              <BellOutlined className={styles.notify} />
            </Badge>
          </Dropdown>
          <Dropdown overlay={menuNavbar} trigger={['click']}>
            <Avatar size={40} icon={<UserOutlined />} className={styles.dropAvt} />
          </Dropdown>
          <SelectLanguage />
        </div>
        <Content style={{ margin: '1rem' }}>
          <Switch>
            <Route path={`/dashboard`} component={Dashboard} exact />
            <Route path={`${match.url}/funds`} component={Funds} />
            <Route path={`${match.url}/interest-tool`} component={InterestTool} />
            <Route path={`${match.url}/profile`} component={Profile} />
            <Route path={`${match.url}/settings`} component={Settings} />
            <Route component={NotFound} />
          </Switch>
        </Content>
        <Footer className={styles['custom-padding']} style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

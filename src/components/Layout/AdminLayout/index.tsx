import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  DashboardOutlined,
  HistoryOutlined,
  UserOutlined,
  ProfileOutlined
} from '@ant-design/icons';
import styles from './style.module.scss';
import { getPathKeyAdmin } from 'helper/generate';
import { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { NotFound } from 'components/Common';
import { useTranslation } from 'react-i18next';
import authApi from 'apis/auth';
import { authActions } from 'app/slices/authSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Footer } from 'antd/lib/layout/layout';
import { setUserInfo, setIsGetMe } from 'app/slices/userSlice';
import Header from '../Header';
import { KEY_SIDE_BAR_ADMIN } from 'enum';
import Logo from 'assets/images/logo_1.png'
const { Content, Sider } = Layout;
import { adminRoutes } from 'routes';
export default function MainLayout() {
  const history = useHistory();
  const { t } = useTranslation();
  const location = useLocation();
  const match = useRouteMatch();
  const [collapsed, setcollapsed] = useState(false);
  const [key, setKey] = useState<any>(
    getPathKeyAdmin(location.pathname.split('/')[2]) ? location.pathname.split('/')[2] : '1'
  );
  const [collapsible, setCollapsible] = useState(true);
  const [menuSidebar, setMenuSidebar] = useState([
    {
      key: KEY_SIDE_BAR_ADMIN.DASHBOARD,
      icon: <DashboardOutlined />,
      link: `${match.path}/dashboard`,
      text: t('common.dashboard'),
    },
    {
      key: KEY_SIDE_BAR_ADMIN.FUND,
      icon: <DesktopOutlined />,
      link: '/admin/funds',
      text: 'Quản lý quỹ',
    },
    {
      key: KEY_SIDE_BAR_ADMIN.TRANSACTIONS,
      icon: <HistoryOutlined />,
      link: `/admin/transactions`,
      text: 'Quản lý giao dịch',
    },
    {
      key: KEY_SIDE_BAR_ADMIN.USER,
      icon: <UserOutlined />,
      link: `/admin/users`,
      text: 'Quản lý người dùng',
    },
    {
      key: KEY_SIDE_BAR_ADMIN.PROFILE,
      icon: <ProfileOutlined />,
      link: `/admin/profile`,
      text: 'Thông tin cá nhân',
    },
  ]);
  const dispatch = useAppDispatch();
  let userInfo = useAppSelector((state) => state.user.userInfo);
  let isGetMe = useAppSelector((state) => state.user.isGetMe);
  const onCollapse = () => {
    setcollapsed(!collapsed);
  };
  const onGetMe = async () => {
    try {
      const { data } = await authApi.getMe();
      if (data) {
        dispatch(setIsGetMe(false));
        dispatch(setUserInfo(data));
        if (!data.is_verify) {
          history.push('/ekyc');
        }
      }
    } catch (error) { }
  };
  useEffect(() => {
    onGetMe();
  }, []);
  useEffect(() => {
    if (!isGetMe) return;
    onGetMe();
  }, [isGetMe]);

  useEffect(() => {
    if (localStorage.logoutSuccess === 'true') {
      dispatch(authActions.logout());
    }
    return () => {
      localStorage.removeItem('logoutSuccess');
    };
  }, []);

  useEffect(() => {
    let path = location.pathname.split('/')[2];
    let key = getPathKeyAdmin(path);
    setKey(key);
  }, [location.pathname.split('/')[2]]);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setCollapsible(false);
      setcollapsed(true);
    } else {
      setCollapsible(true);
      setcollapsed(false);
    }
  }, []);

  return userInfo && (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        className="site-layout-background"
        collapsible={collapsible}
        collapsed={collapsed}
        onCollapse={onCollapse}
        theme="light"
      >
        <div className={styles.title}>
          <Link to={'/'}><img width={!collapsed ? 100 : 65} height={!collapsed ? 55 : 45} src={Logo} /></Link>
        </div>

        {key && <Menu defaultSelectedKeys={[key]} mode="inline">
          {menuSidebar.map((item: any) => (
            <Menu.Item key={`${item.key}`} icon={item.icon}>
              <Link to={item.link}>{item.text}</Link>
            </Menu.Item>
          ))}
        </Menu>}
      </Sider>
      <Layout className="site-layout">
        <Header avatar={userInfo.avatar} />
        <Content style={{ margin: '1rem' }}>
          <Switch>
            {adminRoutes.map((item: any) => (
              <Route key={item.path} path={item.path} exact={item.exact} component={item.component} />
            ))}
            <Route component={NotFound} />
          </Switch>
        </Content>
        <Footer className={styles['custom-padding']} style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

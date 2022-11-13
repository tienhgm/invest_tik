import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  DashboardOutlined,
  BellOutlined,
  CalculatorOutlined,
  HistoryOutlined,
  ProfileOutlined,
  SettingOutlined,
  StockOutlined,
} from '@ant-design/icons';
import styles from './style.module.scss';
import { getPathKey } from 'helper/generate';
import { lazy, useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { NotFound } from 'components/Common';
import { useTranslation } from 'react-i18next';
import authApi from 'apis/auth';
import { authActions } from 'app/slices/authSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Footer } from 'antd/lib/layout/layout';
import { setUserInfo, setIsGetMe } from 'app/slices/userSlice';
import Header from './Header';
import { KEY_SIDE_BAR } from 'enum';
import Logo from 'assets/images/logo_1.png'
const { Content, Sider } = Layout;
const Dashboard = lazy(() => import('features/dashboard/pages'));
const Invest = lazy(() => import('features/invest/pages'));
const Funds = lazy(() => import('features/funds/pages'));
const InterestTool = lazy(() => import('features/tool-interest/pages'));
const Settings = lazy(() => import('features/settings/pages'));
const Profile = lazy(() => import('features/profile/pages'));
const Transactions = lazy(() => import('features/transactions/pages'));
const TransactionDetail = lazy(() => import('features/transactions/pages/id'));
const Ekyc = lazy(() => import('features/auth/pages/ekyc'));
export default function MainLayout() {
  const history = useHistory();
  const { t } = useTranslation();
  const location = useLocation();
  const match = useRouteMatch();
  const [collapsed, setcollapsed] = useState(false);
  const [key, setKey] = useState<any>(
    getPathKey(location.pathname.split('/')[1]) ? location.pathname.split('/')[1] : '1'
  );
  const [collapsible, setCollapsible] = useState(true);
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
    } catch (error) {}
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

  const menuSidebar = [
    {
      key: KEY_SIDE_BAR.DASHBOARD,
      icon: <DashboardOutlined />,
      link: match.path,
      text: t('common.dashboard'),
    },
    {
      key: KEY_SIDE_BAR.INVEST,
      icon: <StockOutlined />,
      link: '/invest',
      text: t('common.invest'),
    },
    {
      key: KEY_SIDE_BAR.FUNDS,
      icon: <DesktopOutlined />,
      link: `/funds`,
      text: t('common.funds'),
    },
    {
      key: KEY_SIDE_BAR.INTEREST_TOOL,
      icon: <CalculatorOutlined />,
      link: `/interest-tool`,
      text: t('common.interest_tool'),
    },
    {
      key: KEY_SIDE_BAR.HISTORY_TRANSACTION,
      icon: <HistoryOutlined />,
      link: `/transactions`,
      text: t('common.history_transaction'),
    },
    {
      key: KEY_SIDE_BAR.NOTIFY,
      icon: <BellOutlined />,
      link: `/interest-tool`,
      text: t('common.notify'),
    },
    {
      key: KEY_SIDE_BAR.PROFILE,
      icon: <ProfileOutlined />,
      link: `/profile`,
      text: t('common.profile'),
    },
    {
      key: KEY_SIDE_BAR.SETTING,
      icon: <SettingOutlined />,
      link: `/settings`,
      text: t('common.setting'),
    },
  ];

  useEffect(() => {
    let path = location.pathname.split('/')[1];
    let key = getPathKey(path);
    setKey(key);
  }, [location.pathname.split('/')[1]]);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setCollapsible(false);
      setcollapsed(true);
    } else {
      setCollapsible(true);
      setcollapsed(false);
    }
  }, []);

  return userInfo && userInfo.is_verify ? (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        className="site-layout-background"
        collapsible={collapsible}
        collapsed={collapsed}
        onCollapse={onCollapse}
        theme="light"
      >
        <div className={styles.title}>
          <Link to={'/'}><img width={!collapsed ? 100: 65} height={!collapsed ? 55 : 45} src={Logo}/></Link>
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
        <Header avatar={userInfo.avatar} />
        <Content style={{ margin: '1rem' }}>
          <Switch>
            <Route path={`/dashboard`} component={Dashboard} exact />
            <Route path={`/invest`} component={Invest} />
            <Route path={`/funds`} component={Funds} exact />
            <Route path={`/interest-tool`} component={InterestTool} exact />
            <Route path={`/transactions`} component={Transactions} exact />
            <Route path={`/transactions/:id`} component={TransactionDetail} exact />
            <Route path={`/profile`} component={Profile} exact />
            <Route path={`/settings`} component={Settings} exact />
            <Route component={NotFound} />
          </Switch>
        </Content>
        <Footer className={styles['custom-padding']} style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  ) : (
    <>
      <Route path={`/ekyc`} component={Ekyc} exact />
    </>
  );
}

import { Avatar, Badge, Dropdown, Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  UserOutlined,
  DashboardOutlined,
  BellOutlined,
  CalculatorOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import styles from './style.module.scss';
import { getPathKey } from 'helper/enum';
import { lazy, useEffect, useState } from 'react';
import { Link, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import { NotFound } from 'components/Common';
import { useTranslation } from 'react-i18next';
import SelectLanguage from 'features/auth/components/SelectLanguage';
import { useAppDispatch } from 'app/hooks';
import { logoutThunk } from 'app/slices/authSlice';
const { Content, Sider } = Layout;
const { SubMenu } = Menu;
const Dashboard = lazy(() => import('features/dashboard/pages'));
const Packages = lazy(() => import('features/packages/pages'));
const InterestTool = lazy(() => import('features/tool-interest/pages'));
export default function MainLayout() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const location = useLocation();
  const match = useRouteMatch();
  const [collapsed, setcollapsed] = useState(false);
  const [key, setKey] = useState<any>(null);
  const handleLogout = () => {
    dispatch(logoutThunk());
  }
  const onCollapse = () => {
    setcollapsed(!collapsed);
  };
  const listNotify = [
    { key: '0', name: 'Noti 1' },
    { key: '1', name: 'Noti 2' },
    { key: '2', name: 'Noti 3' },
  ];
  const menuNavbar = (
    <Menu style={{ minWidth: '10rem' }}>
      <Menu.Item key="0">
        <a href="">{t('common.profile')}</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="">{t('common.setting')}</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={handleLogout}>{t('common.logout')}</Menu.Item>
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
    let path = location.pathname.split('/')[2];
    let handleKey = getPathKey(path);
    setKey(handleKey);
  }, [location.pathname.split('/')[2]]);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} theme="light">
        <div className={styles.title}>
          <Link to={'/'}>INVEST</Link>
        </div>
        {key ? (
          <Menu defaultSelectedKeys={[key]} mode="inline">
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              <Link to={`${match.path}`}>{t('common.dashboard')}</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to={`${match.path}/packages`}>{t('common.packages')}</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<CalculatorOutlined />}>
              <Link to={`${match.path}/interest-tool`}>{t('common.interest_tool')}</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title={t('common.user')}>
              <Menu.Item key="4">{t('common.profile')}</Menu.Item>
              <Menu.Item key="5">{t('common.setting')}</Menu.Item>
              <Menu.Item key="6">{t('common.changePass')}</Menu.Item>
              <Menu.Item key="7">{t('common.otp')}</Menu.Item>
            </SubMenu>  
            <Menu.Item key="8" icon={<HistoryOutlined />}>
              <Link to={`${match.path}/interest-tool`}>{t('common.history_transaction')}</Link>
            </Menu.Item>
            <Menu.Item key="9" icon={<BellOutlined />}>
              <Link to={`${match.path}/interest-tool`}>{t('common.notify')}</Link>
            </Menu.Item>
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
        <Content style={{ margin: '0 16px' }}>
          <Switch>
            <Route path={`/dashboard`} component={Dashboard} exact />
            <Route path={`${match.url}/packages`} component={Packages} />
            <Route path={`${match.url}/interest-tool`} component={InterestTool} />
            <Route component={NotFound} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

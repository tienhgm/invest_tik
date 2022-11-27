import { lazy } from 'react';
const LoginPage = lazy(() => import('features/auth/pages/login'));
const ForgotPassword = lazy(() => import('features/auth/pages/forgot'));
const ResetPassword = lazy(() => import('features/auth/pages/reset'));
const RegisterPage = lazy(() => import('features/auth/pages/register'));
const TwoFaPage = lazy(() => import('features/auth/pages/twofa'));
const Dashboard = lazy(() => import('features/dashboard/pages'));
const Invest = lazy(() => import('features/invest/pages'));
const Funds = lazy(() => import('features/funds/pages'));
const InterestTool = lazy(() => import('features/tool-interest/pages'));
const Settings = lazy(() => import('features/settings/pages'));
const Profile = lazy(() => import('features/profile/pages'));
const Transactions = lazy(() => import('features/transactions/pages'));
const TransactionDetail = lazy(() => import('features/transactions/pages/id'));
const Users = lazy(() => import('features/admin/pages/users'));
const DetailUser = lazy(() => import('features/admin/pages/users/id'));
const CreatelUser = lazy(() => import('features/admin/pages/users/create'));
const FundManagement = lazy(() => import('features/admin/pages/funds'));
const FundDetail = lazy(() => import('features/admin/pages/funds/id'));
const TransactionManagement = lazy(() => import('features/admin/pages/transactions'));

export const authRoutes = [
  {
    path: '/login',
    exact: true,
    component: LoginPage,
  },
  {
    path: '/forgot-password',
    exact: true,
    component: ForgotPassword,
  },
  {
    path: '/reset-password',
    exact: true,
    component: ResetPassword,
  },
  {
    path: '/register',
    exact: true,
    component: RegisterPage,
  },
  {
    path: '/confirm-2fa',
    exact: true,
    component: TwoFaPage,
  },
  // {
  //   path: '/ekyc',
  //   exact: true,
  //   component: Ekyc,
  // },
];
export const mainRoutes = [
  {
    path: '/dashboard', 
    exact: true, 
    component: Dashboard
  },
  {
    path: '/invest', 
    exact: false, 
    component: Invest
  },
  {
    path: '/funds', 
    exact: true, 
    component: Funds
  },
  {
    path: '/interest-tool', 
    exact: true, 
    component: InterestTool
  },
  {
    path: '/transactions', 
    exact: true, 
    component: Transactions
  },
  {
    path: '/transactions/:id', 
    exact: true, 
    component: TransactionDetail
  },
  {
    path: '/profile', 
    exact: true, 
    component: Profile
  },
  {
    path: '/settings', 
    exact: true, 
    component: Settings
  },
]
export const adminRoutes = [
  {
    path: '/admin/dashboard', 
    exact: true, 
    component: Dashboard
  },
  {
    path: '/admin/funds', 
    exact: true, 
    component: FundManagement
  },
  {
    path: '/admin/funds/:id', 
    exact: true, 
    component: FundDetail
  },
  {
    path: '/admin/users', 
    exact: true, 
    component: Users
  },
  {
    path: '/admin/users/create', 
    exact: true, 
    component: CreatelUser
  },
  {
    path: '/admin/users/:id', 
    exact: true, 
    component: DetailUser
  },
  {
    path: '/admin/profile', 
    exact: true, 
    component: Profile
  },
  {
    path: '/admin/transactions', 
    exact: true, 
    component: TransactionManagement
  },
]
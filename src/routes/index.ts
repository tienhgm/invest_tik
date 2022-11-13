import { lazy } from 'react';
const LoginPage = lazy(() => import('features/auth/pages/login'));
const ForgotPassword = lazy(() => import('features/auth/pages/forgot'));
const ResetPassword = lazy(() => import('features/auth/pages/reset'));
const RegisterPage = lazy(() => import('features/auth/pages/register'));
const TwoFaPage = lazy(() => import('features/auth/pages/twofa'));
// const Ekyc = lazy(() => import('features/auth/pages/ekyc'));
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

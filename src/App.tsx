import React, { lazy, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.less';
import { AuthRoute, GuardRoute, NotFound } from 'components/Common';
import authApi from 'apis/auth';
const LoginPage = lazy(() => import('features/auth/pages/login'));
const ForgotPassword = lazy(() => import('features/auth/pages/forgot'));
const ResetPassword = lazy(() => import('features/auth/pages/reset'));
const RegisterPage = lazy(() => import('features/auth/pages/register'));
const MainLayout = lazy(() => import('components/Layout/MainLayout'));

function App() {
  const location = useLocation();
  const history = useHistory();
  const handleGetCsrfToken = async () => {
    await authApi.getCsrfToken();
  };
  useEffect(() => {
    if (location.pathname === '/') {
      history.push('/dashboard');
    }
  }, [history, location.pathname]);
  useEffect(() => {
    handleGetCsrfToken();
  }, []);

  return (
    <div className="App">
      <Switch>
        <AuthRoute path={'/login'} exact component={LoginPage} />
        <AuthRoute path={'/forgot-password'} exact component={ForgotPassword} />
        <AuthRoute path={'/reset-password'} exact component={ResetPassword} />
        <AuthRoute path={'/register'} exact component={RegisterPage} />
        <GuardRoute path={'/dashboard'} component={MainLayout}></GuardRoute>
        <Route component={NotFound}></Route>
      </Switch>
    </div>
  );
}

export default App;

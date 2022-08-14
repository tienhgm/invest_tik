import React, { lazy, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.less';

import { GuardRoute, NotFound } from 'components/Common';
import { useAppSelector } from 'app/hooks';
import { selectIsLoggedIn } from 'app/slices/authSlice';
import authApi from 'apis/auth';
const LoginPage = lazy(() => import('features/auth/pages/login'));
const ForgotPassword = lazy(() => import('features/auth/pages/forgot'));
const RegisterPage = lazy(() => import('features/auth/pages/register'));
const MainLayout = lazy(() => import('components/Layout/MainLayout'));

function App() {
  const location = useLocation();
  const history = useHistory();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
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
        <Route path={'/login'} exact>
          {isLoggedIn ? <Redirect to={'/dashboard'} /> : <LoginPage />}
        </Route>
        <Route path={'/forgot-password'} exact>
          {isLoggedIn ? <Redirect to={'/dashboard'} /> : <ForgotPassword />}
        </Route>
        <Route path={'/register'} exact>
          {isLoggedIn ? <Redirect to={'/dashboard'} /> : <RegisterPage />}
        </Route>
        <GuardRoute path={'/dashboard'} component={MainLayout}></GuardRoute>
        <Route component={NotFound}></Route>
      </Switch>
    </div>
  );
}

export default App;

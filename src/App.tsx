import React, { lazy, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.less';

import { GuardRoute, NotFound } from 'components/Common';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getCsrfToken, selectIsLoggedIn } from 'app/slices/authSlice';
const LoginPage = lazy(() => import('features/auth/pages/login'));
const RegisterPage = lazy(() => import('features/auth/pages/register'));
const MainLayout = lazy(() => import('components/Layout/MainLayout'));

function App() {
  const location = useLocation();
  const history = useHistory();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const handleGetCsrfToken = async () => {
    await dispatch(getCsrfToken());
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
        <Route path={'/register'} exact component={RegisterPage}></Route>
        <GuardRoute path={'/dashboard'} component={MainLayout}></GuardRoute>
        <Route component={NotFound}></Route>
      </Switch>
    </div>
  );
}

export default App;

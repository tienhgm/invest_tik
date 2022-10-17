import React, { lazy, useEffect } from 'react';
// @ts-ignore
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.less';
import { AuthRoute, GuardRoute, NotFound } from 'components/Common';
import authApi from 'apis/auth';
import { authRoutes } from 'routes';
import Verify from 'features/auth/pages/verify';
import { useAppSelector } from 'app/hooks';
const MainLayout = lazy(() => import('components/Layout/MainLayout'));
function App() {
  const location = useLocation();
  const history = useHistory();
  const handleGetCsrfToken = async () => {
    await authApi.getCsrfToken();
  };
  let isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (location.pathname === '/' && isLoggedIn) {
      history.push('/dashboard');
    }
  }, [history, location.pathname]);
  useEffect(() => {
    handleGetCsrfToken();
  }, []);

  return (
    <div className="App">
      <TawkMessengerReact propertyId="634a8c08d85aaa131820c796" widgetId="1gfdj611h" />
      <Switch>
        <Route path={'/verify/:id/:hash'} exact component={Verify}></Route>
        {authRoutes.map((element: any, key: any) => (
          <AuthRoute
            key={key}
            path={element.path}
            exact={element.exact}
            component={element.component}
          />
        ))}
        <GuardRoute path={'/'} component={MainLayout}></GuardRoute>
        <Route component={NotFound}></Route>
      </Switch>
    </div>
  );
}

export default App;

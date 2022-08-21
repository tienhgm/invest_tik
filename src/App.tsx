import React, { lazy, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.less';
import { AuthRoute, GuardRoute, NotFound } from 'components/Common';
import authApi from 'apis/auth';
import { authRoutes } from 'routes';
import Verify from 'features/auth/pages/verify';
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
        {authRoutes.map((element: any, key: any) => (
          <AuthRoute
            key={key}
            path={element.path}
            exact={element.exact}
            component={element.component}
          />
        ))}
        <GuardRoute path={'/dashboard'} component={MainLayout}></GuardRoute>
        <Route path={'/verify/:id/:hash'} exact component={Verify}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </div>
  );
}

export default App;

import { lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
const DashboardPage = lazy(() => import('./dashboard'));
const DefaultPackagePage = lazy(() => import('./default'));
const defaultPackageId = lazy(() => import('./default/_id'));
const CustomPackage = lazy(() => import('./customize'));
export default function Dashboard() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}`} component={DashboardPage}  exact/>
      <Route path={`${match.path}/default`} component={DefaultPackagePage} exact />
      <Route path={`${match.path}/default/:id`} component={defaultPackageId} exact />
      <Route path={`${match.path}/customize`} component={CustomPackage}  exact/>
    </Switch>
  );
}

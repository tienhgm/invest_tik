import { NotFound } from 'components/Common';
import { lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
const InvestPage = lazy(() => import('./invest'));
const DefaultPackagePage = lazy(() => import('./default'));
const CustomizePackage = lazy(() => import('./customize'));
const CreateCustomizePackage = lazy(() => import('./customize/create'));
const PaymentPage = lazy(() => import('./recharge'));
const defaultPackageId = lazy(() => import('./default/_id'));
const CustomPackage = lazy(() => import('./customize'));
const CustomizeId = lazy(() => import('./customize/id'));
export default function Invest() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}`} component={InvestPage}  exact/>
      <Route path={`${match.path}/recharge`} component={PaymentPage} exact />
      <Route path={`${match.path}/recharge/default`} component={DefaultPackagePage} exact />
      <Route path={`${match.path}/recharge/customize`} component={CustomizePackage} exact />
      <Route path={`${match.path}/recharge/customize/create`} component={CreateCustomizePackage} exact />
      <Route path={`${match.path}/recharge/customize/:id`} component={CustomizeId} exact />
      <Route path={`${match.path}/recharge/default/:id`} component={defaultPackageId} exact />
      <Route path={`${match.path}/customize`} component={CustomPackage}  exact/>
      <Route component={NotFound}></Route>
    </Switch>
  );
}

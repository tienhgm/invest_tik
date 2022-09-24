import { NotFound } from 'components/Common';
import { lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
const InvestPage = lazy(() => import('./invest'));
const DefaultPackagePage = lazy(() => import('./default'));
const PaymentPage = lazy(() => import('./payment'));
const defaultPackageId = lazy(() => import('./default/_id'));
const CustomPackage = lazy(() => import('./customize'));
export default function Invest() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}`} component={InvestPage}  exact/>
      <Route path={`${match.path}/payment`} component={PaymentPage} exact />
      <Route path={`${match.path}/payment/default`} component={DefaultPackagePage} exact />
      <Route path={`${match.path}/payment/default/:id`} component={defaultPackageId} exact />
      <Route path={`${match.path}/customize`} component={CustomPackage}  exact/>
      <Route component={NotFound}></Route>
    </Switch>
  );
}

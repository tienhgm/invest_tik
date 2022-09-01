import { useAppSelector } from 'app/hooks';
import React, { ReactElement } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export function GuardRoute(props: RouteProps): ReactElement {
  let isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  if (!isLoggedIn) {
    return <Redirect to={'/login'} />;
  }
  return <Route {...props} />;
}

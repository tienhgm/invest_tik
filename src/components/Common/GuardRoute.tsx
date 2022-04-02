import { useAppSelector } from 'app/hooks';
import React, { ReactElement } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export function GuardRoute(props: RouteProps): ReactElement {
  let isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isActive = useAppSelector((state) => state.auth.curUser?.is_activated);
  if (!isLoggedIn) {
    return <Redirect to={'/login'} />;
  }
  if (isLoggedIn && isActive) {
    return <Redirect to={'/activate'} />;
  }
  return <Route {...props} />;
}

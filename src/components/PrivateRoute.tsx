import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

const PrivateRoute: FC<RouteProps> = ({
  component: Component,
  ...rest
}: RouteProps) => {
  const auth = useSelector((state: RootState) => state.auth);

  return auth.isAuthenticated === true ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;

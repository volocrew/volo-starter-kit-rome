import React, { FC, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import Splash from 'pages/Splash';
import MainPage from 'pages/MainPage';

const Login = React.lazy(() => import('pages/auth/Login'));
const SetPassword = React.lazy(() => import('pages/auth/SetPassword'));
const MFALogin = React.lazy(() => import('pages/auth/MFALogin'));

const Routes: FC = () => {
  return (
    <Switch>
      <Route exact path="/splash" component={Splash} />
      <Route exact path="/">
        <Redirect to="/splash" />
      </Route>

      <Suspense fallback={<div>Loading...</div>}>
        <PrivateRoute path="/" component={MainPage} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/set-password" component={SetPassword} />
        <Route exact path="/mfa-login" component={MFALogin} />
      </Suspense>
    </Switch>
  );
};

export default Routes;

import React, { FC, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';

const Dashboard = React.lazy(() => import('pages/Dashboard'));
const ControlBoard = React.lazy(() => import('pages/ControlBoard'));
const MainSettings = React.lazy(() => import('pages/MainSettings'));
const Notifications = React.lazy(() => import('pages/Notifications'));
const Preferences = React.lazy(() => import('pages/Preferences'));

const MainRoutes: FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/control-board" />
      </Route>

      <Suspense fallback={<div>Loading...</div>}>
        <PrivateRoute path="/control-board" component={ControlBoard} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/main-settings" component={MainSettings} />
        <PrivateRoute exact path="/notifications" component={Notifications} />
        <PrivateRoute exact path="/preferences" component={Preferences} />
      </Suspense>
    </Switch>
  );
};

export default MainRoutes;

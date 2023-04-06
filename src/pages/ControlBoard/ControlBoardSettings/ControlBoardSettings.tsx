import React, { FC, useRef } from 'react';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { Switch, Redirect, Route } from 'react-router-dom';
import SettingsNavBar from './nav/SettingsNavBar';

const PushEmailSettings = React.lazy(() => import('./PushEmailSettings'));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: theme.spacing(4)
    },
    navBar: {
      marginRight: theme.spacing(4),
      width: 275,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 'calc(100vh - 290px)'
    },
    saveButton: {
      width: '80%',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    body: {
      width: 'calc(100% - 275px)'
    }
  })
);

export interface RefObject {
  submit: () => void;
}

const ControlBoardSettings: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.navBar}>
        <SettingsNavBar />
      </div>

      <div className={classes.body}>
        <Switch>
          <Route
            path="/control-board/settings/settings-push"
            component={() => (
              <Switch>
                <Route
                  exact
                  path="/control-board/settings/settings-push/push-email"
                  component={() => <PushEmailSettings />}
                />
                <Route exact path="/control-board/settings/settings-push">
                  <Redirect to="/control-board/settings/settings-push/push-email" />
                </Route>
              </Switch>
            )}
          />
          <Route
            exact
            path="/control-board/settings/settings-limit"
            component={() => <Typography>Settings Limit</Typography>}
          />
          <Route
            exact
            path="/control-board/settings/settings-trade"
            component={() => <Typography>Settings Trade</Typography>}
          />
          <Route exact path="/control-board/settings">
            <Redirect to="/control-board/settings/settings-push" />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default ControlBoardSettings;

import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppBar } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
// import UnderConstruction from 'components/UnderConstruction';
import ControlBoardOptionsBar from './ControlBoardOptionsBar';
import ControlBoardSettings from './ControlBoardSettings';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      background: theme.palette.background.default,
      boxShadow: 'none',
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
    },
    body: {
      margin: theme.spacing(4)
    }
  })
);

const ControlBoard: FC = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="sticky" className={classes.appBar}>
        <ControlBoardOptionsBar />
      </AppBar>

      <div className={classes.body}>
        <Switch>
          <Route
            path="/control-board/settings"
            component={ControlBoardSettings}
          />
        </Switch>
      </div>
    </>
  );
};

export default ControlBoard;

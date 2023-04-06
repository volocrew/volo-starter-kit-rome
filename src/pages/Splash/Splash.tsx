import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LogoVolo from 'static/images/volo-logo-full-color.png';
import Button from 'components/common/Button';

const useStyles = makeStyles(theme => ({
  splashContainer: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: ' 100%',
    backgroundColor: '#FFF'
  },
  title: {
    marginTop: 48,
    fontSize: 48
  },
  logo: {
    width: 620
  },
  buttonContainer: {
    paddingTop: 100,
    width: 350,
    height: 300
  },
  button: {
    margin: 'auto 0',
    width: '100%',
    borderRadius: 16,
    marginBottom: 15,
    textTransform: 'capitalize'
  }
}));

const Splash: FC = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.splashContainer}>
      <img src={LogoVolo} alt="VoloLogo" className={classes.logo} />

      {/* <Typography variant="h4" className={classes.title}>
        Welcome to Rome
      </Typography> */}

      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          data-cy="cy-gotoLogin"
          id="button-login"
          className={classes.button}
          color="primary"
          onClick={() => history.push('/login')}>
          Cognito Login
        </Button>
      </div>
    </div>
  );
};

export default Splash;

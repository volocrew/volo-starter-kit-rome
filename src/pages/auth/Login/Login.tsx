import React, { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormGroup from '@material-ui/core/FormGroup';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from 'components/common/TextField';
import Button from 'components/common/Button';
import Spinner from 'components/Spinner';
import VoloLogoLight from 'static/images/volo_logo-light.png';
import { login as loginAction } from 'redux/actions/auth';
import { RootState } from 'redux/store';

const UserSchema = Yup.object().shape({
  username: Yup.string()
    .email('Invalid email')
    .max(48, 'Too Long!')
    .required('Required *'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(48, 'Too Long!')
    .required('Required *')
});

const useStyles = makeStyles(theme => ({
  loginContainer: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: ' 100%',
    backgroundColor: '#FFF'
  },
  formContainer: {
    height: 300
  },
  formGroup: {
    // marginTop: 12,
    alignItems: 'flex-start',
    width: 350,
    position: 'relative'
  },
  buttonGroup: {
    width: 350
  },
  button: {
    margin: 'auto 0',
    width: '100%',
    borderRadius: 16,
    marginBottom: 15,
    textTransform: 'capitalize'
  },
  input: {
    backgroundColor: 'transparent',
    borderRadius: 16
  },
  error: {
    position: 'absolute',
    top: -40,
    color: theme.palette.warning.main
  },
  logo: {
    width: 420,
    marginBottom: 48
  }
}));

type Props = {
  isAlreadyLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login: FC<Props> = ({ isAlreadyLoggedIn }: Props) => {
  const [isChanged, setChanged] = useState(false);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const loginError = useSelector((state: RootState) => state.auth.error);
  const classes = useStyles();
  const dispatch = useDispatch();
  const login = useCallback(
    (username: string, password: string) =>
      dispatch(loginAction(username, password)),
    [dispatch]
  );

  async function submit({
    username,
    password
  }: {
    username: string;
    password: string;
  }) {
    setChanged(false);
    login(username, password);
  }

  function onChangeHandler() {
    setChanged(true);
  }

  return (
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      onSubmit={async ({ username, password }) => {
        submit({
          username,
          password
        });
      }}
      validationSchema={UserSchema}>
      {({ handleSubmit, handleChange, errors, touched }) => (
        <form
          onSubmit={handleSubmit}
          id="loginForm"
          className={classes.loginContainer}>
          <img src={VoloLogoLight} alt="VoloLogo" className={classes.logo} />

          <div className={classes.formContainer}>
            <FormGroup className={classes.formGroup}>
              {((errors.username && touched.username) ||
                (errors.password && touched.password)) && (
                <Typography variant="body2" className={classes.error}>
                  Missing required field *
                </Typography>
              )}

              {!isChanged && loginError && (
                <Typography variant="body2" className={classes.error}>
                  {loginError}
                </Typography>
              )}

              <TextField
                className={classes.input}
                data-cy="cy-loginUsername"
                label="Login Name"
                name="username"
                id="input-username"
                type="text"
                onChange={e => {
                  handleChange(e);
                  onChangeHandler();
                }}
              />

              <TextField
                className={classes.input}
                data-cy="cy-loginPassword"
                label="Password"
                name="password"
                id="input-password"
                type="password-visible"
                onChange={e => {
                  handleChange(e);
                  onChangeHandler();
                }}
              />
            </FormGroup>
            <div className={classes.buttonGroup}>
              {loading && <Spinner loading />}
              {!loading && (
                <>
                  <Button
                    variant="contained"
                    data-cy="cy-loginButton"
                    id="button-login"
                    className={classes.button}
                    color="primary"
                    type="submit">
                    Login
                  </Button>
                  <Button
                    id="button-forgot"
                    className={classes.button}
                    color="primary"
                    onClick={() => {}}>
                    Forgot Password
                  </Button>
                </>
              )}
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Login;

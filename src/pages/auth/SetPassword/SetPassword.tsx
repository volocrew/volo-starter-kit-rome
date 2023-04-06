import React, { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormGroup from '@material-ui/core/FormGroup';
import { IconButton, Tooltip, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from 'components/common/TextField';
import Button from 'components/common/Button';
import Spinner from 'components/Spinner';
import LogoLight from 'static/images/volo_logo-light.png';
import { setPassword as setPasswordAction } from 'redux/actions/auth';
import { RootState } from 'redux/store';

const UserSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password Required')
    .min(12, 'Password must contain 12 charactors')
    .max(48, 'Password is too long!')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/,
      'Password must contain one uppercase, one lowercase, one number and one special case character'
    )
});

const useStyles = makeStyles(theme => ({
  setPasswordContainer: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: ' 100%',
    backgroundColor: '#FFF'
  },
  formContainer: {
    height: 300,
    width: 350
  },
  formGroup: {
    alignItems: 'center',
    position: 'relative'
  },
  button: {
    margin: 'auto 0',
    width: '100%',
    borderRadius: 16,
    marginBottom: 15,
    textTransform: 'capitalize'
  },
  hint: {
    fontSize: 18,
    marginBottom: theme.spacing(2)
  },
  input: {
    backgroundColor: 'transparent',
    borderRadius: 16
  },
  helperText: {
    position: 'relative',
    bottom: 0
  },
  error: {
    position: 'absolute',
    top: -40,
    color: theme.palette.warning.main
  },
  logo: {
    width: 900
  }
}));

const SetPassword: FC = () => {
  const [isChanged, setChanged] = useState(false);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const authError = useSelector((state: RootState) => state.auth.error);
  const cognitoUser = useSelector((state: RootState) => state.auth.cognitoUser);
  const classes = useStyles();
  const dispatch = useDispatch();
  const setPassword = useCallback(
    (password: string) => dispatch(setPasswordAction(password)),
    [dispatch]
  );

  const { requiredAttributes } = cognitoUser?.challengeParam ?? {};

  async function submit({ password }: { password: string }) {
    setChanged(false);
    setPassword(password);
  }

  function onChangeHandler() {
    setChanged(true);
  }

  return (
    <Formik
      initialValues={{
        password: ''
      }}
      onSubmit={async ({ password }) => {
        submit({ password });
      }}
      validationSchema={UserSchema}>
      {({ handleSubmit, handleChange, errors, touched }) => (
        <form
          onSubmit={handleSubmit}
          id="passwordForm"
          className={classes.setPasswordContainer}>
          <img src={LogoLight} alt="Rome Logo" className={classes.logo} />

          <div className={classes.formContainer}>
            <FormGroup className={classes.formGroup}>
              <Typography variant="body2" className={classes.hint}>
                Welcome! Please enter a new password
              </Typography>

              {!isChanged && authError && (
                <Typography variant="body2" className={classes.error}>
                  {authError}
                </Typography>
              )}

              <TextField
                className={classes.input}
                helperTextStyle={classes.helperText}
                label="password"
                name="password"
                id="input-password"
                type="password"
                onChange={e => {
                  handleChange(e);
                  onChangeHandler();
                }}
                endAdornment={
                  <Tooltip title="Password validation: 12 chars minimum, one number, one capital, one symbol">
                    <InfoIcon />
                  </Tooltip>
                }
              />
            </FormGroup>
            <div>
              {loading && <Spinner loading />}
              {!loading && (
                <>
                  <Button
                    variant="contained"
                    id="button-login"
                    className={classes.button}
                    color="primary"
                    type="submit">
                    Confirm
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

export default SetPassword;

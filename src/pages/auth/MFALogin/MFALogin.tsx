import React, { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormGroup from '@material-ui/core/FormGroup';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from 'components/common/Button';
import TextField from 'components/common/TextField';
import Spinner from 'components/Spinner';
import LogoLight from 'static/images/volo_logo-light.png';
import { mfaVerify as mfaVerifyAction } from 'redux/actions/auth';
import { RootState } from 'redux/store';

const ValidSchema = Yup.object().shape({
  accessCode: Yup.string().max(6, 'Too Long!').required('Required *')
});

const useStyles = makeStyles(theme => ({
  container: {
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
    marginTop: theme.spacing(5),
    alignItems: 'flex-start',
    position: 'relative'
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
    width: 900
  }
}));

const MFALogin: FC = () => {
  const [isChanged, setChanged] = useState(false);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const verifyError = useSelector((state: RootState) => state.auth.error);
  const classes = useStyles();
  const dispatch = useDispatch();
  const mfaVerify = useCallback(
    (accessCode: string) => dispatch(mfaVerifyAction(accessCode)),
    [dispatch]
  );

  async function submit({ accessCode }: { accessCode: string }) {
    setChanged(false);
    mfaVerify(accessCode);
  }

  function onChangeHandler() {
    setChanged(true);
  }

  return (
    <Formik
      initialValues={{
        accessCode: ''
      }}
      onSubmit={async ({ accessCode }) => {
        submit({
          accessCode
        });
      }}
      validationSchema={ValidSchema}>
      {({ handleSubmit, handleChange, errors }) => (
        <form
          onSubmit={handleSubmit}
          id="loginForm"
          className={classes.container}>
          <img src={LogoLight} alt="RomeLogo" className={classes.logo} />

          <div className={classes.formContainer}>
            <FormGroup className={classes.formGroup}>
              {errors.accessCode && (
                <Typography variant="body2" className={classes.error}>
                  Missing required field *
                </Typography>
              )}

              {!isChanged && verifyError && (
                <Typography variant="body2" className={classes.error}>
                  {verifyError}
                </Typography>
              )}

              <TextField
                className={classes.input}
                label="Access code"
                name="accessCode"
                id="input-access-code"
                type="text"
                onChange={e => {
                  handleChange(e);
                  onChangeHandler();
                }}
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
                    Verify
                  </Button>
                  <Button
                    id="button-forgot"
                    className={classes.button}
                    color="primary"
                    onClick={() => {}}>
                    Resend code
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

export default MFALogin;

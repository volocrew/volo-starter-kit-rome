import React, { FC, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Modal } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Amplify, { Auth } from 'aws-amplify';
import { DevAlphaConfig, ProdConfig, QAConfig } from 'app.config';
import Spinner from 'components/Spinner';
import { CognitoUser } from 'models/auth';
import * as AuthActions from 'redux/actions/auth';
import { store, history } from 'redux/store';
import ThemeProvider from './ThemeProvider';
import Routes from './Routes';
import './fontawesome';

Amplify.configure({
  Auth: {
    region:
      process.env.REACT_APP_ENV === 'QA'
        ? QAConfig.region
        : process.env.NODE_ENV === 'development'
        ? DevAlphaConfig.region
        : ProdConfig.region,
    userPoolId:
      process.env.REACT_APP_ENV === 'QA'
        ? QAConfig.userPoolId
        : process.env.NODE_ENV === 'development'
        ? DevAlphaConfig.userPoolId
        : ProdConfig.userPoolId,
    userPoolWebClientId:
      process.env.REACT_APP_ENV === 'QA'
        ? QAConfig.userPoolWebClientId
        : process.env.NODE_ENV === 'development'
        ? DevAlphaConfig.userPoolWebClientId
        : ProdConfig.userPoolWebClientId
  },
  API: {
    aws_appsync_graphqlEndpoint:
      process.env.REACT_APP_ENV === 'QA'
        ? QAConfig.awsAppsyncGraphqlEndpoint
        : process.env.NODE_ENV === 'development'
        ? DevAlphaConfig.awsAppsyncGraphqlEndpoint
        : ProdConfig.awsAppsyncGraphqlEndpoint,
    aws_appsync_region:
      process.env.REACT_APP_ENV === 'QA'
        ? QAConfig.region
        : process.env.NODE_ENV === 'development'
        ? DevAlphaConfig.region
        : ProdConfig.region,
    aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
    endpoints: [
      {
        name: 'romeAPI',
        endpoint:
          process.env.REACT_APP_ENV === 'QA'
            ? QAConfig.apiGatewayEndpoint
            : process.env.NODE_ENV === 'development'
            ? DevAlphaConfig.apiGatewayEndpoint
            : ProdConfig.apiGatewayEndpoint
      }
    ]
  }
});

function AppContainer() {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
}

const App: FC = () => {
  const [modalState, setModalState] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // monitor resize
  useEffect(() => {
    if (window.innerWidth <= 1249) {
      setModalState(true);
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth <= 1249) {
        setModalState(true);
      } else {
        setModalState(false);
      }
    });

    initializeApp();
  }, []);

  async function initializeApp() {
    console.log('Runtime Env is ', process.env.NODE_ENV);

    try {
      const currUser: CognitoUser = await Auth.currentAuthenticatedUser();
      await store.dispatch(AuthActions.loginSuccess(currUser));

      setInitializing(false);
    } catch (e) {
      console.log(e);
      setInitializing(false);
    }
  }

  const handleModal = () => {
    setModalState(false);
  };

  return (
    <Provider store={store}>
      <Modal
        open={modalState}
        onClose={handleModal}
        aria-labelledby="resize-window"
        aria-describedby="resize-window">
        <div className="resize-warning">
          Rome is optimized for screens above <strong>1250</strong> pixels wide.{' '}
          <br />
          Please resize your screen or view our app on a higher resolution
          device. <br />
          Thank you.
        </div>
      </Modal>

      <ThemeProvider>
        <CssBaseline />
        {initializing ? (
          <div style={{ height: '100vh' }}>
            <Spinner loading />
          </div>
        ) : (
          <AppContainer />
        )}
      </ThemeProvider>
    </Provider>
  );
};

export default App;

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import Routes from './src/routes/Routes';
import * as firebase from 'firebase';
import env from './src/env';

firebase.initializeApp(env.firebase_config);
const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider> 
  );
}

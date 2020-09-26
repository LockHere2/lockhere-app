import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import Routes from './src/routes/Routes';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider> 
  );
}

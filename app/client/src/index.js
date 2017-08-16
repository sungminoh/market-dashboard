import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from './router';
import configureStore from './store/configureStore';
const store = configureStore();


render((
  <Provider store={store}>
    <AppRouter />
  </Provider>
), document.getElementById('root'));

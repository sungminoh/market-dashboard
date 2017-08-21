import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from './router';
import configureStore from './store/configureStore';
const store = configureStore();

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

render((
  <Provider store={store}>
    <AppRouter />
  </Provider>
), document.getElementById('root'));

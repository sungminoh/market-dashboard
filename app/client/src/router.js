import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Base from './components/pages/basic/Base';
import Login from './components/pages/basic/Login';
import NotFound from './components/pages/basic/NotFound';

import configureStore from './store/configureStore';

const store = configureStore();

export default((
  <Provider store={store}>
    <Router>
      <div>
        {/* Login */}
        <Switch>
          <Route path="/login" component={Login} />
          <Base>
            {/* NotFound */}
            <Route path="*" component={NotFound} />
          </Base>
        </Switch>
      </div>
    </Router>
  </Provider>
));

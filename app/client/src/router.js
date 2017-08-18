import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Base from './components/pages/home/Base';
import Login from './components/pages/home/Login';
import Signup from './components/pages/home/Signup';
import NotFound from './components/pages/home/NotFound';
import Petro from './components/pages/petro';

import PrivateRoute from './utils/PrivateRoute';
import history from './utils/history';

import { createConnectComponent } from './utils/componentUtil';
import { postSession } from './actions/authAction';


class AppRouter extends React.Component {
  componentWillMount() {
    this.props.dispatch(postSession());
  }

  render() {
    const {
      isLoading,
    } = this.props;

    if (isLoading) {
      return null;
    }

    return (
      <Router history={history}>
        <div>
          {/* Login */}
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Base>
              <Switch>
                {/* NotFound */}
                <Route path="/hello" component={NotFound} />
                <PrivateRoute path="/auth" component={NotFound} />
                <PrivateRoute path="/petro" component={Petro} />
                <Route path="*" component={NotFound} />
              </Switch>
            </Base>
          </Switch>
        </div>
      </Router>
    );
  }
}

AppRouter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default createConnectComponent(AppRouter, (state) => {
  const {
    isLoading,
  } = state.authReducer;

  return {
    isLoading,
  };
});

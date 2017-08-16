import React, { PropTypes } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { createConnectComponent } from './componentUtil';


const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location },
      }}
      />
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element]).isRequired,
  isAuthenticated: PropTypes.bool,
  rest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

PrivateRoute.defaultProps = {
  isAuthenticated: false,
  rest: {},
};

export default createConnectComponent(PrivateRoute, (state) => {
  const {
    isAuthenticated,
  } = state.authReducer;

  return {
    isAuthenticated,
  };
});

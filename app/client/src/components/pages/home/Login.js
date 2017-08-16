import React, { PropTypes } from 'react';
import { Redirect } from 'react-router-dom';
import { postLogin } from '../../../actions/authAction';
import { createConnectComponent } from '../../../utils/componentUtil';
import ErrorMessage from '../../common/ErrorMessage';
import AuthButton from '../../common/AuthButton';

/**
 * Login Page Component
 */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isSignup: false,
    };
  }

  onChangeEmail(e) {
    if (!this.props.isLoading) {
      this.setState({ email: e.target.value });
    }
  }

  onChangePassword(e) {
    if (!this.props.isLoading) {
      this.setState({ password: e.target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const dispatch = this.props.dispatch;
    const {
      email,
      password,
    } = this.state;

    dispatch(postLogin({
      email,
      password,
    }));
  }

  render() {
    const {
      isAuthenticated,
      isLoading,
      errorMsg,
    } = this.props;

    const { from } = this.props.location.state || { from: { pathname: '/' } }
    if (isAuthenticated) {
      return <Redirect to={from} />;
    }

    return (
      <div className="login-box">
        <div className="login-logo">
          <b>Dashboard</b> boilerplate
        </div>
        <div className="login-box-body">
          <p className="login-box-msg">Login to start your session</p>
          <ErrorMessage errorMsg={errorMsg} />

          <form>
            <div className="form-group has-feedback">
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Email"
                onChange={this.onChangeEmail.bind(this)}
                value={this.state.email}
              />
              <span className="glyphicon glyphicon-envelope form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={this.onChangePassword.bind(this)}
                value={this.state.password}
              />
              <span className="glyphicon glyphicon-lock form-control-feedback" />
            </div>
            <div className="row form-group">
              <div className="col-xs-12">
                <AuthButton
                  value="log-in"
                  isLoading={isLoading}
                  title="Log In"
                  onClick={this.handleSubmit.bind(this)}
                />
              </div>
            </div>
            <div className="text-center">
              <a href='/signup'> I don't have account </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default createConnectComponent(Login, (state) => {
  const {
    isLoading,
    isAuthenticated,
    errorMsg,
  } = state.authReducer;

  return {
    isLoading,
    isAuthenticated,
    errorMsg,
  };
});

import React, { PropTypes } from 'react';
import { postLogin } from '../../../actions/loginAction';
import { createConnectComponent } from '../../../utils/componentUtil';
import ErrorMessage from '../../common/ErrorMessage';


/**
 * Login Button Component
 * @param isLoading
 * @constructor
 */
const LoginButton = ({ isLoading }) => (
  <button type="submit" className="btn btn-primary btn-block btn-flat">
    <i
      style={{
        display: isLoading ? 'block' : 'none',
      }}
      className="fa fa-spin fa-refresh"
    />
    <span style={{
      display: isLoading ? 'none' : 'block',
    }}
    >
      Sign In
    </span>
  </button>
);

LoginButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

/**
 * Login Page Component
 */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      password: '',
    };
  }

  shouldComponentUpdate(nextProps) {
    const {
      isSuccess,
      redirectUrl,
    } = nextProps;

    if (isSuccess && redirectUrl) {
      window.location.replace(redirectUrl);
      return false;
    }
    return true;
  }

  onChangeUserId(e) {
    if (!this.props.isLoading) {
      this.setState({ userId: e.target.value });
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
      userId,
      password,
    } = this.state;

    dispatch(postLogin({
      userId,
      password,
    }));
  }

  render() {
    const {
      isLoading,
      errorMsg,
    } = this.props;

    return (
      <div className="login-box">
        <div className="login-logo">
          <b>Dashboard</b> boilerplate
        </div>
        <div className="login-box-body">
          <p className="login-box-msg">Sign in to start your session</p>
          <ErrorMessage errorMsg={errorMsg} />

          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group has-feedback">
              <input
                id="userId"
                type="text"
                className="form-control"
                placeholder="Login"
                onChange={this.onChangeUserId.bind(this)}
                value={this.state.userId}
              />
              <span className="glyphicon glyphicon-user form-control-feedback" />
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
            <div className="row">
              <div className="col-xs-12">
                <LoginButton isLoading={isLoading} />
              </div>
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
  isSuccess: PropTypes.bool.isRequired,
};

export default createConnectComponent(Login, (state) => {
  const {
    isLoading,
    isSuccess,
    redirectUrl,
    errorMsg,
  } = state.loginReducer;

  return {
    isLoading,
    isSuccess,
    redirectUrl,
    errorMsg,
  };
});

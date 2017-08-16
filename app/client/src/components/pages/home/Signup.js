import React, { PropTypes } from 'react';
import { postSignup } from '../../../actions/authAction';
import { createConnectComponent } from '../../../utils/componentUtil';
import ErrorMessage from '../../common/ErrorMessage';
import AuthButton from '../../common/AuthButton';

/**
 * Sign up Page Component
 */
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
    };
  }

  shouldComponentUpdate(nextProps) {
    const {
      isSuccess,
      redirect,
    } = nextProps;

    if (isSuccess && redirect) {
      window.location.replace(redirect);
      return false;
    }
    return true;
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

  onChangeName(e) {
    if (!this.props.isLoading) {
      this.setState({ name: e.target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const dispatch = this.props.dispatch;
    const {
      email,
      password,
      name,
    } = this.state;

    dispatch(postSignup({
      email,
      password,
      name,
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
          <p className="login-box-msg">Sign up to start your session</p>
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
            <div className="form-group has-feedback">
              <input
                id="name"
                type="name"
                className="form-control"
                placeholder="Name"
                onChange={this.onChangeName.bind(this)}
                value={this.state.name}
              />
              <span className="glyphicon glyphicon-user form-control-feedback" />
            </div>
            <div className="row">
              <div className="col-xs-12">
                <AuthButton
                  value="sign-up"
                  isLoading={isLoading}
                  title="Sign Up"
                  className="btn-danger"
                  onClick={this.handleSubmit.bind(this)}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string.isRequired,
  isSuccess: PropTypes.bool.isRequired,
};

export default createConnectComponent(Signup, (state) => {
  const {
    isLoading,
    isSuccess,
    redirect,
    errorMsg,
  } = state.authReducer;

  return {
    isLoading,
    isSuccess,
    redirect,
    errorMsg,
  };
});

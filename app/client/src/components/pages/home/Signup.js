import React, { PropTypes } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { postSignup } from '../../../actions/authAction';
import { createConnectComponent } from '../../../utils/componentUtil';
import ErrorMessage from '../../common/ErrorMessage';
import AuthButton from '../../common/AuthButton';
import { SignupText } from '../../../text';


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
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
      isAuthenticated,
      errorMsg,
    } = this.props;

    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (isAuthenticated) {
      return <Redirect to={from} />;
    }

    return (
      <div className="login-box">
        <div className="login-logo">
          {SignupText.LOGO}
        </div>
        <div className="login-box-body">
          <p className="login-box-msg">{SignupText.MESSAGE}</p>
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
            <div className="row form-group">
              <div className="col-xs-12">
                <AuthButton
                  value="log-in"
                  className="btn-danger"
                  isLoading={isLoading}
                  title={SignupText.BUTTON_TITLE}
                  onClick={this.handleSubmit.bind(this)}
                />
              </div>
            </div>
            <div className="text-center">
              <Link to={{
                pathname: '/login',
                state: { from: this.props.location },
              }}
              >{SignupText.LOGIN_LINK}</Link>
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
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Signup.defaultProps = {
  location: {},
};

export default createConnectComponent(Signup, (state) => {
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

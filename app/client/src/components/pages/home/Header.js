import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { postLogout } from '../../../actions/authAction';
import CSSModules from 'react-css-modules';
import { createConnectComponent } from '../../../utils/componentUtil';
import styles from './Header.css';

import history from '../../../utils/history';


class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  //shouldComponentUpdate(nextProps) {
    //const {
      //isSuccess,
      //redirect,
    //} = nextProps;

    //if (isSuccess && redirect) {
      //window.location.replace(redirect);
      //return false;
    //}
    //return true;
  //}

  onClickLogout(e) {
    e.preventDefault();
    this.props.dispatch(postLogout());
  }

  //onClickLogin(e) {
    //e.preventDefault();
    //window.location.replace('/login');
  //}

  render() {
    const {
      isAuthenticated,
    } = this.props;
    return (
      <header className="main-header">
        <Link to={{ pathname: '/' }} className="logo">
          <span className="logo-mini"><b>Dashboard</b></span>
          <span className="logo-lg"><b>Dashboard</b></span>
        </Link>

        <nav className="navbar navbar-static-top" >
          <a href="javascript:;" className="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span className="sr-only">Toggle navigation</span>
          </a>

          <div className="navbar-custom-menu">
            {isAuthenticated
            ? <div onClick={this.onClickLogout.bind(this)} styleName="header-logout__btn" className="pull-right" title="Logout">
                <i className="fa fa-sign-out" />
              </div>
            //: <div onClick={this.onClickLogin.bind(this)} styleName="header-login__btn" className="pull-right" title="Login">
                //<i className="fa fa-sign-in" />
              //</div>
            : <Link to={{ pathname: '/login' }} styleName styleName="header-login__btn" className="pull-right" title="Login">
                <i className="fa fa-sign-in" />
              </Link>
            }
          </div>
        </nav>
      </header>
    )
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  //isSuccess: PropTypes.bool.isRequired,
};

export default createConnectComponent(CSSModules(Header, styles, { allowMultiple: true }), state => {
  const {
    //isSuccess,
    //redirect,
    isAuthenticated,
  } = state.authReducer;

  return {
    //isSuccess,
    //redirect,
    isAuthenticated,
  };
});

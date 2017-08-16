import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import { createConnectComponent } from '../../../utils/componentUtil';
import { postLogout } from '../../../actions/authAction';
import { HeaderText } from '../../../text';
import styles from './Header.css';


class Header extends React.Component {
  onClickLogout(e) {
    e.preventDefault();
    this.props.dispatch(postLogout());
  }

  render() {
    const {
      isAuthenticated,
    } = this.props;
    return (
      <header className="main-header">
        <Link to={{ pathname: '/' }} className="logo">
          <span className="logo-mini"><b>{HeaderText.LOGO_MINI}</b></span>
          <span className="logo-lg"><b>{HeaderText.LOGO_LARGE}</b></span>
        </Link>

        <nav className="navbar navbar-static-top" >
          <a
            href="javascript:;"
            className="sidebar-toggle"
            data-toggle="offcanvas"
            role="button"
          >
            <span className="sr-only">Toggle navigation</span>
          </a>

          <div className="navbar-custom-menu">
            {isAuthenticated ?
              <div
                role="button"
                tabIndex="0"
                onClick={this.onClickLogout.bind(this)}
                styleName="header-logout__btn"
                className="pull-right"
                title="Logout"
              >
                <i className="fa fa-sign-out" />
              </div> :
              <Link
                to={{ pathname: '/login' }}
                styleName="header-login__btn"
                className="pull-right"
                title="Login"
              >
                <i className="fa fa-sign-in" />
              </Link>
            }
          </div>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default createConnectComponent(
  CSSModules(Header, styles, { allowMultiple: true }),
  (state) => {
    const {
      isAuthenticated,
    } = state.authReducer;

    return {
      isAuthenticated,
    };
  }
);

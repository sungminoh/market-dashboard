import React from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from './Header.css';

const Header = () => (
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
        <a href="/api/logout" styleName="header-logout__btn" className="pull-right" title="Logout">
          <i className="fa fa-sign-out" />
        </a>
      </div>
    </nav>
  </header>
);

export default CSSModules(Header, styles, { allowMultiple: true });

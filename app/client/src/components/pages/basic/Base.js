import React, { PropTypes } from 'react';

import Header from './Header';
import SideMenu from './SideMenu';
import Footer from './Footer';

const Base = ({ children }) => (
  <div className="wrapper">
    {/* Header */}
    <Header />

    {/* SideMenu */}
    <SideMenu />

    {/* Contents */}
    <div className="content-wrapper">
      {children}
    </div>

    {/* Footer */}
    <Footer />
  </div>
);

Base.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Base;

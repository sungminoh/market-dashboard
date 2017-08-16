import React, { PropTypes } from 'react';

import Header from './Header';
import SideMenu from './SideMenu';
import Footer from './Footer';

import elementResizeDetectorMaker from 'element-resize-detector';
const erd = elementResizeDetectorMaker({ strategy: 'scroll' });


class Base extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    erd.listenTo(document.getElementsByClassName('content-wrapper')[0], (element) => {
      try{
        let headerHeight = document.getElementsByClassName('main-header')[0].offsetHeight;
        let footerHeight = document.getElementsByClassName('main-footer')[0].offsetHeight;
        element.style.height = (window.innerHeight - headerHeight - footerHeight) + 'px';
      }catch(e){}
    });
  }

  render() {
    const {
      children,
    } = this.props;
    return (
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
  }
}


Base.propTypes = {
  children: PropTypes.node.isRequired,
};


export default Base;

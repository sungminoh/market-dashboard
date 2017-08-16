import React from 'react';
import { FooterText } from '../../../text.js';


const Footer = () => (
  <footer className="main-footer">
    <div className="pull-right hidden-xs">
      {FooterText.RIGHT_SIDE}
    </div>
    {FooterText.MAIN}
  </footer>
);

export default Footer;

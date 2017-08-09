import React from 'react';

/**
 * Error Message Component
 * @param errorMsg
 * @constructor
 */
const ErrorMessage = ({ errorMsg }) => (
  <h5 style={{
    textAlign: 'center',
    display: errorMsg ? 'block' : 'none',
  }}
  >
    <i className="fa fa-warning text-red"/>
    {errorMsg}
  </h5>
);

ErrorMessage.propTypes = {
  errorMsg: React.PropTypes.string,
};

ErrorMessage.defaultProps = {
  errorMsg: '',
};

export default ErrorMessage;

import React, { PropTypes } from 'react';

/**
 * Auth Button Component
 * @param isLoading
 * @constructor
 */
const AuthButton = ({ value, isLoading, title, className, onClick }) => (
  <button
    value={value}
    className={`btn btn-primary btn-block btn-flat ${className}`}
    onClick={onClick}
  >
    <i
      style={{
        display: isLoading ? 'block' : 'none',
      }}
      className="fa fa-spin fa-refresh"
    />
    <span style={{
      display: isLoading ? 'none' : 'block',
      pointerEvents: 'none',
    }}
    >
      {title}
    </span>
  </button>
);

AuthButton.propTypes = {
  value: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

AuthButton.defaultProps = {
  value: '',
  className: '',
  onClick: _ => _,
};

export default AuthButton;

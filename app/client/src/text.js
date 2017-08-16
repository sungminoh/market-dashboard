import React from 'react';

export const AuthText = {
  SIGNUP_FAIL: '[Sign Up Error] Invalid email or password',
  SIGNUP_ERROR: '[Sign Up Error]',
  LOGIN_FAIL: '[Login Error] Invalid email or password',
  LOGIN_ERROR: '[Login Error]',
  LOGOUT_FAIL: '[Logout Error]',
  LOGOUT_ERROR: '[Logout Error]',
  SESSION_FAIL: '',
  SESSION_ERROR: '[Session Error]',
};

export const FooterText = {
  RIGHT_SIDE: 'Sungmin Oh',
  MAIN: (
    <div>
      <strong>
        Copyright &copy; 2017 &nbsp;
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/sungminoh">
          Sungmin Oh
        </a>
        . &nbsp;
      </strong>
      All rights reserved.
    </div>
  )
}

export const HeaderText = {
  LOGO_MINI: '',
  LOGO_LARGE: 'Dashboard',
}

export const LoginText = {
  LOGO: (
    <div>
      <b>Dashboard</b> boilerplate
    </div>
  ),
  MESSAGE: 'Login to start your session',
  SIGNUP_LINK: "I don't have an account.",
  BUTTON_TITLE: 'Log In',
}

export const SignupText = {
  LOGO: (
    <div>
      <b>Dashboard</b> boilerplate
    </div>
  ),
  MESSAGE: 'Sign up to start your session',
  LOGIN_LINK: 'I have an account.',
  BUTTON_TITLE: 'Sign Up',
}


export const NotFoundText = {
  MESSAGE: (
    <h3>
      <i className="fa fa-warning text-yellow" />
      Oops! Page not found.
    </h3>
  )
}

export const SidebarText = {
  HEADER: 'MAIN NAVIGATION',
}

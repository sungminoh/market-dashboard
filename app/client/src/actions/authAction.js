import fetch from 'isomorphic-fetch';
import { AuthActionType } from '../constants';
import { AuthText } from '../text';

const TOKEN = 'token';

export const successLogin = (token) => {
  if (token) {
    localStorage.setItem(TOKEN, token);
  }
  return {
    type: AuthActionType.SUCCESS_LOGIN,
  };
};

export const successLogout = () => {
  localStorage.removeItem(TOKEN);
  return {
    type: AuthActionType.SUCCESS_LOGOUT,
  };
};

export const fail = errorMsg => ({
  type: AuthActionType.FAIL,
  errorMsg,
});

export const postSignup = ({
  email,
  password,
  name,
}) => {
  const SIGNUP_API_URL = '/api/auth/signup';
  const requestInfo = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  };

  return (dispatch) => {
    dispatch({
      type: AuthActionType.POST,
    });

    fetch(
      SIGNUP_API_URL,
      requestInfo,
    ).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    }).then((result) => {
      if (result && result.success) {
        dispatch(successLogin(result.token));
      } else {
        dispatch(fail(AuthText.SIGNUP_FAIL));
      }
    }).catch(err => dispatch(fail(`${AuthText.SIGNUP_ERROR} ${err.toString()}`)));
  };
};

export const postLogin = ({
  email,
  password,
}) => {
  const LOGIN_API_URL = '/api/auth/login';
  const requestInfo = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      email,
      password,
    }),
  };

  return (dispatch) => {
    dispatch({
      type: AuthActionType.POST,
    });

    fetch(
      LOGIN_API_URL,
      requestInfo,
    ).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    }).then((result) => {
      if (result && result.success) {
        dispatch(successLogin(result.token));
      } else {
        dispatch(fail(AuthText.LOGIN_FAIL));
      }
    }).catch(err => dispatch(fail(`${AuthText.LOGIN_ERROR} ${err.toString()}`)));
  };
};

export const postLogout = () => {
  const LOGOUT_API_URL = '/api/auth/logout';
  const requestInfo = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  };

  return (dispatch) => {
    dispatch({
      type: AuthActionType.POST,
    });

    fetch(
      LOGOUT_API_URL,
      requestInfo,
    ).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    }).then((result) => {
      if (result && result.success) {
        dispatch(successLogout());
      } else {
        dispatch(fail(AuthText.LOGOUT_FAIL));
      }
    }).catch(err => dispatch(fail(`${AuthText.LOGOUT_ERROR} ${err.toString()}`)));
  };
};

export const postSession = () => {
  const token = localStorage.getItem(TOKEN);

  const SESSION_API_URL = '/api/auth/session';
  const requestInfo = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      token,
    }),
  };

  return (dispatch) => {
    dispatch({
      type: AuthActionType.POST,
    });
    fetch(
      SESSION_API_URL,
      requestInfo,
    ).then((response) => {
      if (response.status === 200) {
        dispatch(successLogin());
      } else {
        dispatch(fail(AuthText.SESSION_FAIL));
      }
    }).catch(err => dispatch(fail(`${AuthText.SESSION_ERROR} ${err.toString()}`)));
  };
};

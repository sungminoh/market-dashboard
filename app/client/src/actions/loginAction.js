import fetch from 'isomorphic-fetch';
import { LoginActionType } from '../constants';

const LOGIN_API_URL = '/api/login';

export const successLogin = redirectUrl => ({
  type: LoginActionType.SUCCESS,
  redirectUrl,
});

export const failLogin = errorMsg => ({
  type: LoginActionType.FAIL,
  errorMsg,
});

export const postLogin = ({
  userId,
  password,
}) => {
  const requestInfo = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      userId,
      password,
    }),
  };

  return (dispatch) => {
    dispatch({
      type: LoginActionType.POST,
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
      if (result && result.success === 'true') {
        dispatch(successLogin(result.redirectUrl));
      } else {
        dispatch(failLogin('[Login Error] Invalid userId or password'));
      }
    }).catch(err => dispatch(failLogin(`[Login Error] ${err.toString()}`)));
  };
};

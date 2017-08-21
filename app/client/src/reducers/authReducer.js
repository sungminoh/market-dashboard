import { AuthActionType } from '../constants';

const authReducer = (state = {
  isLoggedin: false,
  isAuthenticated: false,
  isLoading: false,
  errorMsg: '',
}, action) => {
  switch (action.type) {
    case AuthActionType.POST_LOGIN:
    case AuthActionType.POST_LOGOUT:
    case AuthActionType.POST_SESSION:
    case AuthActionType.POST_SIGNUP:
      return {
        ...state,
        isLoading: true,
      };
    case AuthActionType.SUCCESS_LOGIN:
      return {
        ...state,
        isLoggedin: true,
        isLoading: false,
        errorMsg: '',
      };
    case AuthActionType.SUCCESS_LOGOUT:
      return {
        ...state,
        isLoggedin: false,
        isAuthenticated: false,
        isLoading: false,
        errorMsg: '',
      };
    case AuthActionType.SUCCESS_AUTH:
      return {
        ...state,
        isLoggedin: true,
        isAuthenticated: true,
        isLoading: false,
        errorMsg: '',
      }
    case AuthActionType.FAIL:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.errorMsg,
      };
    default:
      return state;
  }
};

export default authReducer;

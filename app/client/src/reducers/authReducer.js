import { AuthActionType } from '../constants';

const authReducer = (state = {
  isAuthenticated: false,
  isLoading: false,
  errorMsg: '',
}, action) => {
  switch (action.type) {
    case AuthActionType.POST:
      return {
        ...state,
        isLoading: true,
      };
    case AuthActionType.SUCCESS_LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        errorMsg: '',
      };
    case AuthActionType.SUCCESS_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        errorMsg: '',
      };
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

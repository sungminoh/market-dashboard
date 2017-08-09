import { LoginActionType } from '../constants';

const loginReducer = (state = {
  isLoading: false,
  isSuccess: false,
  redirectUrl: '',
  errorMsg: '',
}, action) => {
  switch (action.type) {
    case LoginActionType.POST:
      return {
        ...state,
        isLoading: true,
      };
    case LoginActionType.SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        redirectUrl: action.redirectUrl,
        errorMsg: '',
      };
    case LoginActionType.FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        errorMsg: action.errorMsg,
      };
    default:
      return state;
  }
};

export default loginReducer;

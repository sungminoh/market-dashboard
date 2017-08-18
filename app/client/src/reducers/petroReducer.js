import { PetroActionType } from '../constants';

const petroReducer = (state = {
  isLoading: false,
  errorMsg: '',
}, action) => {
  switch (action.type) {
    case PetroActionType.POST:
      return {
        ...state,
        isLoading: true,
      };
    case PetroActionType.FAIL:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.errorMsg,
      };
    case PetroActionType.CHANGE_DATE_RANGE:
      return {
         ...state,
         startDate: action.startDate,
         endDate: action.endDate,
      }
    default:
      return state;
  }
};

export default petroReducer;

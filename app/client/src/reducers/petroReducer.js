import { PetroActionType } from '../constants';

const getKeys = (data) => {
  let keys = Object.keys(data.prices[0]);
  let dateIndex = keys.indexOf('date');
  if(dateIndex > -1)
    keys.splice(dateIndex, 1);
  let idIndex = keys.indexOf('id');
  if(dateIndex > -1)
    keys.splice(idIndex, 1);
  return keys;
}

const petroReducer = (state = {
  isLoading: false,
  errorMsg: '',
  dataType: 'daily',
  keys: [],
  selected: '',
  daily: {},
  weekly: {},
  monthly: {},
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
    case PetroActionType.SUCCESS_FETCH_CHART_DATA:
      let newState = {
         ...state,
         ...{}
      };
      const {
        dataType,
        data,
      } = action;
      if(dataType === 'daily'){
        newState[dataType] = data;
      } else {
        newState[dataType] = {...state[dataType]};
        for(let type in data){ // prices or spreads
          newState[dataType][type] = {...newState[dataType][type]} || {};
          for(let key in data[type]){
            newState[dataType][type][key] = data[type][key];
          }
        }
      }
      return newState;
    case PetroActionType.SUCCESS_FETCH_CHART_KEYS:
      return {
        ...state,
        keys: action.keys,
      }
    case PetroActionType.SET_DATA_TYPE:
      return {
        ...state,
        dataType: action.dataType,
      }
    case PetroActionType.SET_SELECTED:
      return {
        ...state,
        selected: action.selected,
      }
    default:
      return state;
  }
};

export default petroReducer;

export const AuthActionType = {
  POST_SIGNUP: '@@auth/POST_SIGNUP',
  POST_LOGIN: '@@auth/POST_LOGIN',
  POST_LOGOUT: '@@auth/POST_LOGOUT',
  POST_SESSION: '@@auth/POST_SESSION',
  SUCCESS_LOGIN: '@@auth/SUCCESS_LOGIN',
  SUCCESS_LOGOUT: '@@auth/SUCCESS_LOGOUT',
  SUCCESS_AUTH: '@@auth/SUCCESS_AUTH',
  FAIL: '@@auth/FAIL',
};

export const PetroActionType = {
  POST: '@@petro/POST',
  FAIL: '@@petro/FAIL',
  //CHANGE_DATE_RANGE: '@@petro/CHANGE_DATE_RANGE',
  SUCCESS_FETCH_CHART_DATA: '@@petro/SUCCESS_FETCH_CHART_DATA',
  SUCCESS_FETCH_CHART_KEYS: '@@petro/SUCCESS_FETCH_CHART_KEYS',
  SET_DATA_TYPE: '@@petro/SET_DATA_TYPE',
  SET_SELECTED: '@@petro/SET_SELECTED',
};

/* global $:true */
import fetch from 'isomorphic-fetch';
import { PetroActionType } from '../constants';
import { PetroText } from '../text';
import { preprocess } from './utils';


export const fail = errorMsg => ({
  type: PetroActionType.FAIL,
  errorMsg,
});

export const changeDateRange = (startDate, endDate) => ({
  type: PetroActionType.CHANGE_DATE_RANGE,
  startDate,
  endDate,
});

export const successFetchChartData = (dataType, data) => ({
  type: PetroActionType.SUCCESS_FETCH_CHART_DATA,
  dataType,
  data,
});

export const fetchChartData = ({
  params = {},
}) => {
  const FETCH_URL = `/api/petro/chart?${$.param(params)}`;
  const requestInfo = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  };
  var dataType = params.dataType;
  return (dispatch) => {
    dispatch({
      type: PetroActionType.POST,
    });
    fetch(
      FETCH_URL,
      requestInfo,
    ).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    }).then((result) => {
      if (result && result.success) {
        const data = preprocess(dataType, result.data);
        dispatch(successFetchChartData(dataType, data));
      }
    }).catch(err => dispatch(fail(`${PetroText.FETCH_ERROR} ${err.toString()}`)));
  };
};

export const successFetchChartKeys = keys => ({
  type: PetroActionType.SUCCESS_FETCH_CHART_KEYS,
  keys,
});

export const fetchChartKeys = () => {
  const FETCH_URL = '/api/petro/chart-keys';
  const requestInfo = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  };
  return (dispatch) => {
    dispatch({
      type: PetroActionType.POST,
    });
    fetch(
      FETCH_URL,
      requestInfo,
    ).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    }).then((result) => {
      if (result && result.success) {
        dispatch(successFetchChartKeys(result.data));
      }
    }).catch(err => dispatch(fail(`${PetroText.FETCH_ERROR} ${err.toString()}`)));
  };
};

export const setDataType = (dataType) => ({
  type: PetroActionType.SET_DATA_TYPE,
  dataType,
});

export const setSelected = (selected) => ({
  type: PetroActionType.SET_SELECTED,
  selected,
});

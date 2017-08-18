import fetch from 'isomorphic-fetch';
import { PetroActionType } from '../constants';
import { PetroText } from '../text';


export const fail = errorMsg => ({
  type: PetroActionType.FAIL,
  errorMsg,
});

export const changeDateRange = (startDate, endDate) => ({
  type: PetroActionType.CHANGE_DATE_RANGE,
  startDate: startDate,
  endDate: endDate,
})

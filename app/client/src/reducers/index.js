import { combineReducers } from 'redux';
import authReducer from './authReducer';
import petroReducer from './petroReducer';

export default combineReducers({
  authReducer,
  petroReducer,
});

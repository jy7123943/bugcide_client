import { combineReducers } from 'redux';
import authReducer from './authReducer';
import listReducer from './listReducer';

export default combineReducers({
  authReducer,
  listReducer
});

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import listReducer from './listReducer';
import modalReducer from './modalReducer';

export default combineReducers({
  authReducer,
  listReducer,
  modalReducer
});

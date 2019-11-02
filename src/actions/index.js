import * as types from '../constants/actionTypes';

export const loginUser = (jwtoken) => ({
  type: types.LOGIN_USER,
  jwtoken
});
export const logoutUser = () => ({
  type: types.LOGOUT_USER
});

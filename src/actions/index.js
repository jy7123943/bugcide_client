import * as types from '../constants/actionTypes';

export const loginUser = (jwtoken) => ({
  type: types.LOGIN_USER,
  jwtoken
});

export const logoutUser = () => ({
  type: types.LOGOUT_USER
});

export const getProjectListPending = () => ({
  type: types.GET_PROJECT_LIST_PENDING
});

export const getProjectListSuccess = (data) => ({
  type: types.GET_PROJECT_LIST_SUCCESS,
  ...data
});

export const getProjectListFailure = () => ({
  type: types.GET_PROJECT_LIST_FAILURE
});

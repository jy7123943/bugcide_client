import * as types from '../constants/actionTypes';

export const loginUser = (jwtoken) => ({
  type: types.LOGIN_USER,
  jwtoken
});
export const logoutUser = () => ({
  type: types.LOGOUT_USER
});

export const getProjectListSuccess = (data) => ({
  type: types.GET_PROJECT_LIST_SUCCESS,
  ...data
});
export const getProjectListFailure = () => ({
  type: types.GET_PROJECT_LIST_FAILURE
});

export const openModal = () => ({
  type: types.OPEN_MODAL
});
export const closeModal = () => ({
  type: types.CLOSE_MODAL
});

export const postNewProjectSuccess = (newProject) => ({
  type: types.POST_NEW_PROJECT_SUCCESS,
  newProject
});
export const postNewProjectFailure = (message) => ({
  type: types.POST_NEW_PROJECT_FAILURE,
  message
});

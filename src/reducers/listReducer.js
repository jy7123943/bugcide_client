import * as types from '../constants/actionTypes';

const listInitState = {
  isLoading: false,
  isError: false,
  user: {
    name: null,
    profileUrl: null
  },
  projectList: [],
  totalProjectsLength: 0
};

const listReducer = (state = listInitState, action) => {
  switch (action.type) {
    case (types.GET_PROJECT_LIST_PENDING):
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case (types.GET_PROJECT_LIST_SUCCESS):
      return {
        isLoading: false,
        isError: false,
        user: { ...action.userInfo },
        projectList: action.projectList.slice(),
        totalProjectsLength: action.totalProjectsLength
      };
    case (types.GET_PROJECT_LIST_FAILURE):
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
};

export default listReducer;

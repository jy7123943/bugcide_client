import * as types from '../constants/actionTypes';

const listInitState = {
  isLoading: true,
  isError: false,
  user: {
    name: null,
    profileUrl: null
  },
  projectList: [],
  listCreateFailMessage: null,
  totalProjectsLength: 0
};

const listReducer = (state = listInitState, action) => {
  switch (action.type) {
    case (types.GET_PROJECT_LIST_SUCCESS):
      return {
        ...state,
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
    case (types.POST_NEW_PROJECT_SUCCESS):
      const copiedProject = state.projectList.slice();
      copiedProject.unshift(action.newProject);
      const newProject = copiedProject.slice(0, 10);

      return {
        ...state,
        projectList: newProject,
        listCreateFailMessage: null
      };
    case (types.POST_NEW_PROJECT_FAILURE):
      return {
        ...state,
        listCreateFailMessage: action.message
      };
    default:
      return state;
  }
};

export default listReducer;

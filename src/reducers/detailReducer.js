import * as types from '../constants/actionTypes';

const detailInitState = {
  isLoading: false,
  isError: false,
  project: null,
  errorList: [],
  isDescSorting: false,
  currentPageNo: 0,
  totalErrorListLength: 0
};

const detailReducer = (state = detailInitState, action) => {
  switch (action.type) {
    case (types.GET_PROJECT_DETAIL_PENDING):
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case (types.GET_PROJECT_DETAIL_SUCCESS):
      return {
        isLoading: false,
        isError: false,
        project: action.targetProject,
        errorList: action.errorList || [],
        isDescSorting: action.sort === 'asc' ? false : true,
        currentPageNo: action.page,
        totalErrorListLength: action.totalErrorListLength
      };
    case (types.GET_PROJECT_DETAIL_FAILURE):
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case (types.DELETE_PROJECT_PENDING):
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};

export default detailReducer;

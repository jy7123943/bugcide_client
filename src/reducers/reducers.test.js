import authReducer from './authReducer';
import listReducer from './listReducer';
import * as actions from '../actions/index';

describe('reducer', () => {
  describe('authReducer', () => {
    let initialState;

    beforeEach(() => {
      initialState = {
        isAuthenticated: false,
        jwtoken: null
      };
    });

    it('should return the initial state', () => {
      expect(authReducer(initialState, {})).toEqual(initialState);
    });

    it('should update jwtoken state after LOGIN_USER/LOGOUT_USER', () => {
      const mockJwtoken = 'fake-jwtoken';
      const loginResult = authReducer(initialState, actions.loginUser(mockJwtoken));
      expect(loginResult.jwtoken).toEqual(mockJwtoken);

      const logoutResult = authReducer(loginResult, actions.logoutUser());
      expect(logoutResult.jwtoken).toEqual(null);
    });
  });

  describe('listReducer', () => {
    let initialState;

    beforeEach(() => {
      initialState = {
        isLoading: true,
        isError: false,
        user: {
          name: null,
          profileUrl: null
        },
        projectList: [],
        listCreateFailMessage: null,
        currentPageNo: 0,
        totalProjectsLength: 0
      };
    });

    it('should return the initial state', () => {
      expect(listReducer(initialState, {})).toEqual(initialState);
    });

    it('should update state after GET_PROJECT_LIST_SUCCESS', () => {
      const mockData = {
        projectList: ['1', '2', '3'],
        totalProjectsLength: 3
      };
      const getListResult = listReducer(initialState, actions.getProjectListSuccess(mockData, 0));

      expect(getListResult.projectList).toBeInstanceOf(Array);
      expect(getListResult.totalProjectsLength).toEqual(3);
      expect(getListResult.currentPageNo).toEqual(0);
      expect(getListResult.isLoading).toEqual(false);
    });

    it('should update state after GET_PROJECT_LIST_FAILURE', () => {
      const getListResult = listReducer(initialState, actions.getProjectListFailure());

      expect(getListResult.isLoading).toEqual(false);
      expect(getListResult.isError).toEqual(true);
      expect(getListResult.projectList).toEqual(initialState.projectList);
    });

    it('should update state after POST_NEW_PROJECT_SUCCESS', () => {


    });
  });
});

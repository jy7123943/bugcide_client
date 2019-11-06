import { connect } from 'react-redux';
import ProjectDetail from '../components/ProjectDetail';
import * as actions from '../actions/index';
import * as api from '../utils/api';

const mapStateToProps = state => {
  console.log('Detail state: ', state);
  const {
    authReducer,
    detailReducer,
    modalReducer
  } = state;

  return {
    jwtoken: authReducer.jwtoken,
    ...detailReducer,
    modalReducer
  };
};

const mapDispatchToProps = dispatch => ({
  onProjectDetailLoad: async (token, projectToken, page = 0, sort = 'asc') => {
    try {
      dispatch(actions.getProjectDetailPending());
      const response = await api.getProjectDetailApi(token, projectToken, page, sort);

      if (response.result === 'unauthorized') {
        window.localStorage.removeItem('bugcideToken');
        return dispatch(actions.logoutUser());
      }

      if (response.result === 'Project not started') {
        return dispatch(actions.getProjectDetailSuccess(response, page, sort));
      }

      if (response.result !== 'ok') {
        return dispatch(actions.getProjectDetailFailure());
      }

      dispatch(actions.getProjectDetailSuccess(response, page, sort));
    } catch (err) {
      console.log(err);
      dispatch(actions.getProjectDetailFailure());
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);

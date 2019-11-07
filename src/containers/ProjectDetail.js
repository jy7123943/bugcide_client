import { connect } from 'react-redux';
import ProjectDetail from '../components/ProjectDetail';
import * as actions from '../actions/index';
import * as api from '../utils/api';

const mapStateToProps = state => {
  console.log('Detail state: ', state);
  const {
    authReducer,
    detailReducer
  } = state;

  const { statistics } = detailReducer;

  let newErrorNameData;
  let newErrorTimeData;
  if (statistics && statistics.name) {
    newErrorNameData = Object.keys(statistics.name).map(errorName => ({
      title: errorName,
      count: statistics.name[errorName]
    }));
    // const addZero = (num) => num > 9 ? num : '0' + num;
    // `${addZero(index)}:00~${addZero(index + 1)}:00`
    newErrorTimeData = statistics.time.map((errorCount, index) => ({
      time: index,
      count: errorCount
    }));
    console.log(newErrorTimeData);
  }

  return {
    jwtoken: authReducer.jwtoken,
    ...detailReducer,
    statistics: {
      name: newErrorNameData,
      time: newErrorTimeData
    }
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
  },
  onProjectDelete: async (token, projectToken) => {
    try {
      dispatch(actions.deleteProjectPending());

      const response = await api.deleteProjectApi(token, projectToken);
      if (response.result === 'unauthorized') {
        window.localStorage.removeItem('bugcideToken');
        return dispatch(actions.logoutUser());
      }

      if (response.result !== 'ok') {
        alert('Failed to delete Project. Please try again later');
      }
      window.location.replace('/');
    } catch (err) {
      console.log(err);
      alert('Failed to delete Project. Please try again later');
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);

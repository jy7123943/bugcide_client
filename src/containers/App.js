import { connect } from 'react-redux';
import App from '../components/App';
import * as actions from '../actions/index';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

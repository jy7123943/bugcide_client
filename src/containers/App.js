import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import App from '../components/App';
import * as actions from '../actions/index';
import * as api from '../utils/api';

const mapStateToProps = state => {
  const { authReducer } = state;

  return {
    ...authReducer
  };
};

const mapDispatchToProps = dispatch => {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };
  firebase.initializeApp(firebaseConfig);

  return {
    onMainLoad: () => {
      const jwtoken = window.localStorage.getItem('bugcideToken');

      jwtoken ? dispatch(actions.loginUser(jwtoken)) : dispatch(actions.logoutUser())
    },
    handleLogin: async () => {
      try {
        const provider = new firebase.auth.GithubAuthProvider();

        const {
          additionalUserInfo: { username, profile }
        } = await firebase.auth().signInWithPopup(provider);

        const userInfo = {
          socialId: username,
          name: profile.name,
          profileUrl: profile.avatar_url
        };

        const { result, jwtoken } = await api.userLoginApi(userInfo);

        if (result !== 'ok') {
          throw new Error('login failed');
        }

        window.localStorage.setItem('bugcideToken', jwtoken);
        dispatch(actions.loginUser(jwtoken));
      } catch (err) {
        console.log(err);
        alert('Login failed. Please try again!');
      }
    },
    handleLogout: async () => {
      try {
        await firebase.auth().signOut();
        window.localStorage.removeItem('bugcideToken');
        dispatch(actions.logoutUser());
      } catch (err) {
        console.log(err);
        alert('Logout failed. Please try again!');
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

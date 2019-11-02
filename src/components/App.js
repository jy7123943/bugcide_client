import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import withAuth from './helpers/withAuth';
import Header from './Header';
import ProjectList from './ProjectList';
import ProjectDetail from './ProjectDetail';
import './css/style.scss';

const App = (props) => {
  console.log('Home page props: ', props);
  return (
    <div className="app-container">
      <Header {...props} />
      <div className="app-profile">
        <div className="img-box">
          UserImage
        </div>
        <div className="user-name">
          jy7123943
        </div>
      </div>
      <Switch>
        <Route
          exact path="/"
          render={routerProps => (
            <ProjectList {...routerProps} />
          )}
        />
        <Route
          exact path="/project/:token"
          render={routerProps => (
            <ProjectDetail {...routerProps} />
          )}
        />
      </Switch>
    </div>
  );
};

export default withAuth(App);

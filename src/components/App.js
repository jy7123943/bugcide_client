import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import withAuth from './helpers/withAuth';
import Header from './Header';
import ProjectList from './ProjectList';
import ProjectDetail from './ProjectDetail';
import './css/style.scss';

const App = (props) => {
  console.log('App page props: ', props);
  const {
    jwtoken,
    onProjectListLoad,
    projectList
  } = props;

  const { user } = projectList;

  useEffect(() => {
    if (jwtoken) {
      onProjectListLoad(jwtoken);
    }
  }, [ onProjectListLoad, jwtoken ]);

  return (
    <div className="app-container">
      <Header {...props} />
      <div className="app-profile">
        <div
          className="img-box"
          style={{ background: `url(${user.profileUrl}) no-repeat center / cover` }}
        >
        </div>
        <div className="user-name">
          {user.name}
        </div>
      </div>
      <Switch>
        <Route
          exact path="/"
          render={routerProps => (
            <ProjectList
              {...routerProps}
              {...projectList}
            />
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

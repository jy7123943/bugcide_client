import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import withAuth from './helpers/withAuth';
import Header from './Header';
// import ProjectList from './ProjectList';
import Container from '../containers/Container';
import ProjectDetail from './ProjectDetail';
import './css/style.scss';
import loadingImg from './img/loading.gif';

const App = (props) => {
  console.log('App page props: ', props);
  const {
    jwtoken,
    onProjectListLoad,
    projectList,
    totalProjectsLength,
    isLoading,
    isError,
    user,
    isModalOpened,
    handleModalOpen,
    handleModalClose,
    onProjectCreate
  } = props;

  useEffect(() => {
    if (jwtoken) {
      onProjectListLoad(jwtoken);
    }
  }, [ onProjectListLoad, jwtoken ]);

  if (isLoading) {
    return (
      <div className="loading-box">
        <img src={loadingImg} alt="user profile"></img>
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

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
            <Container.ProjectList
              {...routerProps}
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

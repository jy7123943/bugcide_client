import React, { useEffect } from 'react';
import Login from '../Login';
import { Route, Switch, Redirect } from 'react-router-dom';

const withAuth = WrappedComponent => props => {
  const {
    isAuthenticated,
    handleLogin,
    handleAutoLogin
  } = props;

  useEffect(() => {
    handleAutoLogin();
  }, [ handleAutoLogin ]);

  return (
    <>
      {isAuthenticated ? <Redirect to="/" /> : <Redirect to="/login" />}
      <Switch>
        <Route
          exact path="/login"
          render={routerProps => (
            <Login
              {...routerProps}
              handleLogin={handleLogin}
            />
          )}
        />
        <Route
          path="/"
          render={routerProps => (
            <WrappedComponent
              {...routerProps}
              {...props}
            />
          )}
        />
      </Switch>
    </>
  );
};

export default withAuth;

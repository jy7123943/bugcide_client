import React, { useEffect } from 'react';
import Login from '../Login';
import { Route, Switch, Redirect } from 'react-router-dom';

const withAuth = WrappedComponent => props => {
  console.log('withAuth props: ', props);
  const {
    isAuthenticated,
    handleLogin,
    onMainLoad
  } = props;

  useEffect(() => {
    onMainLoad();
  }, [ onMainLoad ]);

  return (
    <>
      {isAuthenticated ? <Redirect to="/" /> : <Redirect to="/login" />}
      <Switch>
        <Route
          path="/"
          render={routerProps => (
            <WrappedComponent
              {...routerProps}
              {...props}
            />
          )}
        />
        <Route
          exact path="/login"
          render={routerProps => (
            <Login
              {...routerProps}
              handleLogin={handleLogin}
            />
          )}
        />
      </Switch>
    </>
  );
};

export default withAuth;
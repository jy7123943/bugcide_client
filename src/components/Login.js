import React from 'react';
import './css/style.scss';
import './css/login.scss';

const Login = (props) => {
  console.log('login page props: ', props);
  return (
    <div className="login-container">
      <h1 className="logo">BUGCIDE.</h1>
      <div className="main-banner"></div>
      <div className="login-box">
        <h2 className="title">
          Catch and Kill Hidden Errors in Your Code.
        </h2>
        <p className="desc">
          Bugcide is a javascript error tracking solutions. It captures any uncaught errors, report errors, and log messages.
        </p>
        <button
          type="button"
          className="btn-basic"
          onClick={props.handleLogin}
        >
          Login with Github
        </button>
      </div>
    </div>
  );
};

export default Login;

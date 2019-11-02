
import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className="gnb">
      <div className="gnb-wrap">
        <h1 className="logo">
          <Link to="/">
            Bugcide.
          </Link>
        </h1>
        <button
          type="button"
          className="btn-gnb"
          onClick={props.handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;

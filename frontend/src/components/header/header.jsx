import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import { CircularProgress } from '@material-ui/core';

const Header = ({ user }) => {
  const { pathname } = useLocation();
  const history = useHistory();

  const handleLogout = () => {
    Cookies.remove('access_token');
    history.push('/login');
  };

  if (pathname === '/login') return null;

  let role;

  if (user?.role === 1) {
    role = 'Super Administrator';
  } else if (user?.role === 2) {
    role = 'Administrator';
  }

  return (
    <nav className="header">
      <div className="header__logo">
        <Logo /> <span>Vokasi Connect</span>
      </div>
      <div className="header__user">
        {!user ? (
          <CircularProgress size="3rem" color="inherit" />
        ) : (
          <>
            <span>{user?.username}</span>
            <span>{role}</span>
          </>
        )}
      </div>
      <div onClick={handleLogout} className="header__logout">
        Logout
      </div>
    </nav>
  );
};

export default Header;

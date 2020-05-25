import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import { ReactComponent as Logo } from '../../assets/logo.svg';

const Header = () => {
  const { pathname } = useLocation();
  const history = useHistory();

  const handleLogout = () => {
    Cookies.remove('access_token');
    history.push('/login');
  };

  if (pathname === '/login') return null;

  return (
    <nav className="header">
      <div className="header__logo">
        <Logo /> <span>Vokasi Connect</span>
      </div>
      <div onClick={handleLogout} className="header__logout">
        Logout
      </div>
    </nav>
  );
};

export default Header;

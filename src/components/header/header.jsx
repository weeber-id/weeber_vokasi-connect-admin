import React from 'react';
import { useLocation } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/logo.svg';

const Header = () => {
  const { pathname } = useLocation();

  if (pathname === '/login') return null;

  return (
    <nav className="header">
      <div className="header__logo">
        <Logo /> <span>Vokasi Connect</span>
      </div>
      <div className="header__logout">Logout</div>
    </nav>
  );
};

export default Header;

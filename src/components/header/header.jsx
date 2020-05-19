import React from 'react';

import { ReactComponent as Logo } from '../../assets/logo.svg';

const Header = () => {
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

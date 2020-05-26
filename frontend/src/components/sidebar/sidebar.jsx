import React from 'react';
import { useLocation } from 'react-router-dom';

import { NavLink } from 'react-router-dom';

const SideBar = () => {
  const { pathname } = useLocation();
  if (pathname === '/login') return null;
  return (
    <div className="sidebar">
      <span className="sidebar__item">
        <NavLink
          to="/aspiration-center"
          className="sidebar__link"
          activeClassName="active"
        >
          Aspiration Center
        </NavLink>
      </span>
      <span className="sidebar__item">
        <NavLink to="/event" className="sidebar__link" activeClassName="active">
          Event
        </NavLink>
      </span>
      <span className="sidebar__item">
        <NavLink
          to="/artikel"
          className="sidebar__link"
          activeClassName="active"
        >
          Artikel
        </NavLink>
      </span>
      <span className="sidebar__item">
        <NavLink
          to="/ruang-prestasi"
          className="sidebar__link"
          activeClassName="active"
        >
          Ruang Prestasi
        </NavLink>
      </span>
      <span className="sidebar__item">
        <NavLink
          to="/data-publik"
          className="sidebar__link"
          activeClassName="active"
        >
          Data Publik
        </NavLink>
      </span>
      <span className="sidebar__item">
        <NavLink
          to="/account"
          className="sidebar__link"
          activeClassName="active"
        >
          Account Settings
        </NavLink>
      </span>
    </div>
  );
};

export default SideBar;

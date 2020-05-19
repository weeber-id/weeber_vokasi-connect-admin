import React from 'react';

import { NavLink } from 'react-router-dom';

const SideBar = () => {
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
    </div>
  );
};

export default SideBar;

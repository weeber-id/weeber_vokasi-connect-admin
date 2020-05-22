import React from 'react';
import './App.scss';

import { Route, useLocation } from 'react-router-dom';

import Header from './components/header/header';
import SideBar from './components/sidebar/sidebar';
import AspirationCenter from './components/aspiration-center/aspiration-center';
import EventPage from './components/event/event';
import Artikel from './components/artikel/artikel';

function App() {
  const { pathname } = useLocation();
  return (
    <div className="App">
      <Header />
      {pathname === '/login' ? null : (
        <div className="wrapper">
          <Route path="/aspiration-center" component={AspirationCenter} />
          <Route path="/event" component={EventPage} />
          <Route path="/artikel" component={Artikel} />
        </div>
      )}
      <SideBar />
    </div>
  );
}

export default App;

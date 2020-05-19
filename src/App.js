import React from 'react';
import './App.scss';

import { Route, BrowserRouter as Router } from 'react-router-dom';

import Header from './components/header/header';
import SideBar from './components/sidebar/sidebar';
import AspirationCenter from './components/aspiration-center/aspiration-center';
import EventPage from './components/event/event';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="wrapper">
          <Route path="/aspiration-center" component={AspirationCenter} />
          <Route path="/event" component={EventPage} />
        </div>
        <SideBar />
      </div>
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import './App.scss';

import { Route, useLocation, Redirect, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import Header from './components/header/header';
import SideBar from './components/sidebar/sidebar';
import AspirationCenter from './components/aspiration-center/aspiration-center';
import EventPage from './components/event/event';
import Artikel from './components/artikel/artikel';
import RuangPrestasi from './components/ruang-prestasi/ruang-prestasi';
import DataPublik from './components/data-publik/data-publik';
import Account from './components/account/account';

function App() {
  const { pathname } = useLocation();
  const history = useHistory();
  const urlServer = 'https://api.vokasiconnect.id';
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!Cookies.get('access_token')) {
      history.push('/login');
    }

    const header = new Headers();
    header.append('Authorization', `Bearer ${Cookies.get('access_token')}`);

    fetch(`${urlServer}/admin?mode=self`, {
      headers: header
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <Route
        path="/"
        exact
        render={({ location }) =>
          !Cookies.get('access_token') ? (
            <Redirect to={{ pathname: '/login', state: { from: location } }} />
          ) : (
            <Redirect
              to={{ pathname: '/aspiration-center', state: { from: location } }}
            />
          )
        }
      />
      <Header user={user} setUser={setUser} />
      {pathname === '/login' ? null : (
        <div className="wrapper">
          <Route path="/aspiration-center" component={AspirationCenter} />
          <Route path="/event" component={EventPage} />
          <Route path="/artikel" component={Artikel} />
          <Route path="/ruang-prestasi" component={RuangPrestasi} />
          <Route path="/data-publik" component={DataPublik} />
          <Route path="/account" render={() => <Account user={user} />} />
        </div>
      )}
      <SideBar />
    </div>
  );
}

export default App;

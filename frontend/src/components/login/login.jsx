import React, { useState, useEffect } from 'react';

import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ReactComponent as Logo } from '../../assets/logo.svg';

import './login.scss';
import Loading from '../loading';

const Login = () => {
  const urlServer = 'https://api.vokasiconnect.id/';

  useEffect(() => {
    const cookie = Cookies.get('access_token');

    if (cookie) {
      history.push('/aspiration-center');
    }
  }, []);

  const history = useHistory();

  const [state, setState] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setLoading] = useState(false);

  const { username, password } = state;

  const useStyle = makeStyles({
    textfield: {
      marginBottom: '4rem',
      width: '26rem',
      '& input, & label': {
        fontSize: '1.6rem'
      }
    },
    button: {
      backgroundColor: '#009975',
      color: 'white',
      fontSize: '1.6rem',
      minWidth: '18rem',
      marginTop: '2rem',
      '&:hover': {
        backgroundColor: '#048869'
      }
    }
  });

  const classes = useStyle();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('username', username);
    formdata.append('password', password);

    setLoading(true);

    fetch(`${urlServer}admin/login`, {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Login success') {
          alert(data.message);
          setLoading(false);
          Cookies.set('access_token', data.access_token);
          history.push('/aspiration-center');
        } else {
          alert(data.message);
        }

        setLoading(false);
        window.location.reload();

        // Cookies.set('foo', 'bar');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {isLoading ? <Loading message="Logging in, Please wait..." /> : null}
      <div className="login">
        <form onSubmit={handleLogin} className="login__container">
          <div className="header__logo">
            <Logo className="login__svg" fill="#009975" />{' '}
            <span style={{ color: '#009975' }}>Vokasi Connect</span>
          </div>
          <TextField
            variant="filled"
            className={classes.textfield}
            placeholder="username"
            label="username"
            name="username"
            value={username}
            onChange={handleChange}
          />
          <TextField
            variant="filled"
            label="password"
            className={classes.textfield}
            placeholder="password"
            name="password"
            value={password}
            onChange={handleChange}
            type="password"
          />
          <Button type="submit" className={classes.button}>
            Login
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;

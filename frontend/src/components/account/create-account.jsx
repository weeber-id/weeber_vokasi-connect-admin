import React, { useState } from 'react';

import Cookies from 'js-cookie';
import { TextField, Button, makeStyles } from '@material-ui/core';
import Loading from '../loading';

const CreateAccount = ({ toggleClose }) => {
  const [state, setState] = useState('');
  const [isLoading, setLoading] = useState(false);
  const useStyle = makeStyles({
    input: {
      width: '100%',
      marginBottom: '2rem',
      '& > *': {
        fontSize: '1.6rem'
      }
    },
    button: {
      fontSize: '1.6rem',
      backgroundColor: '#009975',
      width: '22rem',
      color: 'white',
      fontWeight: 700,
      textTransform: 'capitalize',
      '&:hover': {
        backgroundColor: '#048869'
      }
    }
  });

  const classes = useStyle();

  const handleChange = (e) => {
    const { value } = e.target;
    setState(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${Cookies.get('access_token')}`);

    const body = new FormData();
    body.append('username', state);

    setLoading(true);
    fetch('https://api.vokasiconnect.id/admin', {
      method: 'POST',
      headers,
      body
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        toggleClose(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    setState('');
  };

  const [reverse, setReverse] = useState(false);

  const closeAnimation = () => {
    setReverse(true);
    setTimeout(() => {
      toggleClose(false);
    }, 700);
  };

  return (
    <>
      {isLoading ? (
        <Loading message="Creating an account, Please wait..." />
      ) : null}
      <div
        onClick={closeAnimation}
        className={`overlay ${reverse ? 'reverse' : ''}`}
      />
      <form
        onSubmit={handleSubmit}
        className={`account__create ${reverse ? 'reverse' : ''}`}
      >
        <span className="account__form-label">Create Account</span>
        <TextField
          label="Username"
          placeholder="awesome_admin"
          className={classes.input}
          variant="filled"
          onChange={handleChange}
        />
        <Button type="submit" className={classes.button}>
          Create Account
        </Button>
      </form>
    </>
  );
};

export default CreateAccount;

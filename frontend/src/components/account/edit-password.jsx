import React, { useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';
import Cookies from 'js-cookie';
import Loading from '../loading';

const EditPassword = ({ toggleClose }) => {
  const [state, setState] = useState({
    oldPassword: '',
    newPassword: ''
  });
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;

    setState({
      ...state,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = new FormData();

    body.append('old_password', state.oldPassword);
    body.append('new_password', state.newPassword);
    setLoading(true);
    fetch('https://api.vokasiconnect.id/admin', {
      method: 'PUT',
      body,
      headers: {
        Authorization: `Bearer ${Cookies.get('access_token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setState({
          oldPassword: '',
          newPassword: ''
        });
        setLoading(false);
        toggleClose(false);
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });
  };

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

  return (
    <>
      {isLoading ? (
        <Loading message="Processing your request, Please wait..." />
      ) : null}
      <div onClick={() => toggleClose(false)} className="overlay" />
      <form onSubmit={handleSubmit} className="account__edit-password">
        <span className="account__form-label">Edit Password</span>
        <TextField
          variant="filled"
          label="Old Password"
          className={classes.input}
          type="password"
          name="oldPassword"
          onChange={handleChange}
        />
        <TextField
          variant="filled"
          label="New Password"
          className={classes.input}
          type="password"
          name="newPassword"
          onChange={handleChange}
        />
        <Button type="submit" className={classes.button}>
          Edit Password
        </Button>
      </form>
    </>
  );
};

export default EditPassword;

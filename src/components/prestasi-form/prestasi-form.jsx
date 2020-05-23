import React from 'react';

import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import './prestasi-form.scss';

const useStyle = makeStyles({
  textField: {
    '&  *': {
      fontSize: '1.6rem'
    }
  },
  button: {
    fontSize: '1.6rem',
    backgroundColor: '#009975',
    color: 'white',
    width: '15rem',
    marginLeft: 'auto',
    display: 'block',
    '&:hover': {
      background: '#048869'
    }
  }
});

const PrestasiForm = () => {
  const classes = useStyle();

  return (
    <form className="prestasi-form__container">
      <h2 className="heading-secondary">Tambah Prestasi</h2>
      <div className={`prestasi-form ${classes.textField}`}>
        <TextField variant="filled" label="Nama" placeholder="Nama" />
        <TextField variant="filled" label="Angkatan" placeholder="Angkatan" />
        <TextField variant="filled" label="Prodi" placeholder="Prodi" />
        <TextField variant="filled" label="Prestasi" placeholder="Prestasi" />
      </div>
      <Button className={classes.button}>Upload</Button>
    </form>
  );
};

export default PrestasiForm;

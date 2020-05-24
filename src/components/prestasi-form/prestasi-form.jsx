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

const PrestasiForm = ({ onChange, value, onSubmit }) => {
  const classes = useStyle();

  return (
    <form onSubmit={onSubmit} className="prestasi-form__container">
      <h2 className="heading-secondary">Tambah Prestasi</h2>
      <div className={`prestasi-form ${classes.textField}`}>
        <TextField
          name="nama"
          variant="filled"
          label="Nama"
          placeholder="Sergio Marquina"
          onChange={onChange}
          value={value.nama}
        />
        <TextField
          name="angkatan"
          variant="filled"
          label="Angkatan"
          placeholder="2019"
          onChange={onChange}
          value={value.angkatan}
        />
        <TextField
          name="prodi"
          variant="filled"
          label="Prodi"
          placeholder="Heist Engineering"
          onChange={onChange}
          value={value.prodi}
        />
        <TextField
          name="prestasi"
          variant="filled"
          label="Prestasi"
          placeholder="Merampok Royal Mint of Spain"
          onChange={onChange}
          value={value.prestasi}
        />
      </div>
      <Button type="submit" className={classes.button}>
        Upload
      </Button>
    </form>
  );
};

export default PrestasiForm;

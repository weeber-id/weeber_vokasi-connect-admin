import React from 'react';

import './data-publik-form.scss';

import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
  },
  select: {
    '& *, & li': {
      fontSize: '1.6rem'
    }
  },
  inputLabel: {
    transform: 'translate(1.5rem, 2rem) scale(1)'
  }
});

const DataPublikForm = ({
  kategori,
  setKategori,
  onSubmit,
  onChange,
  value
}) => {
  const classes = useStyle();
  return (
    <div className="data-publik-form">
      <h2 className="heading-secondary">Tambah Data Publik</h2>
      <form onSubmit={onSubmit} className="data-publik-form__form">
        <FormControl className={classes.select}>
          <InputLabel className="label-cuk" id="data-publik-form-label">
            Pilih Kategori
          </InputLabel>
          <Select
            placeholder="Buletin"
            variant="filled"
            id="data-publik-form"
            labelId="data-publik-form-label"
            value={kategori}
            onChange={(e) => {
              setKategori(e.target.value);
            }}
          >
            <MenuItem value="1">Data Riset</MenuItem>
            <MenuItem value="2">Buletin</MenuItem>
            <MenuItem value="3">Kajian Strategis</MenuItem>
            <MenuItem value="4">UU IKM Vokasi UI</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Judul"
          placeholder="Kajian Maritim Indonesia Emas 2045"
          className={classes.textField}
          variant="filled"
          name="judul"
          value={value.judul}
          onChange={onChange}
        />

        <TextField
          label="Link"
          placeholder="https://drive.google.com/al97dkjaXmkJiPPkl"
          className={classes.textField}
          variant="filled"
          name="link"
          value={value.link}
          onChange={onChange}
        />
        <Button type="submit" className={classes.button}>
          Upload
        </Button>
      </form>
    </div>
  );
};

export default DataPublikForm;

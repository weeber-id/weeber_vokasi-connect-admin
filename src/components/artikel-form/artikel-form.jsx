import React, { useState } from 'react';

import './artikel-form.scss';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { InputFile } from '../input';

const ArtikelForm = ({ toggleClose }) => {
  const [value, setValue] = useState('');

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      ['link', 'image'],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image'
  ];

  return (
    <>
      <div onClick={() => toggleClose(false)} className="overlay" />
      <div className="artikel-form">
        <h2 className="artikel-form__description">Buat Artikel</h2>
        <TextField
          variant="filled"
          className="artikel-form__title"
          label="Title"
          placeholder="Masukkan Judul"
        />
        <InputFile style={{ width: '80%', marginBottom: '2rem' }} />
        <ReactQuill
          className="artikel-form__textarea"
          modules={modules}
          formats={formats}
          theme="snow"
          value={value}
          onChange={setValue}
        />
        <Button className="artikel-form__btn">Buat Artikel</Button>
      </div>
    </>
  );
};

export default ArtikelForm;

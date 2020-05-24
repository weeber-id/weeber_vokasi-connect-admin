import React, { useState } from 'react';

import './artikel-form.scss';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { InputFile } from '../input';

const ArtikelForm = ({
  toggleClose,
  onSubmit,
  onChange,
  titleName,
  titleValue,
  onFileChange,
  onArtikelChange,
  artikelValue,
  fileId,
  fileName,
  authorName,
  authorValue
}) => {
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
      <form onSubmit={(onSubmit, onChange)} className="artikel-form">
        <h2 className="artikel-form__description">Buat Artikel</h2>
        <TextField
          onChange={onChange}
          variant="filled"
          className="artikel-form__title"
          label="Title"
          placeholder="Masukkan Judul"
          name={titleName}
          value={titleValue}
        />
        <TextField
          onChange={onChange}
          variant="filled"
          className="artikel-form__title"
          label="Author"
          placeholder="John Doe"
          name={authorName}
          value={authorValue}
        />
        <InputFile
          onChange={onFileChange}
          id={fileId}
          link={fileName}
          style={{ width: '80%', marginBottom: '2rem' }}
        />
        <ReactQuill
          className="artikel-form__textarea"
          modules={modules}
          formats={formats}
          theme="snow"
          value={artikelValue}
          onChange={onArtikelChange}
        />
        <Button onClick={onSubmit} className="artikel-form__btn">
          Buat Artikel
        </Button>
      </form>
    </>
  );
};

export default ArtikelForm;

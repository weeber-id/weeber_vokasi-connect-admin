import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';

import './artikel-card.scss';
import DeleteMessage from '../delete-message/delete-message';
import ArtikelForm from '../artikel-form/artikel-form';

const ArtikelCard = ({
  title,
  id,
  thumbnail,
  setLoading,
  setRerender,
  reRender,
  content,
  author
}) => {
  const urlServer = 'https://api.vokasiconnect.id';

  const [open, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [state, setState] = useState({
    title: '',
    author: ''
  });
  const [fileName, setFileName] = useState('');
  const [artikelText, setArtikelText] = useState('');

  useEffect(() => {
    setState({
      title,
      author
    });
    setFileName(thumbnail);
    setArtikelText(content);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;

    const formdata = new FormData();
    formdata.append('image', files[0], files[0].name);
    formdata.append('folder_name', 'event/image');
    setLoading(true);
    fetch(`${urlServer}/image`, {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    })
      .then((res) => res.json())
      .then((data) => {
        setFileName(data.url);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = JSON.stringify({
      author: state.author,
      title: state.title,
      content: artikelText,
      thumbnail: fileName
    });

    setLoading(true);
    fetch(`${urlServer}/article?=${id}`, {
      method: 'PUT',
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setEdit(false);
        setRerender(!reRender);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setEdit(false);
        setRerender(!reRender);
      });
  };

  const handleDelete = (id) => {
    setLoading(true);
    fetch(`${urlServer}/article?id=${id}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setRerender(!reRender);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setRerender(!reRender);
      });
  };

  return (
    <>
      <DeleteMessage
        message="Apakah kamu yakin ingin menghapus artikel ini?"
        open={open}
        onClose={setOpen}
        onCancel={() => setOpen(false)}
        onDelete={() => {
          handleDelete(id);
        }}
      />
      {isEdit ? (
        <ArtikelForm
          fileId={`edit-artikel-thumbnail-${id}`}
          titleValue={state.title}
          titleName="title"
          authorName="author"
          authorValue={state.author}
          toggleClose={setEdit}
          artikelValue={artikelText}
          fileName={fileName}
          onChange={handleChange}
          onArtikelChange={setArtikelText}
          onFileChange={handleFileChange}
          onSubmit={handleSubmit}
          buttonText="Edit Artikel"
        />
      ) : null}
      <div className="artikel-card">
        <div className="artikel-card__thumbnail">
          <img
            src={thumbnail}
            alt={`${title}-image`}
            className="artikel-card__img"
          />
        </div>
        <div className="artikel-card__description">
          <h3 className="artikel-card__title">{title}</h3>
        </div>
        <div className="artikel-card__cta">
          <Button onClick={() => setEdit(true)}>Edit</Button>
          <Button onClick={() => setOpen(true)}>Delete</Button>
        </div>
      </div>
    </>
  );
};

export default ArtikelCard;

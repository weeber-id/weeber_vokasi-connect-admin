import React, { useEffect, useState } from 'react';

import './artikel.scss';
import ArtikelForm from '../artikel-form/artikel-form';
import ArtikelCard from '../artikel-card/artikel-card';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';

const Artikel = () => {
  const urlServer = 'https://api.vokasiconnect.id';
  const [artikels, setArtikels] = useState([]);
  const [state, setState] = useState({
    title: '',
    author: ''
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [thumbnaiName, setThumbnailName] = useState('');
  const [artikelText, setArtikelText] = useState('');
  const [create, setCreate] = useState(false);
  const [reRender, setRerender] = useState(false);

  useEffect(() => {
    fetch(`${urlServer}/articles`)
      .then((res) => res.json())
      .then((data) => {
        setArtikels(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reRender]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setThumbnail(files[0]);
    setThumbnailName(files[0].name);

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
        setThumbnailName(data.url);
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
      thumbnail: thumbnaiName
    });

    setLoading(true);
    fetch(`${urlServer}/article`, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setCreate(false);
        setRerender(!reRender);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setCreate(false);
        setRerender(!reRender);
      });
  };

  return (
    <div className="artikel">
      {isLoading ? (
        <div className="loading">
          <div className="loop">
            <CircularProgress color="inherit" />
            <span>Please Wait, Uploading File....</span>
          </div>
        </div>
      ) : null}
      {create ? (
        <ArtikelForm
          onChange={handleChange}
          toggleClose={setCreate}
          onFileChange={handleFileChange}
          artikelValue={artikelText}
          onArtikelChange={setArtikelText}
          fileName={thumbnaiName}
          onSubmit={handleSubmit}
          fileId="create-artikel-thumbnail"
          titleValue={state.title}
          titleName="title"
          authorName="author"
          authorValue={state.author}
        />
      ) : null}
      <div className="artikel__new">
        <span>Buat Artikel Baru!</span>
        <Button onClick={() => setCreate(true)}>Mulai</Button>
      </div>
      <div className="artikel__cards">
        {artikels?.map((artikel) => (
          <ArtikelCard
            key={`artikel-${artikel.id}`}
            setLoading={setLoading}
            setRerender={setRerender}
            reRender={reRender}
            {...artikel}
          />
        ))}
      </div>
    </div>
  );
};

export default Artikel;

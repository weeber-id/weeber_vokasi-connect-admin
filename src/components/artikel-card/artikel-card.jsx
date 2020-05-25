import React, { useState } from 'react';

import Button from '@material-ui/core/Button';

import './artikel-card.scss';
import DeleteMessage from '../delete-message/delete-message';

const ArtikelCard = ({
  title,
  id,
  thumbnail,
  setLoading,
  setRerender,
  reRender
}) => {
  const urlServer = 'https://api.vokasiconnect.id';

  const [open, setOpen] = useState(false);

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
          <Button>Edit</Button>
          <Button onClick={() => setOpen(true)}>Delete</Button>
        </div>
      </div>
    </>
  );
};

export default ArtikelCard;

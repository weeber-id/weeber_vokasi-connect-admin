import React, { useState } from 'react';

import Button from '@material-ui/core/Button';

import './artikel-card.scss';
import DeleteMessage from '../delete-message/delete-message';

const ArtikelCard = ({ title, id, thumbnail }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DeleteMessage
        message="Apakah kamu yakin ingin menghapus artikel ini?"
        open={open}
        onClose={setOpen}
        onCancel={() => setOpen(false)}
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

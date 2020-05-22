import React from 'react';

import Button from '@material-ui/core/Button';

import './artikel-card.scss';

const ArtikelCard = ({ title, id, thumbnail }) => {
  return (
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
        <Button>Delete</Button>
      </div>
    </div>
  );
};

export default ArtikelCard;

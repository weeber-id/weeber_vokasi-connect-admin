import React, { useEffect, useState } from 'react';

import './artikel.scss';
import ArtikelForm from '../artikel-form/artikel-form';
import ArtikelCard from '../artikel-card/artikel-card';
import Button from '@material-ui/core/Button';

const Artikel = () => {
  const urlServer = 'http://35.240.223.151:8003';
  const [artikels, setArtikels] = useState([]);
  const [create, setCreate] = useState(false);

  useEffect(() => {
    fetch(`${urlServer}/articles`)
      .then((res) => res.json())
      .then((data) => {
        setArtikels(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="artikel">
      {create ? <ArtikelForm toggleClose={setCreate} /> : null}
      <div className="artikel__new">
        <span>Buat Artikel Baru!</span>
        <Button onClick={() => setCreate(true)}>Mulai</Button>
      </div>
      <div className="artikel__cards">
        {artikels?.map((artikel) => (
          <ArtikelCard key={`artikel-${artikel.id}`} {...artikel} />
        ))}
      </div>
    </div>
  );
};

export default Artikel;

import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { InputFile } from '../input';
import EventCard from '../event-card/event-card';

import './event.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'white',
    padding: '3rem 5rem',
    borderRadius: '1rem',
    minWidth: '90rem',
    '& > *': {
      width: '100%',
      marginBottom: '2rem',
      '& > *': {
        fontSize: '1.6rem'
      }
    }
  },
  button: {
    background: '#009975',
    color: 'white',
    width: '24rem',
    '&:hover': {
      background: '#048869'
    }
  }
}));

const EventPage = () => {
  const [state, setState] = useState({
    title: '',
    url: ''
  });
  const [fileName, setFileName] = useState('Upload Gambar');
  const [link, setLink] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [reRender, setRender] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);

  const urlServer = 'http://35.240.223.151:8003';

  useEffect(() => {
    setContentLoading(true);
    fetch(`${urlServer}/events`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.data);
        setContentLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setRender(!reRender);
      });
  }, [reRender]);

  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const { title, url } = state;

    const body = {
      title,
      url,
      image: link
    };

    fetch(`${urlServer}/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setRender(!reRender);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    setState({
      title: '',
      url: ''
    });
    setLink('');
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const handleFile = (event) => {
    event.preventDefault();
    setLoading(true);
    const { files } = event.target;
    setFileName(files[0].name);

    const body = new FormData();
    body.append('image', files[0], files[0].name);
    body.append('folder_name', 'event/image');

    fetch(`${urlServer}/image`, { method: 'POST', body })
      .then((res) => res.json())
      .then((data) => {
        setLink(data.url);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    // setFile(files[0]);
  };

  return (
    <div className="event">
      {isLoading ? (
        <div className="loading">
          <div className="loop">
            <CircularProgress color="inherit" />
            <span>Please Wait, Uploading File....</span>
          </div>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className={classes.root}>
        <h3>Add Event</h3>
        <TextField
          required
          name="title"
          id="judul-event"
          label="Judul Event"
          variant="filled"
          onChange={handleChange}
          value={state.title}
        />
        <InputFile
          required={link.length > 0 ? false : true}
          placeholder={fileName}
          onChange={handleFile}
          id="upload-event"
          link={link}
        />
        <TextField
          required
          name="url"
          id="Link Url"
          label="Link Url"
          variant="filled"
          onChange={handleChange}
          value={state.url}
        />
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <span>&nbsp;</span>
          <Button type="submit" className={classes.button} variant="contained">
            Create Event
          </Button>
        </div>
      </form>
      {contentLoading ? (
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <div className="event__cards">
          {events?.map((event) => (
            <EventCard
              reRender={reRender}
              setRender={setRender}
              key={event.id}
              classed={classes}
              setLoading={setLoading}
              {...event}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventPage;

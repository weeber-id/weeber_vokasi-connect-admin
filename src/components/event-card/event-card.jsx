import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import { InputFile } from '../input';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DeleteMessage from '../delete-message/delete-message';

import './event-card.scss';

const useStyle = makeStyles((theme) => ({
  delete: {
    color: '#E01243',
    fontSize: '1.6rem',
    flex: 1,
    height: '5rem',
    fontWeight: 700
  },
  edit: {
    fontSize: '1.6rem',
    flex: 1,
    borderRadius: 0,
    fontWeight: 700
  }
}));

const EventCard = ({
  image,
  url,
  id,
  title,
  setRender,
  reRender,
  classed,
  setLoading
}) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [state, setState] = useState({
    url: '',
    title: ''
  });
  const [link, setLink] = useState('');
  const [fileName, setFileName] = useState('');

  const urlServer = 'http://35.240.223.151:8003/';

  useEffect(() => {
    setState({
      url: url,
      title: title
    });
    setLink(image);
    setFileName();
  }, []);

  const classes = useStyle();

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value
    });
  };

  const handleDelete = (id) => {
    fetch(`${urlServer}/event?id=${id}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOpen(false);
        setRender(!reRender);
      })
      .catch((err) => {
        console.log(err);
        setOpen(false);
        setRender(!reRender);
      });
  };

  const handleFile = (event) => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const { title, url } = state;

    const body = {
      title,
      url,
      image: link
    };

    fetch(`${urlServer}/event?id=${id}`, {
      method: 'PUT',
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

  return (
    <>
      <DeleteMessage
        message="Apakah kamu yakin ingin menghapus event ini?"
        open={open}
        onClose={setOpen}
        onCancel={handleClose}
        onDelete={handleDelete}
      />
      <Dialog
        className="dialog-edit"
        open={edit}
        onClose={() => {
          setEdit(false);
        }}
      >
        <form onSubmit={handleSubmit} className={classed.root}>
          <h3>Edit Event</h3>
          <TextField
            required
            name="title"
            id="judul-event"
            label="Judul Event"
            variant="filled"
            value={state.title}
            onChange={handleChange}
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
            placeholder={url}
            value={state.url}
            onChange={handleChange}
          />
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Button
              style={{ marginRight: '3rem' }}
              onClick={() => {
                setEdit(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={classed.button}
              variant="contained"
            >
              Edit Event
            </Button>
          </div>
        </form>
      </Dialog>
      <div className="event-card">
        <div className="event-card__img-container">
          <img className="event-card__img" src={image} alt={title} />
          <span className="event-card__title">{title}</span>
        </div>
        <div className="event-card__cta">
          <Button
            onClick={() => {
              setEdit(true);
            }}
            className={classes.edit}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            className={classes.delete}
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default EventCard;

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
  edit: {
    flex: 1,
    height: '5rem',
    color: 'white',
    background: '#E01243',
    fontSize: '1.6rem',
    borderRadius: 0,
    fontWeight: 700,
    '&:hover': {
      background: 'rgb(202, 11, 56)'
    }
  },
  hapus: {
    fontSize: '1.6rem',
    flex: 1,
    borderRadius: 0,
    fontWeight: 700
  }
});

const DeleteMessage = ({ message, onDelete, onCancel, open, onClose }) => {
  const classes = useStyle();
  return (
    <Dialog className="dialog-delete" onClose={onClose} open={open}>
      <div className="delete">
        <span className="delete__message">{message}</span>
        <div className="event-card__cta">
          <Button onClick={onCancel} className={classes.edit}>
            Cancel
          </Button>
          <Button onClick={onDelete} className={classes.hapus}>
            Hapus
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteMessage;

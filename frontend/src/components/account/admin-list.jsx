import React, { useState } from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import DeleteMessage from '../delete-message/delete-message';
import Cookies from 'js-cookie';

const AdminList = ({ username, classes, role, reRender, setRerender }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = (admin) => {
    const body = new FormData();

    body.append('username', admin);

    fetch('https://api.vokasiconnect.id/admin', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${Cookies.get('access_token')}`
      },
      body
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setOpen(false);
        setRerender(!reRender);
      });
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {username}
      </TableCell>
      <TableCell align="center">
        {role === 1 ? 'Super Administrator' : 'Administrator'}
      </TableCell>
      <TableCell className={classes.action} align="right">
        <span onClick={() => setOpen(true)}>Delete</span>
        <DeleteMessage
          message="Apakah kamu yakin ingin menghapus akun ini?"
          open={open}
          onClose={setOpen}
          onCancel={() => setOpen(false)}
          onDelete={() => {
            handleDelete(username);
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default AdminList;

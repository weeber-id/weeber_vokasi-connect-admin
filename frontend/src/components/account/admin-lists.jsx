import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  makeStyles,
  Table,
  Paper,
  CircularProgress
} from '@material-ui/core';
import DeleteMessage from '../delete-message/delete-message';

const AdminLists = ({ toggleClose }) => {
  const [adminLists, setAdminLists] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch('https://api.vokasiconnect.id/admin', {
      headers: {
        Authorization: `Bearer ${Cookies.get('access_token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setAdminLists(data.data);
      });
  }, []);

  const useStyles = makeStyles({
    table: {
      minWidth: 650
    },
    action: {
      '& span': {
        userSelect: 'none',
        cursor: 'pointer',
        fontWeight: 700,
        color: '#e01243',

        '&:not(:last-child)': {
          marginRight: '2rem'
        }
      }
    }
  });

  const classes = useStyles();
  return (
    <>
      <div
        className="overlay"
        onClick={() => {
          toggleClose(false);
        }}
      />
      <div className="account__admin-lists">
        <TableContainer>
          <Table
            className={classes.table}
            size="medium"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell align="center">Role</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminLists.length === 0 ? (
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    <CircularProgress size="2rem" color="inherit" />
                  </TableCell>
                </TableRow>
              ) : (
                adminLists?.map((row, i) => (
                  <TableRow key={`prestasi-${row.username}-${i}`}>
                    <TableCell component="th" scope="row">
                      {row.username}
                    </TableCell>
                    <TableCell align="center">
                      {row.role === 1 ? 'Super Administrator' : 'Administrator'}
                    </TableCell>
                    <TableCell className={classes.action} align="right">
                      <span onClick={() => setOpen(true)}>Delete</span>
                    </TableCell>
                    <DeleteMessage
                      message="Apakah kamu yakin ingin menghapus prestasi ini?"
                      open={open}
                      onClose={setOpen}
                      onCancel={() => setOpen(false)}
                      // onDelete={() => handleDelete(row.id)}
                    />
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default AdminLists;

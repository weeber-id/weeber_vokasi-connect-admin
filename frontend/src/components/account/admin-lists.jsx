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
  CircularProgress
} from '@material-ui/core';

import AdminList from './admin-list';

const AdminLists = ({ toggleClose }) => {
  const [adminLists, setAdminLists] = useState([]);
  const [reRender, setRerender] = useState(false);

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
  }, [reRender]);

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
                  <AdminList
                    key={`admin-${row.username}-${i}`}
                    {...row}
                    reRender={reRender}
                    setRerender={setRerender}
                    classes={classes}
                  />
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

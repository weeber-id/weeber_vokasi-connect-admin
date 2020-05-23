import React, { useEffect, useState } from 'react';
import DataPublikForm from '../data-publik-form/data-publik-form';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import DeleteMessage from '../delete-message/delete-message';

const DataPublik = () => {
  const [dataRiset, setDataRiset] = useState([]);
  const [open, setOpen] = useState(false);
  const urlServer = 'http://35.240.223.151:8003';

  useEffect(() => {
    fetch(`${urlServer}/portal-data?category_id=1`)
      .then((res) => res.json())
      .then((data) => {
        setDataRiset(data.data);
      })
      .catch((err) => {
        console.log(err);
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
        '&:not(:last-child)': {
          marginRight: '2rem',
          color: '#e01243'
        }
      }
    }
  });

  const classes = useStyles();
  return (
    <div className="data-publik">
      <DataPublikForm />
      <div className="data-publik__data-riset">
        <h3>Data Riset</h3>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="medium"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Judul</TableCell>
                <TableCell align="right">Created At</TableCell>
                <TableCell align="right">Link</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataRiset?.map((row, i) => (
                <TableRow key={`prestasi-${row.name}-${i}`}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.tanggal}</TableCell>
                  <TableCell align="right">{row.link}</TableCell>
                  <TableCell className={classes.action} align="right">
                    <span>Edit</span>
                    <span onClick={() => setOpen(true)}>Delete</span>
                  </TableCell>
                  <DeleteMessage
                    message="Apakah kamu yakin ingin menghapus prestasi ini?"
                    open={open}
                    onClose={setOpen}
                    onCancel={() => setOpen(false)}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="data-publik__data-riset">
        <h3>Buletin</h3>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="medium"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Judul</TableCell>
                <TableCell align="right">Created At</TableCell>
                <TableCell align="right">Link</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataRiset?.map((row, i) => (
                <TableRow key={`prestasi-${row.name}-${i}`}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.tanggal}</TableCell>
                  <TableCell align="right">{row.link}</TableCell>
                  <TableCell className={classes.action} align="right">
                    <span>Edit</span>
                    <span onClick={() => setOpen(true)}>Delete</span>
                  </TableCell>
                  <DeleteMessage
                    message="Apakah kamu yakin ingin menghapus prestasi ini?"
                    open={open}
                    onClose={setOpen}
                    onCancel={() => setOpen(false)}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="data-publik__data-riset">
        <h3>Kajian Strategis</h3>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="medium"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Judul</TableCell>
                <TableCell align="right">Created At</TableCell>
                <TableCell align="right">Link</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataRiset?.map((row, i) => (
                <TableRow key={`prestasi-${row.name}-${i}`}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.tanggal}</TableCell>
                  <TableCell align="right">{row.link}</TableCell>
                  <TableCell className={classes.action} align="right">
                    <span>Edit</span>
                    <span onClick={() => setOpen(true)}>Delete</span>
                  </TableCell>
                  <DeleteMessage
                    message="Apakah kamu yakin ingin menghapus prestasi ini?"
                    open={open}
                    onClose={setOpen}
                    onCancel={() => setOpen(false)}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="data-publik__data-riset">
        <h3>UU IKM Vokasi UI</h3>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="medium"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Judul</TableCell>
                <TableCell align="right">Created At</TableCell>
                <TableCell align="right">Link</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataRiset?.map((row, i) => (
                <TableRow key={`prestasi-${row.name}-${i}`}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.tanggal}</TableCell>
                  <TableCell align="right">{row.link}</TableCell>
                  <TableCell className={classes.action} align="right">
                    <span>Edit</span>
                    <span onClick={() => setOpen(true)}>Delete</span>
                  </TableCell>
                  <DeleteMessage
                    message="Apakah kamu yakin ingin menghapus prestasi ini?"
                    open={open}
                    onClose={setOpen}
                    onCancel={() => setOpen(false)}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default DataPublik;

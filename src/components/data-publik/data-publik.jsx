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
  const [buletin, setBuletin] = useState([]);
  const [kajian, setKajian] = useState([]);
  const [uu, setUU] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const urlServer = 'https://api.vokasiconnect.id';
  const [kategori, setKategori] = useState('');
  const [state, setState] = useState({
    judul: '',
    link: ''
  });
  const [reRender, setRerender] = useState(false);

  const portalData = (id, callback) => {
    fetch(`${urlServer}/portal-data?category_id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        callback(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    portalData(1, setDataRiset);
    portalData(2, setBuletin);
    portalData(3, setKajian);
    portalData(4, setUU);
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
        '&:not(:last-child)': {
          marginRight: '2rem',
          color: '#e01243'
        }
      }
    }
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

    setState({
      ...state,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    function formatDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }

    const body = {
      title: state.judul,
      link: state.link,
      tanggal: formatDate(new Date(Date.now())),
      category_id: kategori
    };

    console.log(kategori);

    fetch(`${urlServer}/portal-data`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRerender(!reRender);
      })
      .catch((err) => {
        console.log(err);
        setRerender(!reRender);
      });

    setState({
      judul: '',
      link: ''
    });
  };

  const handleDelete = (id) => {
    fetch(`${urlServer}/portal-data?id=${id}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRerender(!reRender);
        setOpen(false);
        setOpen1(false);
        setOpen2(false);
        setOpen3(false);
      })
      .catch((err) => {
        console.log(err);
        setRerender(!reRender);
        setOpen(false);
        setOpen1(false);
        setOpen2(false);
        setOpen3(false);
      });
  };

  const classes = useStyles();
  return (
    <div className="data-publik">
      <DataPublikForm
        onChange={handleChange}
        kategori={kategori}
        setKategori={setKategori}
        value={state}
        onSubmit={handleSubmit}
      />
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
                    onDelete={() => {
                      handleDelete(row.id);
                      console.log(row.id);
                    }}
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
              {buletin?.map((row, i) => (
                <TableRow key={`prestasi-${row.name}-${i}`}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.tanggal}</TableCell>
                  <TableCell align="right">{row.link}</TableCell>
                  <TableCell className={classes.action} align="right">
                    <span>Edit</span>
                    <span onClick={() => setOpen1(true)}>Delete</span>
                  </TableCell>
                  <DeleteMessage
                    message="Apakah kamu yakin ingin menghapus prestasi ini?"
                    open={open1}
                    onClose={setOpen1}
                    onCancel={() => setOpen(false)}
                    onDelete={() => {
                      handleDelete(row.id);
                      console.log(row.id);
                    }}
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
              {kajian?.map((row, i) => (
                <TableRow key={`prestasi-${row.name}-${i}`}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.tanggal}</TableCell>
                  <TableCell align="right">{row.link}</TableCell>
                  <TableCell className={classes.action} align="right">
                    <span>Edit</span>
                    <span onClick={() => setOpen2(true)}>Delete</span>
                  </TableCell>
                  <DeleteMessage
                    message="Apakah kamu yakin ingin menghapus prestasi ini?"
                    open={open2}
                    onClose={setOpen2}
                    onCancel={() => setOpen2(false)}
                    onDelete={() => {
                      handleDelete(row.id);
                      console.log(row.id);
                    }}
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
              {uu?.map((row, i) => (
                <TableRow key={`prestasi-${row.name}-${i}`}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.tanggal}</TableCell>
                  <TableCell align="right">{row.link}</TableCell>
                  <TableCell className={classes.action} align="right">
                    <span>Edit</span>
                    <span onClick={() => setOpen3(true)}>Delete</span>
                  </TableCell>
                  <DeleteMessage
                    message="Apakah kamu yakin ingin menghapus prestasi ini?"
                    open={open3}
                    onClose={setOpen3}
                    onCancel={() => setOpen3(false)}
                    onDelete={() => {
                      handleDelete(row.id);
                      console.log(row.id);
                    }}
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

import React, { useEffect, useState } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import PrestasiForm from '../prestasi-form/prestasi-form';
import DeleteMessage from '../delete-message/delete-message';

const RuangPrestasi = () => {
  const [prestasi, setPrestasi] = useState([]);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    nama: '',
    angkatan: '',
    prodi: '',
    prestasi: ''
  });
  const [reRender, setRerender] = useState(false);

  const urlServer = 'https://api.vokasiconnect.id';
  useEffect(() => {
    fetch(`${urlServer}/all-ruang-prestasi`)
      .then((res) => res.json())
      .then((data) => {
        setPrestasi(data.data);
      })
      .catch((err) => {
        console.log(err);
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
        '&:not(:last-child)': {
          marginRight: '2rem',
          color: '#e01243'
        }
      }
    }
  });

  const classes = useStyles();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nama, angkatan, prodi, prestasi } = state;

    const body = {
      nama,
      angkatan,
      jurusan: prodi,
      prestasi
    };

    fetch(`${urlServer}/ruang-prestasi`, {
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
      nama: '',
      angkatan: '',
      prodi: '',
      prestasi: ''
    });
  };

  const handleDelete = (id) => {
    fetch(`${urlServer}/ruang-prestasi?id=${id}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRerender(!reRender);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setRerender(!reRender);
        setOpen(false);
      });
  };

  return (
    <div className="ruang-prestasi">
      <PrestasiForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        value={state}
      />
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="medium"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Nama</TableCell>
              <TableCell align="right">Angkatan</TableCell>
              <TableCell align="right">Prodi</TableCell>
              <TableCell align="right">Prestasi</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prestasi?.map((row, i) => (
              <TableRow key={`prestasi-${row.name}-${i}`}>
                <TableCell component="th" scope="row">
                  {row.nama}
                </TableCell>
                <TableCell align="right">{row.angkatan}</TableCell>
                <TableCell align="right">{row.jurusan}</TableCell>
                <TableCell align="right">{row.prestasi}</TableCell>
                <TableCell className={classes.action} align="right">
                  <span>Edit</span>
                  <span onClick={() => setOpen(true)}>Delete</span>
                </TableCell>
                <DeleteMessage
                  message="Apakah kamu yakin ingin menghapus prestasi ini?"
                  open={open}
                  onClose={setOpen}
                  onCancel={() => setOpen(false)}
                  onDelete={() => handleDelete(row.id)}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RuangPrestasi;

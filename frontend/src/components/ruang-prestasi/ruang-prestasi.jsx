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
import PrestasiCell from './prestasi-cell';
import Loading from '../loading';

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
  const [isLoading, setLoading] = useState(false);

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
    setLoading(true);

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
        alert(data.message);
        setLoading(false);
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
    setLoading(true);
    fetch(`${urlServer}/ruang-prestasi?id=${id}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((data) => {
        setRerender(!reRender);
        setOpen(false);
        alert(data.message);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setRerender(!reRender);
        setOpen(false);
      });
  };

  return (
    <>
      {isLoading ? (
        <Loading message="Processing your request, Please wait..." />
      ) : null}
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
              {prestasi?.map((row) => (
                <PrestasiCell
                  {...row}
                  classes={classes}
                  key={`prestasi-${row.nama}-${row.id}`}
                  handleDelete={handleDelete}
                  reRender={reRender}
                  setRerender={setRerender}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default RuangPrestasi;

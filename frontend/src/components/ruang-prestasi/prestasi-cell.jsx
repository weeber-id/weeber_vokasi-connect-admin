import React, { useState, useEffect } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import DeleteMessage from '../delete-message/delete-message';
import PrestasiForm from '../prestasi-form/prestasi-form';

import './prestasi-cell.scss';
import Loading from '../loading';

const PrestasiCell = ({
  nama,
  id,
  angkatan,
  jurusan,
  prestasi,
  classes,
  handleDelete,
  reRender,
  setRerender
}) => {
  const urlServer = 'https://api.vokasiconnect.id';
  const [open, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [state, setState] = useState({
    nama: nama,
    angkatan: angkatan,
    prodi: jurusan,
    prestasi: prestasi
  });
  const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   setState({
  //     nama,
  //     angkatan,
  //     prodi: jurusan,
  //     prestasi
  //   });
  // }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;

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

    fetch(`${urlServer}/ruang-prestasi?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setLoading(false);
        setEdit(false);
        setRerender(!reRender);
      })
      .catch((err) => {
        console.log(err);
        setRerender(!reRender);
      });
  };

  return (
    <>
      {isLoading ? (
        <Loading message="Processing your request, Please wait..." />
      ) : null}
      <DeleteMessage
        message="Apakah kamu yakin ingin menghapus prestasi ini?"
        open={open}
        onClose={setOpen}
        onCancel={() => setOpen(false)}
        onDelete={() => handleDelete(id)}
      />
      {isEdit ? (
        <>
          <div onClick={() => setEdit(false)} className="overlay"></div>
          <div className="prestasi-edit">
            <PrestasiForm
              onSubmit={handleSubmit}
              value={state}
              onChange={handleChange}
            />
          </div>
        </>
      ) : null}
      <TableRow>
        <TableCell component="th" scope="row">
          {nama}
        </TableCell>
        <TableCell align="right">{angkatan}</TableCell>
        <TableCell align="right">{jurusan}</TableCell>
        <TableCell align="right">{prestasi}</TableCell>
        <TableCell className={classes.action} align="right">
          <span
            onClick={() => {
              setEdit(true);
            }}
          >
            Edit
          </span>
          <span onClick={() => setOpen(true)}>Delete</span>
        </TableCell>
      </TableRow>
    </>
  );
};

export default PrestasiCell;

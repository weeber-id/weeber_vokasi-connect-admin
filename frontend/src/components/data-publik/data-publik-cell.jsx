import React, { useState } from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import DeleteMessage from '../delete-message/delete-message';
import DataPublikForm from '../data-publik-form/data-publik-form';

const DataPublikCell = ({
  handleDelete,
  title,
  tanggal,
  link,
  classes,
  category,
  id,
  reRender,
  setRerender,
  setLoading
}) => {
  const urlServer = 'https://api.vokasiconnect.id';
  const [open, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [kategori, setKategori] = useState(category.id);
  const [state, setState] = useState({
    judul: title,
    link: link
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
    setLoading(true);
    fetch(`${urlServer}/portal-data?id=${id}`, {
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
      {isEdit ? (
        <>
          <div onClick={() => setEdit(false)} className="overlay" />
          <div className="prestasi-edit">
            <DataPublikForm
              value={state}
              kategori={kategori}
              setKategori={setKategori}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </div>
        </>
      ) : null}
      <DeleteMessage
        message="Apakah kamu yakin ingin menghapus data ini?"
        open={open}
        onClose={setOpen}
        onCancel={() => setOpen(false)}
        onDelete={() => {
          handleDelete(id, () => {
            setOpen(false);
          });
        }}
      />
      <TableRow>
        <TableCell component="th" scope="row">
          {title}
        </TableCell>
        <TableCell align="right">{tanggal}</TableCell>
        <TableCell align="right">{link}</TableCell>
        <TableCell className={classes.action} align="right">
          <span onClick={() => setEdit(true)}>Edit</span>
          <span onClick={() => setOpen(true)}>Delete</span>
        </TableCell>
      </TableRow>
    </>
  );
};

export default DataPublikCell;

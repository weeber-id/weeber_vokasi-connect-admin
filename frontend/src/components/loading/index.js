import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Loading = ({ message }) => {
  return (
    <div className="loading">
      <div className="loop">
        <CircularProgress color="inherit" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Loading;

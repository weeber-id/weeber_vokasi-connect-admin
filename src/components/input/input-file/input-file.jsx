import React from 'react';

import './input-file.scss';

const InputForm = ({
  id,
  onChange,
  text = 'Upload',
  placeholder = 'Upload your file...',
  value = '',
  link = '',
  required
}) => {
  if (link.length > 80) {
    link = link.slice(0, 79) + '...';
  }

  return (
    <div className="input-file__container">
      <input
        required={required}
        onChange={onChange}
        value={value}
        link={link}
        id={id}
        type="file"
        className="input-file"
      />
      <p className="input-file__error">
        Field ini tidak boleh kosong, mohon upload gambar!
      </p>
      <span>{link.length > 0 ? link : placeholder}</span>
      <label htmlFor={id} className="input-file__label">
        {text}
      </label>
    </div>
  );
};

export default InputForm;

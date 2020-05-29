import React from 'react';

const FormField = ({
  input,
  label,
  placeholder,
  button,
  meta: { error, touched }
}) => {
  return (
    <div className="form-field">
      {label && (
        <label>
          <p className="form-label">{label}</p>
        </label>
      )}
      <input className="form-input" {...input} placeholder={placeholder} />
      {button ? (
        button
      ) : (
        <button className="btn sm" style={{ visibility: 'hidden' }}></button>
      )}
      <div>{touched && error}</div>
    </div>
  );
};

export default FormField;

import React from 'react';

const FormField = ({
  input,
  label,
  hideLabel,
  placeholder,
  button,
  meta: { error, touched }
}) => {
  return (
    <div className="form-field">
      {label && (
        <label>
          <p
            className="form-label"
            style={{ visibility: hideLabel && 'hidden' }}
          >
            {label}
          </p>
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

import React from 'react';

const FormField = ({
  input,
  label,
  hideLabel,
  selectOptions,
  selectValues,
  placeholder,
  button,
  meta: { error, touched }
}) => {
  return (
    <div className="form-field">
      <label>
        <p className="form-label" style={{ visibility: hideLabel && 'hidden' }}>
          {label}
        </p>
      </label>
      {selectOptions ? (
        <select className="form-input" {...input}>
          <option value="" disabled defaultValue>
            {placeholder}
          </option>
          {selectOptions.map((o, i) => (
            <option key={o} value={selectValues[i]}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input className="form-input" {...input} placeholder={placeholder} />
      )}

      {button ? (
        button
      ) : (
        <button className="btn sm" style={{ visibility: 'hidden' }}></button>
      )}
      <div style={{ flexBasis: '100%', height: '0' }}></div>
      <div className="error" style={{ margin: 'auto' }}>
        {touched && error}
      </div>
    </div>
  );
};

export default FormField;

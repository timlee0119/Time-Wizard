import React from 'react';

const FormField = ({
  input,
  label,
  hideLabel,
  selectOptions,
  selectValues,
  placeholder,
  button,
  extra,
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

      <div style={{ width: '4rem' }}>{button}</div>
      <div className="break"></div>
      {extra && (
        <>
          <div className="text-second" style={{ margin: 'auto' }}>
            {extra}
          </div>
          <div className="break"></div>
        </>
      )}
      <div className="text-error" style={{ margin: 'auto' }}>
        {touched && error}
      </div>
    </div>
  );
};

export default FormField;

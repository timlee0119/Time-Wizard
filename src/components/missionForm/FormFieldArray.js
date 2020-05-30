import React from 'react';
import { Field } from 'redux-form';
import FormField from './FormField';

const FormFieldArray = ({ fields, label, meta: { error } }) => {
  const renderButton = index => {
    if (index === fields.length - 1) {
      return (
        <button
          className="btn sm main"
          type="button"
          onClick={() => fields.push()}
        >
          新增
        </button>
      );
    } else {
      return (
        <button
          className="btn sm second"
          type="button"
          title="Remove Website"
          onClick={() => fields.remove(index)}
        >
          移除
        </button>
      );
    }
  };
  return (
    <div style={{ display: 'flex' }}>
      {/* <label>
        <p className="form-label">{label}</p>
      </label> */}
      <div style={{ flexGrow: '1' }}>
        {fields.map((field, index) => (
          // dangerous???
          <React.Fragment key={index}>
            <Field
              name={field}
              label={label}
              hideLabel={index !== 0}
              placeholder="請輸入網址"
              component={FormField}
              button={renderButton(index)}
            />
            {/* <div style={{ flex: '100%', height: '0' }}></div> */}
            {/* {renderButton(index)} */}
          </React.Fragment>
        ))}
        {/* {error && <li>{error}</li>} */}
      </div>
    </div>
  );
};

export default FormFieldArray;

import React from 'react';
import { Field } from 'redux-form';
import FormField from './FormField';

const FormFieldArray = ({ fields, label, meta: { error } }) => {
  const renderButton = index => {
    if (index === fields.length - 1) {
      return (
        <button type="button" onClick={() => fields.push()}>
          新增
        </button>
      );
    } else {
      return (
        <button
          type="button"
          title="Remove Website"
          onClick={() => fields.remove(index)}
        >
          X
        </button>
      );
    }
  };
  return (
    <div>
      <label>{label}</label>
      <div>
        {fields.map((field, index) => (
          // dangerous???
          <div key={index}>
            <Field name={field} type="text" component={FormField} />
            {renderButton(index)}
          </div>
        ))}
        {error && <li>{error}</li>}
      </div>
    </div>
  );
};

export default FormFieldArray;

import React from 'react';
import { Field } from 'redux-form';
import FormField from './FormField';

const FormFieldArray = ({ fields, label, meta: { error } }) => {
  return (
    <ul>
      <li>
        <button type="button" onClick={() => fields.push()}>
          新增
        </button>
      </li>
      {fields.map((field, index) => (
        // dangerous???
        <li key={index}>
          <button
            type="button"
            title="Remove Website"
            onClick={() => fields.remove(index)}
          >
            X
          </button>
          <Field
            name={field}
            type="text"
            component={FormField}
            label={index === 0 && label}
          />
        </li>
      ))}
      {error && <li>{error}</li>}
    </ul>
  );
};

export default FormFieldArray;

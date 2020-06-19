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
          onClick={() => fields.length < 5 && fields.push()}
        >
          新增
        </button>
      );
    } else {
      return (
        <button
          className="btn sm cancel"
          type="button"
          title="Remove Website"
          onClick={() => fields.remove(index)}
        >
          Ｘ
        </button>
      );
    }
  };
  return (
    <div>
      {fields.map((field, index) => (
        // dangerous???
        <React.Fragment key={index}>
          <Field
            name={field}
            label={label}
            hideLabel={index !== 0}
            placeholder="請輸入想戒的網址"
            component={FormField}
            button={renderButton(index)}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default FormFieldArray;

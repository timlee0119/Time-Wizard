import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field, FieldArray } from 'redux-form';
import FormField from './FormField';
import FormFieldArray from './FormFieldArray';

class JoinMissionForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field
          name="code"
          type="text"
          label="任務代碼："
          component={FormField}
        />
        {/* Remember to change value in seconds */}
        <Field
          name="limitTime"
          type="text"
          label="單日限制時間（秒）："
          component={FormField}
        />
        <FieldArray
          name="limitedWebsites"
          label="限制網站："
          component={FormFieldArray}
        />
        <button type="submit">確認</button>
        <Link to="/">返回上一頁</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  console.log('In validate()');

  return errors;
}

export default reduxForm({
  form: 'joinMissionForm',
  validate,
  destroyOnUnmount: false,
  initialValues: {
    limitedWebsites: ['']
  }
})(JoinMissionForm);

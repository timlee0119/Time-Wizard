import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field, FieldArray } from 'redux-form';
import FormField from './FormField';
import FormFieldArray from './FormFieldArray';

class CreateMissionForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field
          name="name"
          type="text"
          label="任務名稱："
          placeholder="請輸入任務名稱"
          component={FormField}
        />
        <Field
          name="days"
          type="text"
          label="執行天數："
          placeholder="請選擇天數"
          component={FormField}
        />
        {/* Remember to change value in seconds */}
        <Field
          name="limitTime"
          type="text"
          label="單日限制時間："
          placeholder="請選擇限制時間"
          component={FormField}
        />
        <Field
          name="money"
          type="text"
          label="投入金額："
          placeholder="請選擇金額"
          component={FormField}
        />
        <FieldArray
          name="limitedWebsites"
          label="限制網站："
          component={FormFieldArray}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <button
            style={{
              width: '7rem',
              height: '2.6rem',
              backgroundColor: 'var(--main-darker-color)',
              margin: '1.5rem 0 0.5rem 0'
            }}
            className="btn main"
            type="submit"
          >
            確認
          </button>
          <Link to="/">
            <button className="btn-prev">
              <div>&#8227;</div>
              返回上一頁
            </button>
          </Link>
        </div>
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
  form: 'createMissionForm',
  validate,
  destroyOnUnmount: false,
  initialValues: {
    limitedWebsites: ['']
  }
})(CreateMissionForm);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field, FieldArray } from 'redux-form';
import FormField from './FormField';
import FormFieldArray from './FormFieldArray';
import { isValidURI } from '../../utils/utils';

class CreateMissionForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field
          name="name"
          label="任務名稱："
          placeholder="請輸入任務名稱"
          component={FormField}
        />
        <Field
          name="days"
          selectOptions={[1, 3, 5, 7, 10, 14]}
          selectValues={[1, 3, 5, 7, 10, 14]}
          label="執行天數："
          placeholder="請選擇天數"
          component={FormField}
        />
        {/* Remember to change value in seconds */}
        <Field
          name="limitTime"
          selectOptions={[
            '5分鐘',
            '10分鐘',
            '15分鐘',
            '20分鐘',
            '30分鐘',
            '45分鐘',
            '1小時',
            '2小時'
          ]}
          selectValues={[300, 600, 900, 1200, 1800, 2700, 3600, 7200]}
          label="單日限制時間："
          placeholder="請選擇限制時間"
          component={FormField}
        />
        <Field
          name="money"
          label="投入金額："
          placeholder="請輸入金額"
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

  const fields = ['name', 'days', 'limitTime', 'money'];
  fields.forEach(f => {
    if (!values[f]) {
      errors[f] = '此欄位不得為空';
    }
  });

  if (isNaN(values.money)) {
    errors.money = '請輸入合法數字';
  } else if (values.money < 10 || values.money > 1000) {
    errors.money = '投入金額不得低於 10 或超過 1000 元';
  }

  if (values.limitedWebsites) {
    const webSitesErrors = [];
    values.limitedWebsites.forEach((w, i) => {
      if (!isValidURI(w)) {
        webSitesErrors[i] = '請輸入合法網址';
      }
    });
    errors.limitedWebsites = webSitesErrors;
  }

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

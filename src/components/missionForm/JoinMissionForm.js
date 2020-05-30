import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field, FieldArray } from 'redux-form';
import FormField from './FormField';
import FormFieldArray from './FormFieldArray';
import IconTooltip from '../widgets/IconTooltip';
import { isValidURI } from '../../utils/utils';
import tooltipContents from './tooltipContents';

class JoinMissionForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field
          name="code"
          label="任務代碼："
          button={
            <IconTooltip
              icon="help_outline"
              id="code-hint"
              content={tooltipContents.code}
            />
          }
          placeholder="請輸入朋友的任務代碼"
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
          button={
            <IconTooltip
              icon="help_outline"
              id="limitTime-hint"
              content={tooltipContents.limitTime}
            />
          }
          placeholder="請選擇單日限制時間"
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

  const fields = ['code', 'limitTime'];
  fields.forEach(f => {
    if (!values[f]) {
      errors[f] = '此欄位不得為空';
    }
  });

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
  form: 'joinMissionForm',
  validate,
  destroyOnUnmount: false,
  initialValues: {
    limitedWebsites: ['']
  }
})(JoinMissionForm);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field, FieldArray, formValueSelector } from 'redux-form';
import FormField from './FormField';
import FormFieldArray from './FormFieldArray';
import IconTooltip from '../widgets/IconTooltip';
import { isValidURI } from '../../utils/utils';
import tooltipContents from './tooltipContents';
import { connect } from 'react-redux';

class CreateMissionForm extends Component {
  renderDaileyMoney = () => {
    let { days, money } = this.props;
    if (days && money && validateMoney(money) === null) {
      return `每日金額 ${(money / days).toFixed(1)} 元`;
    }
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field
          name="name"
          label="任務名稱："
          placeholder="替你的戒斷任務取個名字吧！"
          component={FormField}
        />
        <Field
          name="days"
          selectOptions={[1, 3, 5, 7, 10, 14]}
          selectValues={[1, 3, 5, 7, 10, 14]}
          label="執行天數："
          placeholder="請選擇執行天數"
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
          placeholder="請選擇單日限制時間"
          button={
            <IconTooltip
              icon="help_outline"
              id="limitTime-hint"
              content={tooltipContents.limitTime}
            />
          }
          component={FormField}
        />
        <Field
          name="money"
          label="投入金額："
          placeholder="請輸入金額"
          button={
            <IconTooltip
              icon="help_outline"
              id="money-hint"
              content={tooltipContents.money}
            />
          }
          component={FormField}
          extra={this.renderDaileyMoney()}
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
            disabled={this.props.submitting}
          >
            確認
          </button>
          <Link to="/">
            <button className="btn-prev" disabled={this.props.submitting}>
              <span className="material-icons">arrow_left</span>
              <span>返回上一頁</span>
            </button>
          </Link>
        </div>
      </form>
    );
  }
}

function validateMoney(money) {
  if (isNaN(money)) {
    return '請輸入合法數字';
  } else if (money < 10 || money > 10000) {
    return '投入金額不得低於 10 或超過 10000 元';
  }
  return null;
}

function validate(values) {
  const errors = {};

  const fields = ['name', 'days', 'limitTime', 'money'];
  fields.forEach(f => {
    if (!values[f]) {
      errors[f] = '此欄位不得為空';
    }
  });

  errors.money = validateMoney(values.money);

  if (values.limitedWebsites) {
    const webSitesErrors = [];
    var hasValidWebsite = false;
    values.limitedWebsites.forEach((w, i) => {
      if (w) {
        if (!isValidURI(w)) {
          webSitesErrors[i] = '請輸入合法網址';
        } else {
          hasValidWebsite = true;
        }
      }
    });
    if (webSitesErrors.length === 0 && !hasValidWebsite) {
      webSitesErrors[0] = '請至少輸入一個限制網站';
    }
    errors.limitedWebsites = webSitesErrors;
  }

  return errors;
}

const createMissionForm = reduxForm({
  form: 'createMissionForm',
  validate,
  destroyOnUnmount: false,
  initialValues: {
    limitedWebsites: ['']
  }
})(CreateMissionForm);

const selector = formValueSelector('createMissionForm');
const mapStateToProps = state => {
  const { days, money } = selector(state, 'days', 'money');
  return { days, money };
};

export default connect(mapStateToProps)(createMissionForm);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import CreateMissionForm from './missionForm/CreateMissionForm';
import orangeHeader from '../images/header_organge.png';

class CreateMissionPage extends Component {
  onFormSubmit = async formValues => {
    formValues.limitedWebsites = formValues.limitedWebsites.filter(w => !!w);
    await this.props.submitCreateMission(formValues);
  };
  render() {
    return (
      <>
        <img style={{ width: '100%' }} src={orangeHeader} alt="orange_header" />
        <div className="card-block" style={{ width: '25rem' }}>
          <h1>開始創建任務與朋友一起執行吧！</h1>
          <CreateMissionForm onSubmit={this.onFormSubmit} />
        </div>
      </>
    );
  }
}

export default connect(null, actions)(CreateMissionPage);

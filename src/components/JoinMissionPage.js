import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import JoinMissionForm from './missionForm/JoinMissionForm';
import blueHeader from '../images/header_blue.png';

class JoinMissionPage extends Component {
  onFormSubmit = formValues => {
    this.props.submitJoinMission(formValues);
  };
  render() {
    return (
      <>
        <img style={{ width: '100%' }} src={blueHeader} alt="orange_header" />
        <div className="card-block" style={{ width: '25rem' }}>
          <h1>輸入朋友任務的邀請代碼吧！</h1>
          <JoinMissionForm onSubmit={this.onFormSubmit} />
        </div>
      </>
    );
  }
}

export default connect(null, actions)(JoinMissionPage);

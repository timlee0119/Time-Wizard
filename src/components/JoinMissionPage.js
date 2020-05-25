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
      <div>
        <img src={blueHeader} alt="orange_header" />
        <h1>輸入朋友已建好的任務代碼吧！</h1>
        <JoinMissionForm onSubmit={this.onFormSubmit} />
      </div>
    );
  }
}

export default connect(null, actions)(JoinMissionPage);

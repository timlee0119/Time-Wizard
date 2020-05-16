import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CreateMissionForm from './missionForm/CreateMissionForm';
import orangeHeader from '../images/header_organge.png';

class CreateMissionPage extends Component {
  onFormSubmit = formValues => {
    console.log(formValues);
  };
  render() {
    return (
      <div>
        <img src={orangeHeader} alt="orange_header" />
        <h1>開始創建任務與朋友一起執行吧！</h1>
        <CreateMissionForm onSubmit={this.onFormSubmit} />
      </div>
    );
  }
}

export default withRouter(CreateMissionPage);

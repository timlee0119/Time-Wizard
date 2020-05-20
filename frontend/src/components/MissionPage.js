/* global chrome */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../utils/axios';
import MissionInfoBlock from './missionBlock/MissionInfoBlock';
import MissionInviteBlock from './missionBlock/MissionInviteBlock';
import profileBlue from '../images/profile_blue.png';
import profileOrange from '../images/profile_orange.png';

class MissionPage extends Component {
  constructor(props) {
    super(props);
    var participants = this.props.auth.mission.participants;
    var me, friend;
    participants.forEach(p => {
      if (p._user === this.props.auth._id) {
        me = p;
      } else {
        friend = p;
      }
    });
    this.state = {
      me,
      friend
    };
  }

  onStartClick = async () => {
    const res = await axios.post('/missions/start');
    console.log(res);
    chrome.runtime.sendMessage({ type: "startMission" }, function (response) {
      console.log(response);
    });
  }

  renderStartButton() {
    if (!this.props.auth.mission.startTime) {
      if (this.state.friend) {
        return this.state.me.owner ? (
          <button onClick={this.onStartClick}>立刻開始</button>
        ) : (
            <button disabled={true}>等待夥伴開始</button>
          );
      } else {
        return <button disabled={true}>等待夥伴加入</button>;
      }
    } else {
      return <p>任務已經開始囉！！！</p>
    }
  }

  render() {
    return (
      <div>
        <h1>{this.props.auth.mission.name}</h1>
        <h3>任務目前進度</h3>
        {this.renderStartButton()}
        <div>
          <MissionInfoBlock picture={profileBlue} participant={this.state.me} />
          {this.state.friend ? (
            <MissionInfoBlock
              picture={profileOrange}
              participant={this.state.friend}
            />
          ) : (
              <MissionInviteBlock
                picture={profileOrange}
                code={this.props.auth.mission.code}
              />
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(MissionPage);

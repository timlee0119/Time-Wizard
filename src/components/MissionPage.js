import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../utils/axios';
import * as actions from '../actions';
import MissionInfoBlock from './missionBlock/MissionInfoBlock';
import MissionInviteBlock from './missionBlock/MissionInviteBlock';
import profileBlue from '../images/profile_blue.png';
import profileOrange from '../images/profile_orange.png';

class MissionPage extends Component {
  onStartClick = () => {
    this.props.submitStartMission();
  };

  renderStartButton(me, friend) {
    if (friend) {
      return me.owner ? (
        <button onClick={this.onStartClick}>立刻開始</button>
      ) : (
        <button disabled={true}>等待夥伴開始</button>
      );
    } else {
      return <button disabled={true}>等待夥伴加入</button>;
    }
  }

  getMe() {
    var pars = this.props.auth.mission.participants;
    var idx = this.props.auth._id === pars[0]._user ? 0 : 1;
    return [pars[idx], pars[(idx + 1) % 2]];
  }

  render() {
    if (this.props.auth.mission.startTime) {
      return <div>任務已經開始囉！現在可以點選插件圖示，開始監控使用情形</div>;
    }
    const [me, friend] = this.getMe();
    return (
      <div>
        <h1>{this.props.auth.mission.name}</h1>
        <h3>任務目前進度</h3>
        {this.renderStartButton(me, friend)}
        <div>
          <MissionInfoBlock picture={profileBlue} participant={me} />
          {friend ? (
            <MissionInfoBlock picture={profileOrange} participant={friend} />
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

export default connect(mapStateToProps, actions)(MissionPage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        <button
          style={{ margin: 'auto' }}
          className="btn main"
          onClick={this.onStartClick}
        >
          立刻開始
        </button>
      ) : (
        <button style={{ margin: 'auto' }} className="btn main" disabled={true}>
          等待夥伴開始
        </button>
      );
    } else {
      return (
        <button style={{ margin: 'auto' }} className="btn main" disabled={true}>
          等待夥伴加入
        </button>
      );
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
      <div className="card-block" style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ flexGrow: '1' }}>
          <h1 className="text-main">{this.props.auth.mission.name}</h1>
          <h2>任務資訊</h2>
        </div>
        <div style={{ flexGrow: '2', display: 'flex' }}>
          {this.renderStartButton(me, friend)}
        </div>
        <div className="break"></div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '1.5rem'
          }}
        >
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

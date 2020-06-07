import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import MissionInfoBlock from './missionBlock/MissionInfoBlock';
import MissionInviteBlock from './missionBlock/MissionInviteBlock';
import profileBlue from '../images/profile_blue.png';
import profileOrange from '../images/profile_orange.png';
import startBackground from '../images/start_background.png';

const MissionStarted = () => (
  <div style={{ margin: 'auto' }}>
    <h1 className="text-main">
      任務已經開始囉！現在可以點選插件圖示，開始監控使用情形
    </h1>
  </div>
);

const Alert = ({ children }) => (
  <div
    style={{
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '9',
      width: '100%',
      height: '3rem',
      backgroundColor: '#3589d1',
      color: 'white',
      fontSize: '1rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: '0.9'
    }}
  >
    {children}
  </div>
);

class MissionPage extends Component {
  state = {
    startBtnDisabled: false
  };

  onStartClick = async () => {
    this.setState({ startBtnDisabled: true });
    await this.props.submitStartMission();
    this.setState({ startBtnDisabled: false });
  };

  renderActionHint(me, friend) {
    if (friend) {
      return me.owner ? (
        <div
          style={{
            backgroundImage: `url(${startBackground})`,
            height: '11.5rem',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '2rem 0'
          }}
        >
          <h3 className="text-main">夥伴已經加入了! 趕快點擊按鈕開始任務吧!</h3>
          <button
            className="btn main"
            disabled={this.state.startBtnDisabled}
            onClick={this.onStartClick}
          >
            任務開始
          </button>
        </div>
      ) : (
        <Alert>等待夥伴加入中 ......</Alert>
      );
    } else {
      return <Alert>等待夥伴開始 ......</Alert>;
    }
  }

  getMe() {
    var pars = this.props.auth.mission.participants;
    var idx = this.props.auth._id === pars[0]._user ? 0 : 1;
    return [pars[idx], pars[(idx + 1) % 2]];
  }

  render() {
    if (this.props.auth.mission.startTime) {
      return <MissionStarted />;
    }
    const [me, friend] = this.getMe();
    return (
      <div className="card-block" style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ flexGrow: '1' }}>
          <h1 className="text-main">{this.props.auth.mission.name}</h1>
          {this.renderActionHint(me, friend)}
          <h2>任務資訊</h2>
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
          <MissionInfoBlock
            picture={profileBlue}
            participant={me}
            days={this.props.auth.mission.days}
            money={this.props.auth.mission.money}
            me
          />
          {friend ? (
            <MissionInfoBlock
              picture={profileOrange}
              participant={friend}
              days={this.props.auth.mission.days}
              money={this.props.auth.mission.money}
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

export default connect(mapStateToProps, actions)(MissionPage);

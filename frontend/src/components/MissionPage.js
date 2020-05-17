import React, { Component } from 'react';
import { connect } from 'react-redux';
import MissionInfoBlock from './MissionInfoBlock';
import MissionInviteBlock from './MissionInviteBlock';
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

  render() {
    return (
      <div>
        <h1>{this.props.auth.mission.name}</h1>
        <h3>任務目前進度</h3>
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
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(MissionPage);

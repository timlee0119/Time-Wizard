import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import profileBlue from '../images/profile_blue.png';

class ReportPage extends Component {
  constructor(props) {
    super(props);
    const me =
      this.props.auth.mission.participants[0]._user === this.props.auth._id
        ? this.props.auth.mission.participants[0]
        : this.props.auth.mission.participants[1];
    const totalTime = this.getTotalTime(me.usageHistory);

    this.state = { me, totalTime };
  }

  // onHomepageClick = async () => {
  //   await this.props.dismissMission();

  // }

  getTotalTime(history) {
    var totalTime;
    for (var i = 0; i < this.props.auth.mission.days; ++i) {
      totalTime += history[i];
    }
    return totalTime;
  }

  getTimeText(seconds) {
    var str = new Date(1000 * seconds).toISOString().substr(11, 8);
    // return str.replace(/:/g, '<span>:</span>');
    return str;
  }

  render() {
    return (
      <div>
        {/* Descriptions */}
        <div>
          <img src={profileBlue} alt="blue_ghost" />
          <div>
            <h1>{this.props.auth.mission.name}</h1>
            <p>任務結束了！來看一下自己的成果吧，下次繼續加油！</p>
          </div>
        </div>
        {/* Time */}
        <div>
          <div>
            <h3>總使用時數</h3>
            <p className="digital_clock">
              {this.getTimeText(this.state.totalTime)}
            </p>
          </div>
          <div>
            <h3>單日限制時數</h3>
            <p className="digital_clock">
              {this.getTimeText(this.state.me.limitTime)}
            </p>
          </div>
        </div>
        {/* limited websites */}
        <div>
          <h3>限制網站</h3>
          {this.state.me.limitedWebsites.map(w => (
            <div>
              <span>
                <img
                  src={`http://www.google.com/s2/favicons?domain=${w}`}
                  alt="favicon"
                />
              </span>
              <span>
                <p>{w}</p>
              </span>
            </div>
          ))}
        </div>
        {/* success days */}
        <div>
          <h3>成功天數 / 總天數</h3>
          <p>
            {this.state.me.successDay} / {this.auth.mission.days}
          </p>
        </div>
        {/* history trend */}
        {/* money */}
        <div>
          <h3>初始投入金額</h3>
          <p>{this.props.mission.money / 2}</p>
          <h3>贖回金額</h3>
          <p>{this.state.me.bonus}</p>
        </div>
        {/* footer */}
        <div style={{ backgroundImage: '../images/report.png' }}>
          <h3>與朋友繼續提升專注度的旅程吧！</h3>
          <button onClick={this.props.dismissMission}>前往首頁</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, actions)(ReportPage);

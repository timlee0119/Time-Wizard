import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TrendChart from './widgets/TrendChart';
import profileBlue from '../images/profile_blue.png';
import reportImg from '../images/report.png';

class ReportPage extends Component {
  constructor(props) {
    super(props);
    const me =
      this.props.auth.mission.participants[0]._user === this.props.auth._id
        ? this.props.auth.mission.participants[0]
        : this.props.auth.mission.participants[1];

    this.state = { me, btnDisabled: false };
  }

  onHomepageClick = async () => {
    this.setState({ btnDisabled: true });
    await this.props.dismissMission();
    this.setState({ btnDisabled: false });
  };

  getAvgTime(history) {
    var totalTime = 0;
    for (var i = 0; i < this.props.auth.mission.days; ++i) {
      totalTime += history[i];
    }
    return Math.floor(totalTime / this.props.auth.mission.days);
  }

  getTimeText(seconds) {
    var str = new Date(1000 * seconds).toISOString().substr(11, 8);
    // return str.replace(/:/g, '<span>:</span>');
    return str;
  }

  render() {
    return (
      <div style={{ margin: '8%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            style={{ marginRight: '2rem', width: '7rem' }}
            src={profileBlue}
            alt="blue_ghost"
          />
          <div>
            <h1 style={{ marginBottom: '0.5rem' }} className="text-main">
              {this.props.auth.mission.name}
            </h1>
            <h3 style={{ marginTop: '0.5rem' }}>
              任務結束了！來看一下自己的成果吧，下次繼續加油！
            </h3>
          </div>
        </div>
        <div style={{ display: 'flex', margin: '1rem 0' }}>
          <div style={{ flexGrow: '1' }}>
            <h3>每日平均使用時數</h3>
            <p
              style={{ fontSize: '3rem', margin: '0 0 1.5rem' }}
              className="digital-clock text-main"
            >
              {this.getTimeText(this.getAvgTime(this.state.me.usageHistory))}
            </p>
          </div>
          <div style={{ flexGrow: '1' }}>
            <h3>單日限制時數</h3>
            <p
              style={{ fontSize: '3rem', margin: '0 0 1.5rem' }}
              className="digital-clock"
            >
              {this.getTimeText(this.state.me.limitTime)}
            </p>
          </div>
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <h3>限制網站</h3>
          {this.state.me.limitedWebsites.map(w => (
            <div key={w} style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={`http://www.google.com/s2/favicons?domain=${w}`}
                alt={w}
              />
              <p style={{ margin: '0 0.5rem' }}>{w}</p>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <h3>成功天數 / 總天數</h3>
          <p>
            {this.state.me.successDay} / {this.props.auth.mission.days}
          </p>
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <h3>使用時數趨勢</h3>
          <TrendChart
            history={this.state.me.usageHistory.slice(
              0,
              this.props.auth.mission.days
            )}
            limit={this.state.me.limitTime}
          />
        </div>
        <div>
          <h3>初始投入金額</h3>
          <p>{this.props.auth.mission.money / 2}</p>
          <h3>贖回金額</h3>
          <p className="text-main">+{this.state.me.bonus}</p>
        </div>
        <div
          style={{
            backgroundImage: `url(${reportImg})`,
            height: '8rem',
            backgroundSize: 'cover',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '2rem'
          }}
        >
          <h3 className="text-main">與朋友繼續提升專注度的旅程吧！</h3>
          <button
            className="btn main"
            disabled={this.state.btnDisabled}
            onClick={this.onHomepageClick}
          >
            前往首頁
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, actions)(ReportPage);

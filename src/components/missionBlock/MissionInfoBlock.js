import React from 'react';

const MissionInfoBlock = ({ picture, participant }) => {
  return (
    <div className="card inner" style={{ width: '45%' }}>
      {/* <img src={this.props.auth.picture} alt="me" /> */}
      <img src={picture} alt="me" />
      <h3>我</h3>
      <p>今日已使用時數</p>
      {100}
      <p>每日限制時數</p>
      {participant.limitTime}
      <p>限制網站</p>
      {participant.limitedWebsites.map(w => (
        <div key={w}>{w}</div>
      ))}
      <p>使用時數趨勢</p>
      <p>目前共同帳戶基金</p>
    </div>
  );
};

export default MissionInfoBlock;

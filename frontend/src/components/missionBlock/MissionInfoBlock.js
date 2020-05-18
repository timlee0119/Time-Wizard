import React from 'react';
import Card from '../widgets/Card';

const MissionInfoBlock = ({ picture, participant }) => {
  return (
    <Card>
      {/* <img src={this.props.auth.picture} alt="me" /> */}
      <img src={picture} alt="me" />
      <h3>我</h3>
      <p>今日已使用時數</p>
      {participant.todayUsage}
      <p>每日限制時數</p>
      {participant.limitTime}
      <p>限制網站</p>
      {participant.limitedWebsites.map(w => w)}
      <p>使用時數趨勢</p>
      <p>目前共同帳戶基金</p>
    </Card>
  );
};

export default MissionInfoBlock;

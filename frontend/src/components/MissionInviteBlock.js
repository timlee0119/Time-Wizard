import React from 'react';
import Card from './widgets/Card';

const MissionInviteBlock = ({ picture, code }) => {
  return (
    <Card>
      <img src={picture} alt="friend" />
      <p>趕快邀請朋友一同加入提升專注度的行列吧！</p>
      <h3>邀請代碼：</h3>
      {code}
    </Card>
  );
};

export default MissionInviteBlock;

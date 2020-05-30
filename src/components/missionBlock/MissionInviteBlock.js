import React from 'react';

const MissionInviteBlock = ({ picture, code }) => {
  return (
    <div className="card inner" style={{ width: '45%' }}>
      <img src={picture} alt="friend" />
      <p>趕快邀請朋友一同加入提升專注度的行列吧！</p>
      <h3>邀請代碼：</h3>
      {code}
    </div>
  );
};

export default MissionInviteBlock;

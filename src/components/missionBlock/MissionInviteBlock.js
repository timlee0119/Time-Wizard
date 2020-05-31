import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const MissionInviteBlock = ({ picture, code }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="card inner" style={{ width: '45%' }}>
      <img src={picture} alt="friend" />
      <div style={{ display: 'flex', margin: '1rem 0 3rem 0' }}>
        <div>
          <span
            style={{ width: '2rem' }}
            className="material-icons text-second"
          >
            help_outline
          </span>
        </div>
        <p style={{ margin: '0' }} className="text-second">
          趕快邀請朋友一同加入提升專注度的行列吧！
        </p>
      </div>

      {/* <h2>邀請代碼：</h2> */}
      {/* <p style={{ margin: '0' }}>{code}</p> */}
      <CopyToClipboard text={code} onCopy={() => setCopied({ copied: true })}>
        <button className="btn second">點此複製邀請代碼</button>
      </CopyToClipboard>
      {copied && (
        <p className="text-second" style={{ fontWeight: 'bold' }}>
          複製成功！
        </p>
      )}
    </div>
  );
};

export default MissionInviteBlock;

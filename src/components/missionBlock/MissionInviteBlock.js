import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const MissionInviteBlock = ({ picture, code }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="card inner" style={{ width: '45%' }}>
      <img src={picture} alt="friend" />
      <div style={{ display: 'flex', margin: '2rem 0' }}>
        <div>
          <span
            style={{ width: '2rem' }}
            className="material-icons text-second"
          >
            help_outline
          </span>
        </div>
        <p style={{ margin: '0' }} className="text-second">
          趕快邀請朋友一起來戒斷網站吧！
        </p>
      </div>
      <h2 className="text-second">{`邀請代碼：${code}`}</h2>
      <CopyToClipboard text={code} onCopy={() => setCopied({ copied: true })}>
        <button className="btn second" style={{ margin: '0.5rem 0' }}>
          複製邀請代碼
        </button>
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

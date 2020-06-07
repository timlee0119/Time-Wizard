import React from 'react';
import IconTooltip from '../widgets/IconTooltip';
import { getTime } from '../../utils/utils';

const MissionInfoBlock = ({ picture, participant, days, money, me }) => {
  return (
    <div className="card inner" style={{ width: '45%', alignItems: 'start' }}>
      <img src={picture} alt="me" />
      <h2 className={`text-${me ? 'main' : 'second'}`}>{participant.name}</h2>
      {/* <p>今日已使用時數</p>
      {100} */}
      <h2>每日限制時數</h2>
      <p className="digital-clock" style={{ margin: '0 0 1rem 0' }}>
        {getTime(participant.limitTime)}
      </p>
      <h2>任務總天數</h2>
      <p style={{ margin: '0' }}>{days} 天</p>
      <h2>限制網站</h2>
      {participant.limitedWebsites.map(w => (
        <div key={w} style={{ display: 'flex', alignItems: 'center' }}>
          <img src={`http://www.google.com/s2/favicons?domain=${w}`} alt={w} />
          <p style={{ margin: '0 0.5rem' }}>{w}</p>
        </div>
      ))}
      <h2>投注金額</h2>
      <p style={{ margin: '0' }}>{money / 2}</p>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2 style={{ display: 'inline-block', marginRight: '0.5rem' }}>
          目前累積金額
        </h2>
        <IconTooltip
          icon="help_outline"
          id="bonus-hint"
          content={
            <div>
              任務進行中的每天，若參加者使用限制網站的時間低於每日限制時數，
              <br />
              就會把一天份的金額累積給自己。若失敗，則會累積給對方
            </div>
          }
          place="right"
        />
      </div>
      <p style={{ margin: '0' }}>0</p>
    </div>
  );
};

export default MissionInfoBlock;

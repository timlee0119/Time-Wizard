import React from 'react';
import { Link } from 'react-router-dom';
import orangeGhost from '../images/welcome_orange.png';
import blueGhost from '../images/welcome_blue.png';

const WelcomePage = () => {
  return (
    <div className="card-block">
      <h1>哈囉，歡迎來到時間精靈！</h1>
      <div style={{ margin: '2rem 0 3rem' }}>
        {/* <h2>幫助你提升專注力，更有效率完成工作與學習的瀏覽器插件</h2>
      <p style={{ paddingBottom: '1rem' }}>
        藉由與朋友共同創建任務，設定特定網站每日使用時間限制，並約定投入相同金額作為共同基金，一定時間結束後依成功天數比例分配基金。
      </p> */}
        <h2>幫助你戒斷成癮網站的瀏覽器插件</h2>
        <h2>我們怎麼幫助你？</h2>
        <p>
          <span style={{ fontWeight: 'bold' }}>步驟一：</span>
          與朋友一同創建任務，設定戒斷網站的每日限制使用時數，並投入共同戒斷基金
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>步驟二：</span>
          在戒斷期間內盡可能達成目標，若當日任務成功則可以領取單日獎金，任務失敗則由朋友獲得
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>步驟三：</span>
          隨時監控使用時數，並在任務結束後檢視報告，追蹤進步程度
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="card inner" style={{ width: '45%' }}>
          <img
            style={{ width: '10rem', height: '10rem' }}
            src={orangeGhost}
            alt="orange_ghost"
          />
          <p style={{ padding: '1rem 0' }}>
            開始找尋互相督促的夥伴一同提升專注力吧！
          </p>
          <Link to="/createMission">
            <button className="btn second">創建任務</button>
          </Link>
        </div>
        <div className="card inner" style={{ width: '45%' }}>
          <img
            style={{ width: '10rem', height: '10rem' }}
            src={blueGhost}
            alt="blue_ghost"
          />
          <p style={{ padding: '1rem 0' }}>
            已經有加入的朋友了嗎？趕快加入他的行列一起努力吧！
          </p>
          <Link to="/joinMission">
            <button className="btn main">輸入代碼</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;

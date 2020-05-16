import React, { useCallback } from 'react';

const WelcomePage = ({ history }) => {
  const onCreateMissionClick = useCallback(() => {
    history.push('/createMission');
  }, [history]);

  const onJoinMissionClick = useCallback(() => {
    history.push('/joinMission');
  }, [history]);

  return (
    <>
      <h1>哈囉，歡迎來到哈哈哈哈！</h1>
      <h2>幫助你提升專注力，更有效率完成工作與學習的網路插件</h2>
      <p>
        藉由與朋友共同創建任務，設定特定網站每日使用時間限制，並約定投入相同金額作為共同基金，一定時間結束後依成功天數比例分配基金。
      </p>
      <div>
        <div>
          <img src="" alt="orange_ghost" />
          <p>開始找尋互相督促的夥伴一同提升專注力吧！</p>
          <button onClick={onCreateMissionClick}>創建任務</button>
        </div>
        <div>
          <img src="" alt="blue_ghost" />
          <p>已經有加入的朋友了嗎？趕快加入他的行列一起努力吧！</p>
          <button onClick={onJoinMissionClick}>輸入代碼</button>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;

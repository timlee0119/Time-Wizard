import React from 'react';

const tooltipContents = {
  money: (
    <>
      您跟朋友在這次戒斷任務中分別要投入多少錢？每日結束時若任務成功，
      <br />
      會把計算出的單日金額累積到自己的帳戶，但若失敗則累積到對方的帳戶
    </>
  ),
  limitTime: <>您一天最多能使用限制網站多久？若超過時間則當日視同任務失敗</>,
  code: <>任務創建者會拿到一組邀請代碼，向您創建任務的朋友取得吧！</>
};

export default tooltipContents;

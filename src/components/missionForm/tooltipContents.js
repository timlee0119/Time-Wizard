import React from 'react';

const tooltipContents = {
  money: (
    <>
      由您自行設定：此次戒斷任務願意投入的金額，若當日任務成功則可以領取單日獎金，任務失敗則由朋友獲得。
    </>
  ),
  limitTime: (
    <>
      由您自行設定：單日能使用所有戒斷網站的時數，若超過設定時數則當日視同任務失敗
    </>
  ),
  code: <>任務創建者會拿到一組邀請代碼，向您創建任務的朋友取得吧！</>
};

export default tooltipContents;

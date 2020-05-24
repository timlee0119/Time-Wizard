window.onload = function () {
  chrome.runtime.sendMessage({ type: 'getMissionEndedData' }, function (
    userData
  ) {
    console.log('get userData: ', userData);
    const participants = userData.mission.participants;
    const myIdx = participants[0]._user === userData._id ? 0 : 1;
    const me = participants[myIdx];
    const friend = participants[(myIdx + 1) % 2];
    document.querySelector(
      '#name'
    ).innerHTML = `${userData.mission.name} 任務結束！`;
    var redeemMe, redeemFriend;
    if (me.bonus >= friend.bonus) {
      redeemMe = `恭喜你贖回了 ${me.bonus} 元！這次做得很好哦！`;
    } else {
      redeemMe = `可惜了！你僅贖回 ${me.bonus} 元，下次再加油！`;
    }
    redeemFriend = `你的朋友贖回了 ${friend.bonus} 元`;
    document.querySelector('#redeem_me').innerHTML = redeemMe;
    document.querySelector('#redeem_friend').innerHTML = redeemFriend;
  });

  document
    .querySelector('#btn-to-report')
    .addEventListener('click', function () {
      chrome.tabs.create({ url: chrome.extension.getURL('index.html') });
    });
};

// const USER_STATUS = {
//   NOT_LOGGED_IN: 0,
//   NO_MISSION: 1,
//   IN_MISSION: 2,
//   MISSION_ENDED: 3
// };

window.onload = function () {
  chrome.runtime.onMessage.addListener(function (request) {
    if (request.type === 'updateUserStatus') {
      switch (request.userStatus) {
        case 0:
          page = './popup_notLoggedIn.html';
          break;
        case 1:
          page = './popup_loggedIn.html';
          break;
        case 2:
          page = './popup_inMission.html';
          break;
        case 3:
          page = './popup_missionEnded.html';
          break;

        default:
          break;
      }
      document.location.href = page;
    }
  });
};

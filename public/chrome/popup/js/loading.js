// const USER_STATUS = {
//   NOT_LOGGED_IN: 0,
//   NO_MISSION: 1,
//   MISSION_NOT_STARTED: 2,
//   IN_MISSION: 3,
//   MISSION_ENDED: 4
// };

chrome.runtime.onMessage.addListener(function (request) {
  console.log(request);
  if (request.type === 'updateUserStatus') {
    switch (request.userStatus) {
      case 0:
        page = './popup_notLoggedIn.html';
        break;
      case 1:
      // fall through
      case 2:
        page = './popup_loggedIn.html';
        break;
      case 3:
        page = './popup_inMission.html';
        break;
      case 4:
        page = './popup_missionEnded.html';
        break;
    }
    document.location.href = page;
  }
});

const SERVER_BASE_URL = 'http://localhost:5000';
const USER_STATUS = {
  NOT_LOGGED_IN: 0,
  NO_MISSION: 1,
  IN_MISSION: 2,
  MISSION_COMPLETE: 3
};

// Establish webSocket to server, and start to detect tabs for limitedWebsites each second
async function startMission() {

}

async function fetchUserData() {
  try {
    var promise = await fetch(`${SERVER_BASE_URL}/me`, {
      credentials: 'include'
    });
    var result = await promise.json();
    if (result.error) {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw 'Server is down';
  }
  return result;
}

async function updateUserStatus() {
  const userData = await fetchUserData();
  console.log('updateUserStatus(): userData: ', userData);
  if (!userData) {
    // User is not logged in
    // warning: setPopup is asynchronous,
    // can provide cb as second argument
    console.log('User is not logged in, set popup_notLoggedIn.html');
    chrome.browserAction.setPopup({
      popup: './chrome/popup/popup_notLoggedIn.html'
    });
    return USER_STATUS.NOT_LOGGED_IN;

  } else if (userData.mission) {
    // User is in a mission, or the mission is over
    console.log('User is in a mission');
    chrome.browserAction.setPopup({
      popup: './chrome/popup/popup_inMission.html'
    });
    // Start mission
    startMission();
    return USER_STATUS.IN_MISSION;

  } else {
    // User is logged in but not in a mission
    console.log('User is logged in but not in a mission, set popup_loggedIn.html');
    chrome.browserAction.setPopup({
      popup: './chrome/popup/popup_loggedIn.html'
    });
    return USER_STATUS.NO_MISSION;
  }
}

(async function () {
  console.log('background page loaded');

  // listen for login and logout
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
      // console.log('tab changed, url: ' + tab.url);
      // redirect when login succeed
      if (tab.url.includes(`${SERVER_BASE_URL}/login_success`)) {
        updateUserStatus();
        chrome.tabs.update(tabId, {
          url: chrome.extension.getURL('index.html')
        });
      }
      // close logout logout and current open extension pages
      if (tab.url.includes(`${SERVER_BASE_URL}/logout`)) {
        updateUserStatus();
        chrome.tabs.query(
          { url: `chrome-extension://${chrome.runtime.id}/*` },
          tabs => {
            tabs.forEach(tab => {
              chrome.tabs.remove(tab.id);
            });
          }
        );
      }
    }

    // listen for mission starting
    /* { type: 'startMission', ... } */
    chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
      // console.log(sender.tab ?
      //   "from a content script:" + sender.tab.url :
      //   "from the extension");
      // if (request.greeting == "hello")
      //   sendResponse({ farewell: "goodbye" });
      switch (request.type) {
        case 'startMission':
          if (await updateUserStatus() !== USER_STATUS.IN_MISSION) {
            console.error('MissionPage request start mission, but mission has not started');
          }
          break;

        default:
          console.log(`Unknown request type: ${request.type}`);
      }
    })
  });

  // determine what popup page should show
  updateUserStatus();
})();

const SERVER_BASE_URL = 'http://localhost:5000';
const USER_STATUS = {
  NOT_LOGGED_IN: 0,
  NO_MISSION: 1,
  IN_MISSION: 2,
  MISSION_ENDED: 3
};

class WebsiteMonitor {
  constructor() {
    this.socket;
    this.intervalId;
    this.userId;
    this.limitedWebsites;
  }

  start(userId, limitedWebsites) {
    this.userId = userId;
    this.limitedWebsites = limitedWebsites;
    this.socket = io(SERVER_BASE_URL);
    this.createEvents();
  }

  stop() {
    if (this.socket && this.intervalId) {
      this.socket.disconnect();
      clearInterval(this.intervalId);
    }
  }

  createEvents() {
    const monitor = this;
    monitor.socket.on('connect', () => {
      console.log('socket.io on connect');
      monitor.socket.emit('clientInit', {
        userId: this.userId,
        currentTime: new Date()
      });
    });

    monitor.socket.on('serverInit', () => {
      console.log('on serverInit');
      // start checking limited websites every second
      monitor.intervalId = setInterval(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (
          tabs
        ) {
          const currentTime = new Date();
          var usingLimitedWebsite = false;
          if (tabs[0]) {
            const url = getHostname(tabs[0].url);
            for (var w of monitor.limitedWebsites) {
              if (url.includes(w)) {
                usingLimitedWebsite = true;
                break;
              }
            }
          }
          const data = {
            currentTime,
            usingLimitedWebsite
          };
          console.log('emit clientUpdate: ', data);
          monitor.socket.emit('clientUpdate', data);
        });
      }, 1000);
    });

    monitor.socket.on('serverUpdate', data => {});

    monitor.socket.on('missionEnded', () => {});

    monitor.socket.on('disconnect', () => {
      console.log('server disconnected');
      monitor.stop();
    });
  }
}

function getLimitedWebsites(userData) {
  const participants = userData.mission.participants;
  const me =
    participants[0]._user === userData._id ? participants[0] : participants[1];
  return me.limitedWebsites;
}

function getHostname(url) {
  url = url.replace(/\/$/, '');
  return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '');
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
  } else if (userData.mission && userData.mission.startTime) {
    // mission is over
    if (userData.mission.ended) {
      console.log('Mission is ended!!!');
      chrome.browserAction.setPopup({
        popup: './chrome/popup/popup_missionEnded.html'
      });
      return USER_STATUS.MISSION_ENDED;
    }
    // in a mission
    else {
      console.log('User is in a mission');
      chrome.browserAction.setPopup({
        popup: './chrome/popup/popup_inMission.html'
      });
      // Start monitor
      const limitedWebsites = getLimitedWebsites(userData);
      websiteMonitor.start(userData._id, limitedWebsites);

      return USER_STATUS.IN_MISSION;
    }
  } else {
    // User is logged in but not in a mission or mission is not started
    console.log(
      'User is logged in but not in a mission or mission is not started, set popup_loggedIn.html'
    );
    chrome.browserAction.setPopup({
      popup: './chrome/popup/popup_loggedIn.html'
    });

    return USER_STATUS.NO_MISSION;
  }
}

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
      websiteMonitor.stop();
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
});

// listen for mission starting
/* { type: 'startMission', ... } */
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.type) {
    case 'startMission':
      console.log('receive startMission message');
      updateUserStatus().then(status => {
        if (status === USER_STATUS.IN_MISSION) {
          sendResponse({ status: 'success' });
        } else {
          const error = 'status !== IN_MISSION after updateUserStatus()';
          console.error(error);
          sendResponse({ error });
        }
      });
      break;

    default:
      console.log(`Unknown request type: ${request.type}`);
  }
  // to keep message channel open during asynchronous operation
  return true;
});

console.log('background page loaded');
var websiteMonitor = new WebsiteMonitor();
updateUserStatus();

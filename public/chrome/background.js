// const SERVER_BASE_URL = 'http://localhost:5000';
const SERVER_BASE_URL = 'https://intervention-backend.herokuapp.com';
const USER_STATUS = {
  NOT_LOGGED_IN: 0,
  NO_MISSION: 1,
  MISSION_NOT_STARTED: 2,
  IN_MISSION: 3,
  MISSION_ENDED: 4
};

class WebsiteMonitor {
  constructor() {
    this.socket;
    this.intervalId;
    this.popupPort;
    this.userData;
    this.userIndex;
    this.limitedWebsites;
  }

  start(userData, callback) {
    this.userData = userData;
    this.userIndex = getUserIndex(userData);
    this.limitedWebsites =
      userData.mission.participants[this.userIndex].limitedWebsites;
    this.socket = io(SERVER_BASE_URL);
    this.createEvents(callback);
  }

  pause() {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }

  stop() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = undefined;
      clearInterval(this.intervalId);
      this.intervalId = undefined;
      this.popupPort = undefined;
    }
  }

  createEvents(callback) {
    const monitor = this;
    monitor.socket.on('connect', () => {
      console.log('socket.io on connect');
      monitor.socket.emit('clientInit', {
        userId: monitor.userData._id,
        currentTime: new Date()
      });

      chrome.runtime.onConnect.addListener(port => {
        console.assert(port.name === 'getMissionStatus');
        port.onDisconnect.addListener(function () {
          monitor.popupPort = undefined;
        });
        monitor.popupPort = port;
        console.log('inMission.js port connect, monitor.popupPort: ', port);
      });

      // set popup_inMission.html after background start listening for connection
      if (callback) {
        callback();
      }
    });

    monitor.socket.on('serverInit', () => {
      console.log('on serverInit');
      // start checking limited websites every second
      if (!monitor.intervalId) {
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
      }
    });

    monitor.socket.on('serverUpdate', mission => {
      console.log('on serverUpdate');
      console.log(mission);
      console.log('monitor.popupPort: ', monitor.popupPort);
      if (monitor.popupPort) {
        monitor.popupPort.postMessage({
          name: mission.name,
          days: mission.days,
          startTime: mission.startTime,
          me: mission.participants[monitor.userIndex],
          friend: mission.participants[(monitor.userIndex + 1) % 2]
        });
      }
    });

    monitor.socket.on('missionEnded', async () => {
      console.log('on mission ended');
      var port = monitor.popupPort;
      monitor.stop(); // will set monitor.popupPort to undefined
      await updateUserStatus();
      if (port) {
        port.postMessage({ ended: true });
      }
    });

    monitor.socket.on('disconnect', () => {
      console.log('socket disconnected, pausing website monitor');
      monitor.pause();
    });
  }
}

function getLimitedWebsites(userData) {
  const participants = userData.mission.participants;
  const me =
    participants[0]._user === userData._id ? participants[0] : participants[1];
  return me.limitedWebsites;
}

function getUserIndex(userData) {
  const participants = userData.mission.participants;
  return participants[0]._user === userData._id ? 0 : 1;
}

function getHostname(url) {
  url = url.replace(/\/$/, '');
  return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '');
}

function setPopupAndNotify(popup, userStatus) {
  chrome.browserAction.setPopup({ popup }, () => {
    // tell loading.js to change page if it's still loading
    chrome.runtime.sendMessage({ type: 'updateUserStatus', userStatus });
  });
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
  var userData;
  try {
    userData = await fetchUserData();
  } catch (error) {
    setTimeout(updateUserStatus, 3000); // might becuase internet not connected, try again later
    return;
  }
  console.log('updateUserStatus(): userData: ', userData);

  var userStatus;
  if (!userData) {
    // User is not logged in
    console.log('User is not logged in, set popup_notLoggedIn.html');

    userStatus = USER_STATUS.NOT_LOGGED_IN;
    setPopupAndNotify('./chrome/popup/popup_notLoggedIn.html', userStatus);
  } else if (userData.mission) {
    // mission is not started yet
    if (!userData.mission.startTime) {
      console.log('mission is not started yet');

      // if user is not owner, refresh again after 5 seconds
      // in order to detect whether the owner started or not
      if (userData._id !== userData.mission.participants[0]._user) {
        setTimeout(updateUserStatus, 5000);
      }

      userStatus = USER_STATUS.MISSION_NOT_STARTED;
      setPopupAndNotify('./chrome/popup/popup_loggedIn.html', userStatus);
    }

    // mission is over
    else if (userData.mission.ended) {
      console.log('Mission is ended!!!');
      // listen to missionEnded.js response, and then send it userData
      chrome.runtime.onMessage.addListener(function (
        request,
        sender,
        sendResponse
      ) {
        if (request.type === 'getMissionEndedData') {
          sendResponse(userData);
        }
      });

      userStatus = USER_STATUS.MISSION_ENDED;
      setPopupAndNotify('./chrome/popup/popup_missionEnded.html', userStatus);
    }
    // in a mission
    else {
      console.log('User is in a mission');

      userStatus = USER_STATUS.IN_MISSION;
      // set popup_inMission.html after background start listening for connection
      websiteMonitor.start(userData, () => {
        setPopupAndNotify('./chrome/popup/popup_inMission.html', userStatus);
      });
    }
  } else {
    // User is logged in but not in a mission
    console.log(
      'User is logged in but not in a mission, set popup_loggedIn.html'
    );

    userStatus = USER_STATUS.NO_MISSION;
    setPopupAndNotify('./chrome/popup/popup_loggedIn.html', userStatus);
  }

  return userStatus;
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
      chrome.tabs.remove(tabId);
    }
  }
});

// React side would call this to sync states between React and background
chrome.runtime.onMessage.addListener(function (request) {
  if (request.type === 'refreshUserStatus') {
    updateUserStatus().then(status => {
      console.log(
        `refreshUserStatus: new status = ${Object.keys(USER_STATUS)[status]}`
      );
    });
  }
});

// when computer is locked, stop websiteMonitor
chrome.idle.onStateChanged.addListener(function (newState) {
  console.log('idle.onStateChanged: ', newState);
  if (newState === 'locked') {
    websiteMonitor.stop();
  } else if (newState === 'active') {
    updateUserStatus();
  }
});

console.log('background page loaded');
var websiteMonitor = new WebsiteMonitor();
updateUserStatus();

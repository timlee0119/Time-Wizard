const SERVER_BASE_URL = 'http://localhost:5000';

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
    chrome.browserAction.setPopup({
      popup: './chrome/popup/popup_notLoggedIn.html'
    });
  } else if (userData.currentMissionId) {
    // User is in a mission, or the mission is over
  } else {
    // User is logged in but not in a mission
    chrome.browserAction.setPopup({
      popup: './chrome/popup/popup_loggedIn.html'
    });
  }
}

(async function () {
  console.log('background page loaded');

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
      console.log('tab changed, url: ' + tab.url);
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
  });

  // determine what popup page should show
  updateUserStatus();
})();

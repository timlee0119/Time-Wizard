const SERVER_BASE_URL = 'http://localhost:5000';

async function getUserData() {
  try {
    var promise = await fetch(`${SERVER_BASE_URL}/me`, {
      credentials: 'include'
    });
  } catch (error) {
    throw 'Server is down';
  }
  try {
    var result = await promise.json();
  } catch (error) {
    console.log('User is not logged in');
    return null;
  }
  return result;
}

async function updatePopupPage() {
  const userData = await getUserData();
  console.log('updatePopupPage(): userData: ', userData);
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
      console.log(`${SERVER_BASE_URL}/login_success`);
      if (tab.url.includes(`${SERVER_BASE_URL}/login_success`)) {
        updatePopupPage();
        chrome.tabs.remove(tabId);
      }
    }
  });

  // determine what popup page should show
  updatePopupPage();
})();

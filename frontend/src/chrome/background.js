const getUserData = async () => {
  try {
    var promise = await fetch('http://localhost:5000/me', {
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
};

(async function () {
  // chrome.browserAction.onClicked.addListener(function (activeTab) {
  //   chrome.tabs.create({ url: chrome.extension.getURL('index.html') });
  // });
  console.log('background page loaded');

  // check if user is logged in to determine what popup page should show
  const userData = await getUserData();
  console.log(userData);
})();

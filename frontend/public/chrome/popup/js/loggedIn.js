window.onload = function () {
  document
    .querySelector('#btn-to-homepage')
    .addEventListener('click', function () {
      chrome.tabs.create({ url: chrome.extension.getURL('index.html') });
    });
};

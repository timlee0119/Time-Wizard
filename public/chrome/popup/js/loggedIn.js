// var SERVER_BASE_URL = 'http://localhost:5000';
var SERVER_BASE_URL = 'https://intervention-backend.herokuapp.com';
window.onload = function () {
  document
    .querySelector('#btn-to-homepage')
    .addEventListener('click', function () {
      chrome.tabs.create({ url: chrome.extension.getURL('index.html') });
    });
  document.querySelector('#btn-logout').addEventListener('click', function () {
    chrome.tabs.create({ url: `${SERVER_BASE_URL}/logout` });
  });
};

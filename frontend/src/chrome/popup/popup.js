console.log('popup.js loaded');
window.onload = function () {
  document
    .querySelector('#btn-to-homepage')
    .addEventListener('click', function () {
      // chrome.tabs.create({ url: chrome.extension.getURL('index.html') });
      login();
    });
};

function login() {
  // console.log('In login()');
  // var xhr = new XMLHttpRequest();
  // xhr.open('GET', 'http://localhost:5000/login/google', true);
  // xhr.responseType = 'json';
  // xhr.onload = function () {
  //   console.log(`Status: ${xhr.status}, Response: ${xhr.response}`);
  // };
  // xhr.onerror = function (e) {
  //   console.error(e);
  // };
  // xhr.send();
  chrome.tabs.create({ url: 'http://localhost:5000/login/google' });
}

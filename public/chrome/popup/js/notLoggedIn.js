window.onload = function () {
  document
    .querySelector('#btn-to-homepage')
    .addEventListener('click', function () {
      chrome.tabs.create({ url: 'http://localhost:5000/login/google' });
    });
};

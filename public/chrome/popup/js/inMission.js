var initRender = true;

function setContent(node, content) {
  document.querySelector(node).innerHTML = content;
}

function getTime(seconds) {
  var str = new Date(1000 * seconds).toISOString().substr(11, 8);
  return str.replace(/:/g, '<span>:</span>');
}

function getWebsiteIcons(websites) {
  var ret = '';
  websites.forEach(w => {
    // dangerous!! Could be XSS
    ret += `<span><img height="16" width="16" src='http://www.google.com/s2/favicons?domain=${w}'/></span>`;
  });
  return ret;
}

function renderMission(data) {
  const { name, days, ended, ...participants } = data;
  console.log('renderMission receive data: ', data);

  if (ended) {
    document.location.href = './popup_missionEnded.html';
  }

  var who = ['me', 'friend'];
  who.forEach(w => {
    var par = participants[w];
    var his = par.usageHistory;
    if (initRender) {
      setContent('#mission_name', name);
      setContent(`#name_${w}`, par.name);
      setContent(`#limitTime_${w}`, getTime(par.limitTime));
      setContent(`#limitedWebsites_${w}`, getWebsiteIcons(par.limitedWebsites));
      setContent(`#totalDays_${w}`, days);
      document.querySelector('#content').style.display = 'block';
      document.querySelector('#loading').style.display = 'none';
    }
    setContent(`#todayUsage_${w}`, getTime(his[his.length - 1]));
    setContent(`#successDay_${w}`, par.successDay);
    setContent(`#bonus_${w}`, par.bonus);
  });

  initRender = false;
}

window.onload = function () {
  var port = chrome.runtime.connect({ name: 'getMissionStatus' });
  port.onMessage.addListener(renderMission);
};

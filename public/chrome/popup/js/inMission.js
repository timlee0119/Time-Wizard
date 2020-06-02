var initRender = true;

function onCollapseClick(more, collapsible, grow = true) {
  return function () {
    more.style.display = grow ? 'none' : 'flex';
    collapsible.style.height = grow ? `${collapsible.scrollHeight}px` : '0';
  };
}

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
    ret += `<span title=${w}><img height="16" width="16" src='http://www.google.com/s2/favicons?domain=${w}'/></span>`;
  });
  return ret;
}

function renderMission(data) {
  const { name, days, ended, startTime, ...participants } = data;
  console.log('renderMission receive data: ', data);

  if (ended) {
    document.location.href = './popup_missionEnded.html';
  }

  var who = ['me', 'friend'];
  who.forEach((w, i) => {
    var par = participants[w];
    var his = par.usageHistory;
    if (initRender) {
      setContent('#mission_name', `進行中任務：${name}`);
      setContent(`#name_${w}`, par.name);
      setContent(`#limitTime_${w}`, getTime(par.limitTime));
      setContent(`#limitedWebsites_${w}`, getWebsiteIcons(par.limitedWebsites));
      setContent(`#totalDays_${w}`, days);
      setContent(`#refreshTime_${w}`, startTime.substr(11, 8));
      drawTrendChart(i, his, par.limitTime);
      document.querySelector('#content').style.display = 'block';
      document.querySelector('#loading').style.display = 'none';
    }
    // if today time exceeds limit time, set text color to red
    var limitTime = getTime(par.limitTime);
    var todayTime = getTime(his[his.length - 1]);
    setContent(`#todayUsage_${w}`, todayTime);
    if (todayTime >= limitTime) {
      document.querySelector(`#todayUsage_${w}`).classList.add('text-error');
    } else {
      document.querySelector(`#todayUsage_${w}`).classList.remove('text-error');
    }
    setContent(`#successDay_${w}`, par.successDay);
    setContent(`#bonus_${w}`, `+ ${par.bonus}`);
  });

  initRender = false;
}

window.onload = function () {
  // receive data from background
  var port = chrome.runtime.connect({ name: 'getMissionStatus' });
  port.onMessage.addListener(renderMission);
  // for collapse buttons
  var moreBtns = document.querySelectorAll('.btn-more_info');
  var lessBtns = document.querySelectorAll('.btn-less_info');
  var collapsibles = document.querySelectorAll('.collapsible');
  for (var i = 0; i < moreBtns.length; ++i) {
    moreBtns[i].addEventListener(
      'click',
      onCollapseClick(moreBtns[i], collapsibles[i])
    );
    lessBtns[i].addEventListener(
      'click',
      onCollapseClick(moreBtns[i], collapsibles[i], false)
    );
  }
  // for chart buttons
  var leftBtns = document.querySelectorAll('btn-chart_left');
  var rightBtns = document.querySelectorAll('btn-chart_right');
  for (var i = 0; i < leftBtns.length; ++i) {
    leftBtns[i].addEventListener('click', onChartClick(i, 'left'));
    rightBtns[i].addEventListener('click', onChartClick(i, 'right'));
  }
};

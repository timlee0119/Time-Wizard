var _charts = [undefined, undefined];
var _chartsPage = [0, 0];
var _histories = [undefined, undefined];
var _colors = ['#54A3E6', '#FA8F58'];

function onChartClick(i, dir) {
  console.log(i, dir);
  var maxPage = Math.floor((_histories[i].length - 1) / 7);
  var update = false;
  if (dir === 'left' && _chartsPage[i] > -maxPage) {
    _chartsPage[i]--;
    update = true;
  } else if (dir === 'right' && _chartsPage[i] < 0) {
    _chartsPage[i]++;
    update = true;
  }
  if (update) {
    var [labels, data] = getLabelsAndData(i);
    _charts[i].data.labels = labels;
    _charts[i].data.datasets[0].data = data;
    _charts[i].update();
  }
}

function getTimeString(sec) {
  var minutes = Math.floor(sec / 60);
  sec %= 60;
  if (minutes > 0) {
    return `${minutes}分` + (sec > 0 ? `${sec}秒` : '');
  } else {
    return `${sec}秒`;
  }
}

function getNdayFromNowString(n) {
  var d = new Date();
  d.setDate(d.getDate() - n);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function getLabelsAndData(i) {
  var hist = _histories[i];
  var lastIndex = hist.length - 1 + _chartsPage[i] * 7;
  var labels = [];
  var data = [];
  for (var j = Math.max(0, lastIndex - 6); j <= lastIndex; ++j) {
    // labels.push(getNdayFromNowString(hist.length - 1 - j));
    labels.push(`Day${j + 1}`);
    data.push(hist[j]);
  }

  // trick to prevent chart.js display bug
  if (labels.length < 3) {
    labels = [null, ...labels, null];
    data = [null, ...data, null];
  }

  return [labels, data];
}

function drawTrendChart(i, history, limit) {
  var ctx = document.querySelectorAll('.trend_chart')[i];
  _histories[i] = history;
  var [labels, data] = getLabelsAndData(i);
  console.log(labels, data);

  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: '使用時間',
          data,
          lineTension: 0.3,
          fill: false,
          borderColor: _colors[i],
          borderWidth: 2,
          backgroundColor: _colors[i]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: false,
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false
            },
            ticks: {
              fontSize: 10,
              fontColor: _colors[i],
              autoSkip: false,
              callback: function (value) {
                return value && value;
              }
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: 'white'
            },
            ticks: {
              display: false,
              suggestedMax:
                Math.max(...data.filter(d => d !== null), limit) + 200,
              // suggestedMin:
              //   Math.min(...data.filter(d => d !== null), limit) * 0.95,
              beginAtZero: true
              // fontSize: 10,
              // fontColor: _colors[i],
              // maxTicksLimit: 6,
              // padding: 5,
              // callback: function (value, index, values) {
              //   return getTimeString(value);
              // }
            }
          }
        ]
      },
      tooltips: {
        displayColors: false,
        callbacks: {
          label: function (tooltipItems, data) {
            return getTimeString(tooltipItems.yLabel);
          }
        }
      },
      annotation: {
        drawTime: 'afterDraw',
        events: ['click', 'mouseenter', 'mouseleave'],
        annotations: [
          {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: limit,
            borderColor: 'rgba(255,0,0,0.3)',
            borderWidth: 3,
            label: {
              enabled: false,
              fontSize: 10,
              backgroundColor: 'rgba(0,0,0,0.8)',
              content: '單日限制時數: ' + getTimeString(limit)
            },
            onMouseenter: function (e) {
              this.options.borderColor = 'rgba(255,0,0,0.8)';
              this.options.label.enabled = true;
              myChart.update();
            },
            onMouseleave: function (e) {
              this.options.borderColor = 'rgba(255,0,0,0.3)';
              this.options.label.enabled = false;
              myChart.update();
            }
          }
        ]
      }
    }
  });

  _charts[i] = myChart;
}

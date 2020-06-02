var _charts = [undefined, undefined];
var _chartsPage = [0, 0];
var _histories = [undefined, undefined];

function onChartClick(i, dir) {
  var maxPage = _histories[i].length / 7;
  var update = false;
  if (dir === 'left' && i > -maxPage) {
    _chartsPage[i]--;
    update = true;
  } else if (dir === 'right' && i < 0) {
    _chartsPage[i]++;
    update = true;
  }
  if (update) {
    var [labels, data] = getLabelData();
    _charts[i].data.labels = labels;
    _charts[i].data.datasets[0].data = data;
    _charts[i].update();
  }
}

function getNdayFromNowString(n) {
  var d = new Date();
  d.setDate(-n);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function getLabelData(i) {
  var hist = _histories[i];
  var lastIndex = hist.length - 1 - _chartsPage[i] * 7;
  var labels = [];
  var data = [];
  for (var j = Math.max(0, lastIndex - 6); j <= lastIndex; ++j) {
    labels.push(getNdayFromNowString(hist.length - 1 - j));
    data.push(hist[j]);
  }
  return [labels, data];
}

function drawTrendChart(i, history, limit) {
  console.log(i, history, limit);
  var ctx = document.querySelectorAll('.trend_chart')[i];
  _histories[i] = history;
  var [labels, data] = getLabelData(i);

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
          borderColor: 'var(--main-dark-color)',
          borderWidth: 2,
          backgroundColor: 'var(--main-dark-color)'
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
              fontColor: 'var(--main-dark-color)'
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
              fontSize: 10,
              fontColor: '#54A3E6',
              maxTicksLimit: 6,
              padding: 5,
              callback: function (value, index, values) {
                return '$' + value;
              }
            }
          }
        ]
      },
      tooltips: {
        displayColors: false
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
              content: '單日限制時數: ' + limit
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

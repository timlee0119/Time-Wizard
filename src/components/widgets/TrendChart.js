/* global Chart */
import React, { Component } from 'react';
// import * as chartjs from 'chart.js';
// import 'chartjs-plugin-annotation';

function getTimeString(sec) {
  var minutes = Math.floor(sec / 60);
  sec %= 60;
  if (minutes > 0) {
    return `${minutes}分` + (sec > 0 ? `${sec}秒` : '');
  } else {
    return `${sec}秒`;
  }
}

export default class TrendChart extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      page: 0
    };
  }

  componentDidMount() {
    const [labels, data] = this.getLabelsAndData();

    var myChart = new Chart(this.canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: '使用時間',
            data,
            lineTension: 0.3,
            fill: false,
            borderColor: '#54A3E6',
            borderWidth: 2,
            backgroundColor: '#54A3E6'
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
                fontSize: 15,
                fontColor: '#54A3E6',
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
                  Math.max(...data.filter(d => d !== null), this.props.limit) +
                  200,
                // suggestedMin:
                //   Math.min(...data.filter(d => d !== null), limit) * 0.95,
                beginAtZero: true
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
              value: this.props.limit,
              borderColor: 'rgba(255,0,0,0.3)',
              borderWidth: 3,
              label: {
                enabled: false,
                fontSize: 12,
                backgroundColor: 'rgba(0,0,0,0.8)',
                content: '單日限制時數: ' + getTimeString(this.props.limit)
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

    this.myChart = myChart;
  }

  getLabelsAndData = () => {
    var lastIndex = this.props.history.length - 1 + this.state.page * 7;
    var labels = [];
    var data = [];
    for (var j = Math.max(0, lastIndex - 6); j <= lastIndex; ++j) {
      labels.push(`Day${j + 1}`);
      data.push(this.props.history[j]);
    }

    // trick to prevent chart.js display bug
    if (labels.length < 3) {
      labels = [null, ...labels, null];
      data = [null, ...data, null];
    }

    return [labels, data];
  };

  onChangePageClick = dir => {
    var maxPage = Math.floor((this.props.history.length - 1) / 7);
    if (
      (dir === 'left' && this.state.page <= -maxPage) ||
      (dir === 'right' && this.state.page >= 0)
    ) {
      return;
    }
    this.setState(
      state => ({ page: state.page + (dir === 'left' ? -1 : 1) }),
      () => {
        var [labels, data] = this.getLabelsAndData();
        this.myChart.data.labels = labels;
        this.myChart.data.datasets[0].data = data;
        this.myChart.update();
      }
    );
  };

  render() {
    return (
      <div>
        <canvas ref={this.canvasRef} className="trend_chart" />
        <div
          onClick={() => this.onChangePageClick('left')}
          className="btn-chart_left"
        >
          <span
            style={{ fontSize: '3rem' }}
            className="material-icons text-main"
          >
            navigate_before
          </span>
        </div>
        <div
          onClick={() => this.onChangePageClick('right')}
          className="btn-chart_right"
        >
          <span
            style={{ fontSize: '3rem' }}
            className="material-icons text-main"
          >
            navigate_next
          </span>
        </div>
      </div>
    );
  }
}

$(window).on("load", function () {
  "use strict";

  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  // chart chart-leads start
  var chartColors = chartColors = {
    red: '#f37070',
    pink: '#ff445d',
    orange: '#ff8f3a',
    yellow: '#ffde16',
    lightGreen: '#24cf91',
    green: '#4ecc48',
    blue: '#5797fc',
    skyBlue: '#33d4ff',
    gray: '#cfcfcf',
    purple: '#cfcfcf'
  };
  var color = Chart.helpers.color;

  // creating center text
  Chart.pluginService.register({
    beforeDraw: function (chart) {
      var width = chart.chart.width,
        height = chart.chart.height,
        ctx = chart.chart.ctx;

      var center_text = $(ctx.canvas).data('fill');
      if (center_text) {
        var $dtTheme = localStorage.getItem('dt-theme');
        ctx.restore();
        var fontSize = (height / 114).toFixed(2);
        ctx.font = 3 + "rem Source Sans Pro";
        ctx.textBaseline = "middle";

        /*if ($dtTheme == 'dark') {
         ctx.fillStyle = "#fff";
         }*/

        var textX = Math.round((width - ctx.measureText(center_text).width) / 2),
          textY = height / 2;

        ctx.fillText(center_text, textX, textY);
        ctx.save();
      }
    }
  });

  var defaultOptions = {
    responsive: true,
    legend: {
      display: false
    },
    layout: {
      padding: 0
    },
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    }
  };

  /*  // creating chart shadow
   var draw = Chart.controllers.doughnut.prototype.draw;
   Chart.controllers.doughnut = Chart.controllers.doughnut.extend({
   draw: function () {
   draw.apply(this, arguments);
   var ctx = this.chart.chart.ctx;

   if (ctx.canvas.id == 'proposal-doughnut') {
   var _fill = ctx.fill;
   ctx.fill = function () {
   ctx.save();
   ctx.shadowColor = color(chartColors.gray).alpha(0.8).rgbString();
   ctx.shadowBlur = 20;
   ctx.shadowOffsetX = 2;
   ctx.shadowOffsetY = 2;
   _fill.apply(this, arguments);
   ctx.restore();
   }
   }
   }
   });*/

  if ($('#chart-statics').length) {
    var ctxWorkStatus = document.getElementById('chart-statics').getContext('2d');
    var optsStatics = $.extend({}, defaultOptions);
    optsStatics.scales = {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    };

    new Chart(ctxWorkStatus, {
      type: 'line',
      data: {
        labels: ["Page A", "Page B", "Page C", "Page D", "Page E", "Page F", "Page G", "Page K", "Page M", "Page R", "Page S", "Page T"],
        datasets: [{
          label: 'Work Status',
          data: [70, 85, 67, 78, 75, 85, 71, 85, 95, 107, 100, 105],
          //data: [78, 79, 67, 55, 65, 70, 75, 80, 90, 100, 110, 120],
          pointRadius: 0,
          backgroundColor: '#52c41a',
          borderWidth: 0,
          borderColor: '#52c41a',
          hoverBorderWidth: 0,
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          fill: '-1',
          elements: {
            line: {
              tension: 1
            }
          }
        },
          {
            label: 'Financial Status',
            data: [63, 65, 58, 55, 60, 70, 83, 90, 92, 90, 83, 75],
            pointRadius: 0,
            backgroundColor: color('#3f3f91').alpha(0.7).rgbString(),
            borderWidth: 0,
            //borderColor: color('#3f3f91').alpha(0.7).rgbString(),
            hoverBorderWidth: 0,
            pointBorderWidth: 0,
            pointHoverBorderWidth: 0,
          },
          {
            label: 'Financial Status',
            data: [78, 79, 67, 62, 68, 73, 75, 78, 82, 87, 93, 100],
            pointRadius: 0,
            backgroundColor: color('#ec45a0').alpha(0.8).rgbString(),
            borderWidth: 0,
            //borderColor: color('#ec45a0').alpha(0.8).rgbString(),
            hoverBorderWidth: 0,
            pointBorderWidth: 0,
            pointHoverBorderWidth: 0,
          }
        ]
      },
      options: optsStatics
    });
  }

  if ($('#chart-revenue').length) {
    var ctxWorkStatus = document.getElementById('chart-revenue').getContext('2d');
    var optsRevenue = $.extend({}, defaultOptions);
    optsRevenue.scales = {
      xAxes: [{
        gridLines: {
          display: false
        },
        display: true
      }],
      yAxes: [{
        display: false
      }]
    };

    new Chart(ctxWorkStatus, {
      type: 'line',
      data: {
        labels: ["", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", ""],
        datasets: [
          {
            label: 'Revenue',
            data: [20, 28, 34, 45, 33, 25, 30, 35, 29, 32, 26, 22],
            pointRadius: 0,
            backgroundColor: '#ffffff',
            borderWidth: 0,
            borderColor: '#ffffff',
            hoverBorderWidth: 0,
            pointBorderWidth: 0,
            pointHoverBorderWidth: 0,
          },
          {
            label: 'Revenue',
            data: [50, 43, 45, 51, 49, 46, 50, 55, 53, 48, 64, 50],
            pointRadius: 0,
            backgroundColor: '#FE9E15',
            borderWidth: 0,
            borderColor: '#FE9E15',
            hoverBorderWidth: 0,
            pointBorderWidth: 0,
            pointHoverBorderWidth: 0,
          },
          {
            label: 'Revenue',
            data: [90, 85, 90, 75, 86, 92, 75, 85, 88, 79, 101, 80],
            pointRadius: 0,
            backgroundColor: '#038FDE',
            borderWidth: 0,
            borderColor: '#038FDE',
            hoverBorderWidth: 0,
            pointBorderWidth: 0,
            pointHoverBorderWidth: 0,
          }
        ]
      },
      options: optsRevenue
    });
  }

  // Doughnut Chart
  if ($('#traffic-doughnut').length) {
    var ctxDoughnutChart = document.getElementById('traffic-doughnut').getContext('2d');
    var optsDoughnutChart = $.extend({}, defaultOptions);
    optsDoughnutChart.responsive = false;
    optsDoughnutChart.cutoutPercentage = 70;
    optsDoughnutChart.tooltips = {
      mode: 'index',
      axis: 'y'
    };

    optsDoughnutChart.scales = {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    };

    new Chart(ctxDoughnutChart, {
      type: 'doughnut',
      data: {
        labels: ['History', 'Math', 'Science', 'English'],
        datasets: [
          {
            data: [45, 35, 75, 15],
            backgroundColor: [
              '#512DA8',
              '#fa8c16',
              '#52c41a',
              '#f44336'
            ]
          }
        ]
      },
      options: optsDoughnutChart
    });
  }

  // specify chart configuration item and data
  if ($('#chart-realtime-users').length) {
    var realTimeUsersChart = echarts.init(document.getElementById('chart-realtime-users'));
    var option = {
      series: [{
        type: 'liquidFill',
        data: [{
          value: 0.6,
          itemStyle: {
            color: '#fec000'
          }
        }],
        name: 'Real Time Users',
        center: ['50%', '50%'],
        radius: '95px',
        // shape: 'container',
        outline: {
          show: false
        },
        backgroundStyle: {
          borderColor: 'transparent',
          borderWidth: 0,
          color: '#fff'
        },
        label: {
          position: ['50%', '50%'],
          formatter: function () {
            return '270';
          },
          fontSize: 26,
          color: '#212121',
          insideColor: '#212121'
        }
      }],
      tooltip: {
        show: true
      }
    };

    realTimeUsersChart.setOption(option);
  }

  if ($('#chart-users-bars').length) {
    // Support queries
    var ctxSupportQueries = document.getElementById('chart-users-bars').getContext('2d');

    var optsSupportQueries = $.extend({}, defaultOptions);
    optsSupportQueries.scales = {
      xAxes: [
        {
          display: false,
          stacked: true,
          categoryPercentage: 1.0,
          barPercentage: 0.6
        }
      ],
      yAxes: [
        {
          display: false,
          stacked: true
        }
      ]
    };

    new Chart(ctxSupportQueries, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
          label: 'Active Users',
          data: [400, 600, 800, 200, 1300, 1000, 1600, 600, 400, 700, 800, 1700],
          backgroundColor: 'rgba(0, 0, 0, 0.20)',
          hoverBackgroundColor: 'rgba(0, 0, 0, 0.5)'
        }]
      },
      options: optsSupportQueries
    });
  }

  // tickets doughnut Chart Start
  if ($('#tickets-doughnut').length) {
    var proposal_data = {
      labels: [
        "Sales",
        "Technical",
        "Account",
        "Dispute"
      ],
      datasets: [
        {
          data: [14, 12, 7, 3],
          backgroundColor: [
            color(chartColors.blue).alpha(0.8).rgbString(),
            color(chartColors.green).alpha(0.8).rgbString(),
            color(chartColors.yellow).alpha(0.8).rgbString(),
            color(chartColors.red).alpha(0.8).rgbString()
          ],
          hoverBackgroundColor: [
            color(chartColors.blue).alpha(0.8).rgbString(),
            color(chartColors.green).alpha(0.8).rgbString(),
            color(chartColors.yellow).alpha(0.8).rgbString(),
            color(chartColors.red).alpha(0.8).rgbString()
          ]
        }
      ]
    };

    new Chart(document.getElementById('tickets-doughnut'), {
      type: 'doughnut',
      data: proposal_data,
      options: {
        cutoutPercentage: 80,
        responsive: false,
        legend: {
          display: false
        }
      }
    });
  }
  // tickets doughnut Chart End
});
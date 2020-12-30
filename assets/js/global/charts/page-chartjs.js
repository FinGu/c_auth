(function ($) {
  "use strict";

  var color = Chart.helpers.color;

  // creating chart shadow
  var draw = Chart.controllers.line.prototype.draw;
  Chart.controllers.line = Chart.controllers.line.extend({
    draw: function () {
      draw.apply(this, arguments);
      var ctx = this.chart.chart.ctx;

      var showShadow = ($(ctx.canvas).data('shadow')) ? $(ctx.canvas).data('shadow') : 'no';
      var chartType = ($(ctx.canvas).data('type')) ? $(ctx.canvas).data('type') : 'area';

      if (showShadow == 'yes' && chartType == 'area') {
        var _fill = ctx.fill;
        ctx.fill = function () {
          ctx.save();
          ctx.shadowColor = color('#5c5c5c').alpha(0.5).rgbString();
          ctx.shadowBlur = 16;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          _fill.apply(this, arguments);
          ctx.restore();
        }
      } else if (showShadow == 'yes' && chartType == 'line') {
        var _stroke = ctx.stroke;
        ctx.stroke = function () {
          ctx.save();
          ctx.shadowColor = '#07C';
          ctx.shadowBlur = 10;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 4;
          _stroke.apply(this, arguments);
          ctx.restore();
        }
      }
    }
  });

  var defaultOptions = {
    responsive: true,
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        padding: 20
      }
    },
    onResize: function (chart, size) {
      if (chart.config.type == 'pie' || chart.config.type == 'doughnut' || chart.config.type == 'radar' || chart.config.type == 'polarArea') {

        if (size.height < 190) {
          chart.config.options.legend.display = false;
        } else {
          chart.config.options.legend.display = true;
        }

        chart.update();
      }
    },
    layout: {
      padding: 0
    }
  };

  // Line Chart
  var ctxLineChart = document.getElementById('cjs-linechart').getContext('2d');
  var optsLineChart = $.extend({}, defaultOptions);

  optsLineChart.tooltips = {
    mode: 'index',
    axis: 'y'
  };

  optsLineChart.legend = {
    display: false
  };

  optsLineChart.scales = {
    xAxes: [{
      display: true,
    }],
    yAxes: [{
      display: true,
      ticks: {
        suggestedMin: 2000,
        suggestedMax: 11000,
        stepSize: 2000
      }
    }]
  };

  new Chart(ctxLineChart, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      datasets: [
        {
          data: [4000, 1398, 9800, 3908, 4800, 3800, 4300, 9900, 2100],
          label: 'Series A',
          borderWidth: 2,
          fill: false,
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: '#3367d6',
          pointBackgroundColor: 'rgba(77,83,96,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        {
          data: [2400, 3000, 2000, 8750, 1890, 2390, 3490, 2500, 7600],
          label: 'Series B',
          borderWidth: 2,
          fill: false,
          backgroundColor: 'rgba(77,83,96,0.2)',
          borderColor: '#59AA2B',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        {
          data: [4900, 4600, 2635, 2212, 5321, 5113, 9600, 2356, 5622],
          label: 'Series C',
          borderWidth: 2,
          fill: false,
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: '#ffc658',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
      ]
    },
    options: optsLineChart
  });

  // Area chart
  var ctxAreaChart = document.getElementById('cjs-areachart').getContext('2d');
  var optsAreaChart = $.extend({}, defaultOptions);
  optsAreaChart.tooltips = {
    mode: 'index',
    axis: 'y'
  };

  optsAreaChart.legend = {
    display: false
  };

  optsAreaChart.scales = {
    xAxes: [{
      display: true,
    }],
    yAxes: [{
      display: true,
      ticks: {
        suggestedMin: 2000,
        suggestedMax: 11000,
        stepSize: 2000
      }
    }]
  };

  var grad = ctxAreaChart.createLinearGradient(0, 0, 230, 0);

  grad.addColorStop(0, color('#163469').alpha(0.9).rgbString());
  grad.addColorStop(1, color('#FE9E15').alpha(0.9).rgbString());

  var grad2 = ctxAreaChart.createLinearGradient(0, 0, 230, 0);

  grad2.addColorStop(0, '#fff');
  grad2.addColorStop(1, '#3367d6');

  var grad3 = ctxAreaChart.createLinearGradient(500, 0, 100, 0);

  grad3.addColorStop(0, '#fff');
  grad3.addColorStop(1, '#59AA2B');

  new Chart(ctxAreaChart, {
    type: 'line',
    data: {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [
        {
          data: [199, 5611, 3949, 4298, 1294, 4394, 576],
          label: 'Series A',
          borderWidth: 2,
          backgroundColor: grad
        },
        {
          data: [1811, 9856, 5322, 2895, 9013, 3611, 9717],
          label: 'Series B',
          borderWidth: 2,
          backgroundColor: grad2
        },
        {
          data: [6101, 5009, 1319, 8911, 4346, 8036, 6757],
          label: 'Series C',
          borderWidth: 2,
          backgroundColor: grad3
        }
      ]
    },
    options: optsAreaChart
  });

  // Bar Chart
  var ctxBarChart = document.getElementById('cjs-barchart').getContext('2d');
  var optsBarChart = $.extend({}, defaultOptions);
  optsBarChart.tooltips = {
    mode: 'index',
    axis: 'y'
  };
  optsBarChart.legend = {
    display: true
  };
  optsBarChart.scales = {
    xAxes: [{
      display: true,
      categoryPercentage: 1.0,
      barPercentage: 0.6
    }],
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left'
      }
    ]
  };

  new Chart(ctxBarChart, {
    type: 'bar',
    data: {
      labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'],
      datasets: [
        {
          data: [65, 59, 80, 81, 56, 55, 40],
          label: 'Series A',
          backgroundColor: 'rgb(54, 162, 235)'
        },
        {
          data: [28, 48, 40, 19, 86, 27, 70],
          label: 'Series B',
          backgroundColor: 'rgb(255, 205, 86)'
        }
      ]
    },
    options: optsBarChart
  });

  // Horizontal Bar Chart
  var ctxHorizontalBar = document.getElementById('cjs-horizontal-bar').getContext('2d');
  var optsHorizontalBar = $.extend({}, defaultOptions);
  optsHorizontalBar.tooltips = {
    mode: 'index',
    axis: 'y'
  };
  optsHorizontalBar.legend = {
    display: true,
    position: 'right'
  };
  optsHorizontalBar.scales = {
    xAxes: [{
      display: true,
    }],
    yAxes: [{
      display: true
    }]
  };

  new Chart(ctxHorizontalBar, {
    type: 'horizontalBar',
    data: {
      labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'],
      datasets: [
        {
          data: [65, 59, 80, 81, 56, 55, 40],
          label: 'Series A',
          backgroundColor: 'rgb(153, 102, 255)'
        },
        {
          data: [28, 48, 40, 19, 86, 27, 70],
          label: 'Series B',
          backgroundColor: 'rgb(255, 205, 86)'
        }
      ]
    },
    options: optsHorizontalBar
  });

  // Doughnut Chart Pattern
  var ctxDoughnutPattern = document.getElementById('cjs-doughnut-pattern').getContext('2d');
  var optsDoughnutPattern = $.extend({}, defaultOptions);
  optsDoughnutPattern.tooltips = {
    mode: 'index',
    axis: 'y'
  };

  optsDoughnutPattern.scales = {
    xAxes: [{
      display: false,
    }],
    yAxes: [{
      display: false
    }]
  };

  new Chart(ctxDoughnutPattern, {
    type: 'doughnut',
    data: {
      labels: ['History', 'Math', 'Science', 'Chinese', 'English', 'Geography', 'Physics'],
      datasets: [
        {
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            pattern.draw('square', '#ff6384'),
            pattern.draw('circle', '#3367d6'),
            pattern.draw('dot', '#FF901F'),
            pattern.draw('diamond', '#cc65fe'),
            pattern.draw('zigzag-horizontal', '#17becf'),
            pattern.draw('line-vertical', '#ffc658'),
            pattern.draw('triangle', '#59AA2B')
          ]
        }
      ]
    },
    options: optsDoughnutPattern
  });

  // Doughnut Chart
  var ctxDoughnutChart = document.getElementById('cjs-doughnut').getContext('2d');
  var optsDoughnutChart = $.extend({}, defaultOptions);
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
      labels: ['History', 'Math', 'Science', 'Chinese', 'English', 'Geography', 'Physics'],
      datasets: [
        {
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            '#ff6384',
            '#3367d6',
            '#FF901F',
            '#cc65fe',
            '#17becf',
            '#ffc658',
            '#59AA2B'
          ]
        }
      ]
    },
    options: optsDoughnutChart
  });

  // Radar Chart
  var ctxRadarChart = document.getElementById('cjs-radar').getContext('2d');
  var optsRadarChart = $.extend({}, defaultOptions);

  new Chart(ctxRadarChart, {
    type: 'radar',
    data: {
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      datasets: [
        {
          data: [65, 59, 90, 81, 56, 55, 40],
          label: 'Series A',
          borderColor: '#ff6384',
          pointBackgroundColor: '#ff6384',
          pointBorderColor: '#ffffff',
          pointHoverBackgroundColor: '#ffffff',
          pointHoverBorderColor: '#ff6384',
          backgroundColor: 'rgba(255, 99, 132, .5)',
          lineTension: 0.5,
          pointRadius: 10,
          pointHoverRadius: 12,
          pointStyle: 'rectRounded',
          pointHoverBorderWidth: 3
        },
        {
          data: [28, 48, 40, 19, 96, 27, 100],
          label: 'Series B',
          borderColor: '#17becf',
          pointBackgroundColor: '#17becf',
          pointBorderColor: '#ffffff',
          pointHoverBackgroundColor: '#ffffff',
          pointHoverBorderColor: '#17becf',
          backgroundColor: 'rgba(54, 162, 235, .5)',
          pointStyle: 'triangle',
          pointRadius: 10,
          pointHoverRadius: 12,
          pointHoverBorderWidth: 3
        },
        {
          data: [28, 96, 27, 100, 48, 40, 19],
          label: 'Series C',
          borderColor: '#ffc658',
          pointBackgroundColor: '#ffc658',
          pointBorderColor: '#ffffff',
          pointHoverBackgroundColor: '#ffffff',
          pointHoverBorderColor: '#ffc658',
          backgroundColor: 'rgba(255, 205, 86, .5)',
          lineTension: 0.3,
          pointStyle: 'rectRot',
          pointRadius: 10,
          pointHoverRadius: 12,
          pointHoverBorderWidth: 3
        }
      ]
    },
    options: optsRadarChart
  });

  // Pie Chart
  var ctxPieChart = document.getElementById('cjs-pie-chart').getContext('2d');
  var optsPieChart = $.extend({}, defaultOptions);

  var pieChart = new Chart(ctxPieChart, {
    type: 'pie',
    data: {
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      datasets: [
        {
          data: [65, 59, 90, 81, 56, 55, 40],
          backgroundColor: [
            'rgba(255, 99, 132, .5)',
            'rgba(255, 159, 64, .5)',
            'rgba(255, 205, 86, .5)',
            'rgba(75, 192, 192, .5)',
            'rgba(54, 162, 235, .5)',
            'rgba(153, 102, 255, .5)',
            'rgba(201, 203, 207, .6)'
          ]
        }
      ]
    },
    options: optsPieChart
  });

  // Pie Chart with Pattern
  var ctxPiePattern = document.getElementById('cjs-pie-pattern').getContext('2d');
  var optsPiePattern = $.extend({}, defaultOptions);

  new Chart(ctxPiePattern, {
    type: 'pie',
    data: {
      labels: ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'],
      datasets: [
        {
          data: [65, 59, 90, 81, 56],
          backgroundColor: [
            pattern.draw('square', '#ff6384'),
            pattern.draw('circle', '#3367d6'),
            pattern.draw('dot', '#FF901F'),
            pattern.draw('diamond', '#cc65fe'),
            pattern.draw('zigzag-horizontal', '#17becf')
          ]
        }
      ]
    },
    options: optsPiePattern
  });

  // Polar Area Chart
  var ctxPolarChart = document.getElementById('cjs-polar-chart');
  var optsPolarChart = $.extend({}, defaultOptions);
  optsPolarChart.legend = {
    display: true,
    position: 'bottom'
  };

  new Chart(ctxPolarChart, {
    type: 'polarArea',
    data: {
      labels: ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'],
      datasets: [
        {
          data: [65, 59, 90, 81, 56],
          backgroundColor: [
            'rgba(255, 99, 132, .5)',
            'rgba(255, 159, 64, .5)',
            'rgba(255, 205, 86, .5)',
            'rgba(75, 192, 192, .5)',
            'rgba(54, 162, 235, .5)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)'
          ]
        }
      ]
    },
    options: optsPolarChart
  });

  // Dynamic Chart
  var ctxDynamicChart1 = document.getElementById('cjs-dyanamic-chart1').getContext('2d');

  var optsDynamicChart1 = $.extend({}, defaultOptions);
  optsDynamicChart1.tooltips = {
    mode: 'index',
    axis: 'y'
  };

  optsDynamicChart1.legend = {
    display: false
  };

  optsDynamicChart1.scales = {
    xAxes: [{
      display: true,
    }],
    yAxes: [{
      display: true,
      ticks: {
        suggestedMin: 2000,
        suggestedMax: 11000,
        stepSize: 2000
      }
    }]
  };

  var cogsDynamicChart1 = {
    type: 'line',
    data: {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [
        {
          data: [199, 5611, 3949, 4298, 1294, 4394, 576],
          label: 'Series A',
          borderWidth: 4,
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, .5)',
          borderColor: '#3367d6'
        },
        {
          data: [1811, 9856, 5322, 2895, 9013, 3611, 9717],
          label: 'Series B',
          borderWidth: 5,
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, .5)',
          borderColor: '#59AA2B'
        },
        {
          data: [6101, 5009, 1319, 8911, 4346, 8036, 6757],
          label: 'Series C',
          borderWidth: 3,
          fill: true,
          backgroundColor: 'rgba(255, 205, 86, .5)',
          borderColor: '#ffc658'
        }
      ]
    },
    options: optsDynamicChart1
  };
  var dynamicChart1 = new Chart(ctxDynamicChart1, cogsDynamicChart1);

  var ctxDynamicChart2 = document.getElementById('cjs-dyanamic-chart2').getContext('2d');
  var optsDynamicChart2 = $.extend({}, defaultOptions);
  optsDynamicChart2.scales = {
    xAxes: [{
      display: false,
    }],
    yAxes: [{
      display: false
    }]
  };

  var cogsDynamicChart2 = {
    type: 'doughnut',
    design: 'pattern',
    data: {
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      datasets: [
        {
          data: [65, 59, 90, 81, 56, 55, 40],
          backgroundColor: [
            pattern.draw('square', '#ff6384'),
            pattern.draw('circle', '#3367d6'),
            pattern.draw('dot', '#FF901F'),
            pattern.draw('diamond', '#cc65fe'),
            pattern.draw('zigzag-horizontal', '#17becf'),
            pattern.draw('line-vertical', '#ffc658'),
            pattern.draw('triangle', '#59AA2B')
          ]
        }
      ]
    },
    options: optsDynamicChart2
  };

  var dynamicChart2 = new Chart(ctxDynamicChart2, cogsDynamicChart2);

  $('#toggle-view').on('click', function () {
    var chartColors = ['rgba(255, 99, 132, .5)', 'rgba(54, 162, 235, .5)', 'rgba(255, 205, 86, .5)'];

    if (cogsDynamicChart1.type == 'bar') {
      cogsDynamicChart1.type = 'line';

      cogsDynamicChart1.data.datasets.forEach(function (piece, i) {
        cogsDynamicChart1.data.datasets[i].backgroundColor = pattern.draw('line-vertical', chartColors[i]);
      });
    } else {
      cogsDynamicChart1.type = 'bar';

      cogsDynamicChart1.data.datasets.forEach(function (piece, i) {
        cogsDynamicChart1.data.datasets[i].backgroundColor = pattern.draw('line', chartColors[i]);
      });
    }

    if (cogsDynamicChart2.design == 'default') {
      cogsDynamicChart2.data.datasets[0].data = [65, 59, 90, 81, 56, 55, 40];
      cogsDynamicChart2.data.datasets[0].backgroundColor = [
        pattern.draw('square', '#ff6384'),
        pattern.draw('circle', '#3367d6'),
        pattern.draw('dot', '#FF901F'),
        pattern.draw('diamond', '#cc65fe'),
        pattern.draw('zigzag-horizontal', '#17becf'),
        pattern.draw('line-vertical', '#ffc658'),
        pattern.draw('triangle', '#59AA2B')
      ];

      cogsDynamicChart2.design = 'pattern';
      cogsDynamicChart2.options.cutoutPercentage = 50;
      cogsDynamicChart2.type = 'doughnut';
    } else {
      cogsDynamicChart2.data.datasets[0].data = [32, 69, 65, 36, 76, 33, 77];
      cogsDynamicChart2.data.datasets[0].backgroundColor = [
        'rgba(255, 99, 132, .5)',
        'rgba(255, 159, 64, .5)',
        'rgba(255, 205, 86, .5)',
        'rgba(75, 192, 192, .5)',
        'rgba(54, 162, 235, .5)',
        'rgba(153, 102, 255, .5)',
        'rgba(201, 203, 207, .6)'
      ];
      cogsDynamicChart2.design = 'default';
      cogsDynamicChart2.options.cutoutPercentage = 0;
      cogsDynamicChart2.type = 'pie';
    }

    dynamicChart1.update();
    dynamicChart2.update();
  });
})(jQuery);
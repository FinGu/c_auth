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

  // Active users
  var optsActiveUsers = $.extend({}, defaultOptions);
  optsActiveUsers.elements = {
    line: {
      tension: 0, // disables bezier curves
    }
  };

  var ctxActiveUsers = document.getElementById('chart-active-users').getContext('2d');
  var gradientActiveUsers = ctxActiveUsers.createLinearGradient(0, 0, 230, 0);
  gradientActiveUsers.addColorStop(0, color('#4f35ac').alpha(0.9).rgbString());
  gradientActiveUsers.addColorStop(1, color('#a140c1').alpha(0.9).rgbString());

  new Chart(ctxActiveUsers, {
    type: 'line',
    data: {
      labels: ["Page A", "Page B", "Page C", "Page D", "Page E", "Page F", "Page G"],
      datasets: [{
        label: 'Active users',
        data: [170, 525, 363, 720, 390, 860, 230],
        pointRadius: 0,
        backgroundColor: gradientActiveUsers,
        borderColor: 'transparent',
        hoverBorderColor: 'transparent',
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
      }]
    },
    options: optsActiveUsers
  });

  // Extra revenue
  var optsExtraRevenue = $.extend({}, defaultOptions);

  var ctxExtraRevenue = document.getElementById('chart-extra-revenue').getContext('2d');
  var gradientExtraRevenue = ctxExtraRevenue.createLinearGradient(0, 0, 230, 0);
  gradientExtraRevenue.addColorStop(0, color('#46cafb').alpha(0.9).rgbString());
  gradientExtraRevenue.addColorStop(1, color('#1b92fc').alpha(0.9).rgbString());

  new Chart(ctxExtraRevenue, {
    type: 'line',
    data: {
      labels: ["Page A", "Page B", "Page C", "Page D", "Page E", "Page F", "Page G"],
      datasets: [{
        label: 'Active users',
        data: [170, 525, 363, 720, 390, 860, 230],
        pointRadius: 0,
        backgroundColor: gradientExtraRevenue,
        borderColor: 'transparent',
        hoverBorderColor: 'transparent',
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
      }]
    },
    options: optsExtraRevenue
  });

  // Orders
  var optsOrders = $.extend({}, defaultOptions);
  optsOrders.elements = {
    line: {
      tension: 0, // disables bezier curves
    }
  };

  var ctxOrders = document.getElementById('chart-orders').getContext('2d');
  var gradientOrders = ctxOrders.createLinearGradient(0, 20, 0, 110);
  gradientOrders.addColorStop(0, color('#e81a24').alpha(0.9).rgbString());
  gradientOrders.addColorStop(1, color('#fc8505').alpha(0.4).rgbString());

  new Chart(ctxOrders, {
    type: 'line',
    data: {
      labels: ["Page A", "Page B", "Page C", "Page D", "Page E", "Page F", "Page G"],
      datasets: [{
        label: 'Active users',
        data: [100, 525, 363, 720, 390, 860, 230],
        pointRadius: 0,
        backgroundColor: color('#FEA931').alpha(0.3).rgbString(),
        borderColor: '#FEA931',
        borderWidth: 2,
        hoverBorderColor: '#FEA931',
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
      }]
    },
    options: optsOrders
  });

  // Traffic raise
  var optsTrafficRaise = $.extend({}, defaultOptions);
  optsTrafficRaise.elements = {
    line: {
      tension: 0, // disables bezier curves
    }
  };

  var ctxTrafficRaise = document.getElementById('chart-traffic-raise').getContext('2d');
  var gradientTrafficRaise = ctxTrafficRaise.createLinearGradient(0, 0, 230, 0);
  gradientTrafficRaise.addColorStop(0, color('#6757de').alpha(0.9).rgbString());
  gradientTrafficRaise.addColorStop(1, color('#ed8faa').alpha(0.4).rgbString());

  new Chart(ctxTrafficRaise, {
    type: 'line',
    data: {
      labels: ["Page A", "Page B", "Page C", "Page D", "Page E", "Page F", "Page G"],
      datasets: [{
        label: 'Active users',
        data: [100, 525, 363, 720, 390, 860, 230],
        fill: false,
        backgroundColor: '#fff',
        borderColor: '#0d93df',
        hoverBorderColor: '#0d93df',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#fe9e15',
        pointBorderWidth: 2,
        pointHoverBorderWidth: 2,
      }]
    },
    options: optsTrafficRaise
  });

  // Growth revenue
  var optsGrowthRevenue = $.extend({}, defaultOptions);

  var ctxGrowthRevenue = document.getElementById('chart-growth-revenue').getContext('2d');
  var gradientGrowthRevenue = ctxGrowthRevenue.createLinearGradient(0, 60, 230, 70);
  gradientGrowthRevenue.addColorStop(0, color('#4f35ac').alpha(0.9).rgbString());
  gradientGrowthRevenue.addColorStop(1, color('#a140c1').alpha(0.9).rgbString());

  new Chart(ctxGrowthRevenue, {
    type: 'line',
    data: {
      labels: ["Page A", "Page B", "Page C", "Page D"],
      datasets: [{
        label: 'Active users',
        data: [1450, 450, 1800, 800],
        pointRadius: 0,
        backgroundColor: gradientGrowthRevenue,
        borderColor: 'transparent',
        hoverBorderColor: 'transparent',
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
      }]
    },
    options: optsGrowthRevenue
  });

  // Growth traffic
  var optsGrowthTraffic = $.extend({}, defaultOptions);
  optsGrowthTraffic.elements = {
    line: {
      tension: 0, // disables bezier curves
    }
  };

  var ctxGrowthTraffic = document.getElementById('chart-growth-traffic').getContext('2d');
  var gradientGrowthTraffic = ctxGrowthTraffic.createLinearGradient(0, 80, 180, 70);
  gradientGrowthTraffic.addColorStop(0, color('#1b92fc').alpha(0.9).rgbString());
  gradientGrowthTraffic.addColorStop(1, color('#46cafb').alpha(0.9).rgbString());

  new Chart(ctxGrowthTraffic, {
    type: 'line',
    data: {
      labels: ["Page A", "Page B", "Page C", "Page D", "Page G", "Page K", "Page M", "Page R"],
      datasets: [{
        label: 'Active users',
        data: [200, 900, 750, 600, 1100, 1600, 1250, 900],
        pointRadius: 0,
        backgroundColor: gradientGrowthTraffic,
        borderColor: 'transparent',
        hoverBorderColor: 'transparent',
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
      }]
    },
    options: optsGrowthTraffic
  });

  // Less revenue
  var optsLessRevenue = $.extend({}, defaultOptions);
  var ctxLessRevenue = document.getElementById('chart-less-revenue').getContext('2d');
  var gradientLessRevenue = ctxGrowthTraffic.createLinearGradient(0, 80, 180, 70);
  gradientLessRevenue.addColorStop(0, color('#1b92fc').alpha(0.9).rgbString());
  gradientLessRevenue.addColorStop(1, color('#46cafb').alpha(0.9).rgbString());
  new Chart(ctxLessRevenue, {
    type: 'line',
    data: {
      labels: ["Page A", "Page B", "Page C", "Page D", "Page E"],
      datasets: [{
        label: 'Active users',
        data: [1330, 750, 1160, 760, 1000],
        pointRadius: 0,
        backgroundColor: gradientLessRevenue,
        borderColor: 'transparent',
        hoverBorderColor: 'transparent',
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
      }]
    },
    options: optsLessRevenue
  });

  // Line Traffic raise
  var optsTrafficRaise = $.extend({}, defaultOptions);
  optsTrafficRaise.elements = {
    line: {
      tension: 0, // disables bezier curves
    }
  };

  var ctxTrafficRaise = document.getElementById('line-traffic-raise').getContext('2d');
  var gradientTrafficRaise = ctxTrafficRaise.createLinearGradient(0, 0, 230, 0);
  gradientTrafficRaise.addColorStop(0, color('#6757de').alpha(0.9).rgbString());
  gradientTrafficRaise.addColorStop(1, color('#ed8faa').alpha(0.4).rgbString());

  new Chart(ctxTrafficRaise, {
    type: 'line',
    data: {
      labels: ["Page C", "Page D", "Page E", "Page F", "Page G"],
      datasets: [{
        label: 'Active users',
        data: [163, 620, 390, 860, 230],
        fill: false,
        backgroundColor: '#fff',
        borderColor: '#f14631',
        hoverBorderColor: '#fff',
        pointBackgroundColor: '#f14631',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverBorderWidth: 2,
      }]
    },
    options: optsTrafficRaise
  });

  // Total Income
  var ctxTotalIncome = document.getElementById('chart-total-income').getContext('2d');
  var gradientTotalIncome = ctxTotalIncome.createLinearGradient(0, 0, 180, 230);
  gradientTotalIncome.addColorStop(0.4, color('#b8345f').alpha(0.9).rgbString());
  gradientTotalIncome.addColorStop(1, color('#b8345f').alpha(0.7).rgbString());

  var optsTotalIncome = $.extend({}, defaultOptions);
  ;
  optsTotalIncome.elements = {
    line: {
      tension: 0, // disables bezier curves
    }
  };

  new Chart(ctxTotalIncome, {
    type: 'line',
    data: {
      labels: ["Page A", "Page B", "Page C", "Page D", "Page E", "Page F", "Page G", "Page M"],
      datasets: [{
        label: 'Active Users',
        data: [50, 520, 420, 320, 590, 860, 545, 230],
        pointRadius: 0,
        backgroundColor: gradientTotalIncome,
        hoverBackgroundColor: gradientTotalIncome,
        borderWidth: 0,
        borderColor: 'transparent',
        hoverBorderColor: 'transparent',
        hoverBorderWidth: 0,
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
      }]
    },
    options: optsTotalIncome
  });

  // Support queries
  var ctxSupportQueries = document.getElementById('chart-support-queries').getContext('2d');

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
        backgroundColor: '#52c41a',
        hoverBackgroundColor: '#52c41a',
      }]
    },
    options: optsSupportQueries
  });
})(jQuery);
$(window).on("load", function () {
  "use strict";

  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  // chart chart-leads start
  var chartColors = {
    red: '#f37070',
    pink: '#ff445d',
    orange: '#ff8f3a',
    yellow: '#ffde16',
    lightGreen: '#24cf91',
    green: '#4ecc48',
    blue: '#5797fc',
    skyBlue: '#33d4ff',
    gray: '#cfcfcf'
  };
  var color = Chart.helpers.color;

  // Estimation doughnut Chart Start
  if ($('#estimation-doughnut').length) {
    var estimation_data = {
      labels: [
        "Sent",
        "Approved",
        "Denied",
        "Expired"
      ],
      datasets: [
        {
          data: [21, 9, 5, 11],
          backgroundColor: [
            color(chartColors.blue).alpha(0.8).rgbString(),
            color(chartColors.lightGreen).alpha(0.8).rgbString(),
            color(chartColors.pink).alpha(0.8).rgbString(),
            color(chartColors.gray).alpha(0.8).rgbString()
          ],
          hoverBackgroundColor: [
            color(chartColors.blue).alpha(0.8).rgbString(),
            color(chartColors.lightGreen).alpha(0.8).rgbString(),
            color(chartColors.pink).alpha(0.8).rgbString(),
            color(chartColors.gray).alpha(0.8).rgbString()
          ]
        }
      ]
    };

    new Chart(document.getElementById('estimation-doughnut'), {
      type: 'doughnut',
      data: estimation_data,
      options: {
        cutoutPercentage: 90,
        responsive: false,
        legend: {
          display: false
        }
      }
    });
  }
  // Estimation doughnut Chart End

  // proposal doughnut Chart Start
  if ($('#proposal-doughnut').length) {
    var proposal_data = {
      labels: [
        "Sent",
        "Approved",
        "Denied",
        "Expired"
      ],
      datasets: [
        {
          data: [30, 9, 3, 11],
          backgroundColor: [
            color(chartColors.blue).alpha(0.8).rgbString(),
            color(chartColors.green).alpha(0.8).rgbString(),
            color(chartColors.red).alpha(0.8).rgbString(),
            color(chartColors.yellow).alpha(0.8).rgbString()
          ],
          hoverBackgroundColor: [
            color(chartColors.blue).alpha(0.8).rgbString(),
            color(chartColors.green).alpha(0.8).rgbString(),
            color(chartColors.red).alpha(0.8).rgbString(),
            color(chartColors.yellow).alpha(0.8).rgbString()
          ]
        }
      ]
    };

    new Chart(document.getElementById('proposal-doughnut'), {
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
  // proposal doughnut Chart End

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

  // Leads polarArea Chart Start
  if ($('#lead-number').length) {
    var mobileData = [200, 350, 250, 180, 290];
    var desktopData = [250, 180, 200, 350, 230];
    var currentScreen = 'mobile';
    var $leadNumber = $('#lead-number');

    var config = {
      type: 'polarArea',
      data: {
        datasets: [{
          data: mobileData,
          backgroundColor: [
            color(chartColors.red).alpha(0.8).rgbString(),
            color(chartColors.orange).alpha(0.8).rgbString(),
            color(chartColors.yellow).alpha(0.8).rgbString(),
            color(chartColors.green).alpha(0.8).rgbString(),
            color(chartColors.blue).alpha(0.8).rgbString(),
          ],
          label: 'My dataset' // for legend
        }],
        labels: [
          'IE & Edge',
          'Firefox',
          'Safari',
          'Chrome',
          'Opera'
        ]
      },
      options: {
        responsive: false,
        legend: {
          display: false
        },
        layout: {
          padding: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }
        },
        scale: {
          display: false
        }
      }
    };

    var randomScalingFactor = function () {
      return Math.round(Math.random() * 100);
    };

    var leadPolarArea = new Chart(document.getElementById('chart-leads'), config);

    $('#toggle-view').on('click', function () {
      $(this).find('i').toggleClass('icon-smart-phone icon-desktop');

      config.data.datasets.forEach(function (piece, i) {
        if (currentScreen == 'mobile') {
          currentScreen = 'desktop';
          config.data.datasets[i].data = desktopData;
          $leadNumber.text('9,365');
        } else {
          currentScreen = 'mobile';
          config.data.datasets[i].data = mobileData;
          $leadNumber.text('8,789');
        }
      });

      leadPolarArea.update();
    });
  }
  // Leads polarArea Chart end

  // AmCharts
  AmCharts.themes.light.AreasSettings.rollOverColor = "#fff";
  AmCharts.themes.light.AreasSettings.rollOverOutlineColor = "#777";

  var map = AmCharts.makeChart("overview-map", {
    "type": "map",
    "theme": "light",
    "projection": "miller",
    "imagesSettings": {
      "rollOverColor": "#089282",
      "rollOverScale": 3,
      "selectedScale": 3,
      "selectedColor": "#089282",
      "color": "#13564e"
    },
    "areasSettings": {
      "unlistedAreasColor": "#15A892"
    },
    "dataProvider": {
      "map": "continentsLow",
      "areas": [{
        "id": "africa",
        "title": "Africa",
        "pattern": {
          "url": "https://www.amcharts.com/lib/3/patterns/black/pattern2.png",
          "width": 3,
          "height": 3
        }
      }, {
        "id": "asia",
        "title": "Asia",
        "pattern": {
          "url": "https://www.amcharts.com/lib/3/patterns/black/pattern2.png",
          "width": 3,
          "height": 3
        }
      }, {
        "id": "australia",
        "title": "Australia",
        "pattern": {
          "url": "https://www.amcharts.com/lib/3/patterns/black/pattern2.png",
          "width": 3,
          "height": 3
        }
      }, {
        "id": "europe",
        "title": "Europe",
        "pattern": {
          "url": "https://www.amcharts.com/lib/3/patterns/black/pattern2.png",
          "width": 3,
          "height": 3
        }
      }, {
        "id": "north_america",
        "title": "North America",
        "pattern": {
          "url": "https://www.amcharts.com/lib/3/patterns/black/pattern2.png",
          "width": 3,
          "height": 3
        }
      }, {
        "id": "south_america",
        "title": "South America",
        "pattern": {
          "url": "https://www.amcharts.com/lib/3/patterns/black/pattern2.png",
          "width": 3,
          "height": 3
        }
      }],
      "images": [{
        "zoomLevel": 5,
        "scale": 0.5,
        "title": "Moscow",
        "latitude": 55.7558,
        "longitude": 37.6176,
        "dotColor": "yellow",
        "pulseColor": "yellow"
      }, {
        "zoomLevel": 5,
        "scale": 0.5,
        "title": "Madrid",
        "latitude": 40.4167,
        "longitude": -3.7033,
        "dotColor": "success",
        "pulseColor": "success"
      }, {
        "zoomLevel": 5,
        "scale": 0.5,
        "title": "London",
        "latitude": 51.5002,
        "longitude": -0.1262,
        "dotColor": "yellow",
        "pulseColor": "yellow"
      }, {
        "zoomLevel": 5,
        "scale": 0.5,
        "title": "Peking",
        "latitude": 39.9056,
        "longitude": 116.3958,
        "dotColor": "danger",
        "pulseColor": "danger"
      }, {
        "zoomLevel": 5,
        "scale": 0.5,
        "title": "New Delhi",
        "latitude": 28.6353,
        "longitude": 77.2250,
        "dotColor": "info",
        "pulseColor": "info"
      }, {
        "zoomLevel": 5,
        "scale": 0.5,
        "title": "Tokyo",
        "latitude": 35.6785,
        "longitude": 139.6823,
        "dotColor": "yellow",
        "pulseColor": "yellow"
      }, {
        "zoomLevel": 5,
        "scale": 0.5,
        "title": "Brasilia",
        "latitude": -15.7801,
        "longitude": -47.9292,
        "dotColor": "danger",
        "pulseColor": "danger"
      }, {
        "zoomLevel": 5,
        "scale": 0.5,
        "title": "Washington",
        "latitude": 38.8921,
        "longitude": -77.0241,
        "dotColor": "",
        "pulseColor": "primary"
      }, {
        "zoomLevel": 5,
        "scale": 0.5,
        "title": "Kinshasa",
        "latitude": -4.3369,
        "longitude": 15.3271,
        "dotColor": "info",
        "pulseColor": "info"
      }, {
        "zoomLevel": 5,
        "scale": 0.5,
        "title": "Cairo",
        "latitude": 30.0571,
        "longitude": 31.2272,
        "dotColor": "yellow",
        "pulseColor": "yellow"
      }, {
        "zoomLevel": 5,
        "scale": 0.5,
        "title": "Pretoria",
        "latitude": -25.7463,
        "longitude": 28.1876,
        "dotColor": "success",
        "pulseColor": "success"
      }]
    },
    "zoomControl": {
      "panControlEnabled": false,
      "zoomControlEnabled": false,
      "homeButtonEnabled": true
    }
  });

  map.addListener("init", function (event) {
    // get map object
    var map = event.chart;
    $(map.amLink).addClass('amcharts-link');
  });

  // add events to recalculate map position when the map is moved or zoomed
  map.addListener("positionChanged", updateCustomMarkers);

  // this function will take current images on the map and create HTML elements for them
  function updateCustomMarkers(event) {
    // get map object
    var map = event.chart;

    // go through all of the images
    for (var x in map.dataProvider.images) {
      // get MapImage object
      var image = map.dataProvider.images[x];

      // check if it has corresponding HTML element
      if ('undefined' == typeof image.externalElement)
        image.externalElement = createCustomMarker(image);

      // reposition the element accoridng to coordinates
      var xy = map.coordinatesToStageXY(image.longitude, image.latitude);
      image.externalElement.style.top = xy.y + 'px';
      image.externalElement.style.left = xy.x + 'px';
    }
  }

  // this function creates and returns a new marker element
  function createCustomMarker(image) {
    // create holder
    var holder = document.createElement('div');
    holder.className = 'map-marker';
    holder.title = image.title;
    holder.style.position = 'absolute';

    // maybe add a link to it?
    if (undefined != image.url) {
      holder.onclick = function () {
        window.location.href = image.url;
      };
      holder.className += ' map-clickable';
    }

    // create dot
    var dot = document.createElement('div');
    var dotClass = (image.dotColor) ? ' bg-' + image.dotColor : '';
    var pulseClass = (image.pulseColor) ? ' pulse-' + image.pulseColor : '';
    dot.className = 'dot-shape dot-shape-lg' + dotClass + pulseClass;
    holder.appendChild(dot);

    // append the marker to the map container
    image.chart.chartDiv.appendChild(holder);

    return holder;
  }

  // map ends here

  // tickets doughnut Chart Start
  if ($('#monthly-leads-bar').length) {
    var monthly_leads_data = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      datasets: [
        {
          label: 'Leads',
          backgroundColor: color(chartColors.pink).rgbString(),
          borderColor: color(chartColors.pink),
          hoverBorderColor: color(chartColors.pink),
          borderWidth: 0,
          data: [10, 15, 8, 13, 10, 14, 4, 13, 11, 8, 13, 4]
        }
      ]
    };

    new Chart(document.getElementById('monthly-leads-bar'), {
      type: 'bar',
      data: monthly_leads_data,
      options: {
        responsive: true,
        legend: {
          display: false
        },
        layout: {
          padding: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }
        },
        tooltips: {
          callbacks: {
            title: function (tooltipItem, data) {
              var tindex = tooltipItem[0].index;
              return months[tindex];
            }
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            display: true,
            categoryPercentage: 1.0,
            barPercentage: 0.6
          }],
          yAxes: [{
            display: false
          }]
        }
      }
    });
  }

  // tickets doughnut Chart End
  if ($('#tasks-chart').length) {
    var gaugeChart = AmCharts.makeChart("tasks-chart", {
      "type": "gauge",
      "theme": "light",
      "axes": [{
        "axisAlpha": 0,
        "tickAlpha": 0,
        "labelsEnabled": false,
        "startValue": 0,
        "endValue": 12,
        "startAngle": 0,
        "endAngle": 360,
        "bands": [{
          "color": color(chartColors.gray).alpha(0.8).rgbString(),
          "startValue": 0,
          "endValue": 12,
          "radius": "100%",
          "innerRadius": "95%"
        }, {
          "color": "#52c41a",
          "startValue": 0,
          "endValue": 8,
          "radius": "100%",
          "innerRadius": "95%",
          "balloonText": "6.5"
        }, {
          "color": color(chartColors.gray).alpha(0.8).rgbString(),
          "startValue": 0,
          "endValue": 12,
          "radius": "90%",
          "innerRadius": "85%"
        }, {
          "color": "#f44336",
          "startValue": 0,
          "endValue": 6,
          "radius": "90%",
          "innerRadius": "85%",
          "balloonText": "2.5"
        }, {
          "color": color(chartColors.gray).alpha(0.8).rgbString(),
          "startValue": 0,
          "endValue": 12,
          "radius": "80%",
          "innerRadius": "75%"
        }, {
          "color": "#fa8c16",
          "startValue": 0,
          "endValue": 3,
          "radius": "80%",
          "innerRadius": "75%",
          "balloonText": "5"
        }]
      }],
      "allLabels": [{
        "text": "23 Tasks",
        "y": "45%",
        "size": 12,
        "bold": true,
        "color": "#212121",
        "align": "center"
      }],
      "export": {
        "enabled": false
      }
    });

    gaugeChart.addListener("init", function (event) {
      // get map object
      var chart = event.chart;
      $(chart.amLink).addClass('amcharts-link').css('opacity', '0');
    });
  }
});
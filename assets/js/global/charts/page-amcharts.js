(function ($) {
  "use strict";

  // Pie Chart
  var pieChart = AmCharts.makeChart("cam-pieChart", {
    'responsive': {
      enabled: true
    },
    'type': 'pie',
    'startDuration': 0,
    'theme': 'light',
    'addClassNames': true,
    'legend': {
      'position': 'right',
      'marginRight': 100,
      'autoMargins': false
    },
    'innerRadius': '30%',
    'defs': {
      'filter': [{
        'id': 'shadow',
        'width': '200%',
        'height': '200%',
        'feOffset': {
          'result': 'offOut',
          'in': 'SourceAlpha',
          'dx': 0,
          'dy': 0
        },
        'feGaussianBlur': {
          'result': 'blurOut',
          'in': 'offOut',
          'stdDeviation': 5
        },
        'feBlend': {
          'in': 'SourceGraphic',
          'in2': 'blurOut',
          'mode': 'normal'
        }
      }]
    },
    'dataProvider': [{
      'country': 'Lithuania',
      'litres': 501.9
    }, {
      'country': 'Czech Republic',
      'litres': 301.9
    }, {
      'country': 'Ireland',
      'litres': 201.1
    }, {
      'country': 'Germany',
      'litres': 165.8
    }, {
      'country': 'Australia',
      'litres': 139.9
    }, {
      'country': 'Austria',
      'litres': 128.3
    }, {
      'country': 'UK',
      'litres': 99
    }, {
      'country': 'Belgium',
      'litres': 60
    }, {
      'country': 'The Netherlands',
      'litres': 50
    }],
    'valueField': 'litres',
    'titleField': 'country'
  });

  // Animated Pie Chart
  var animatedPieChart = AmCharts.makeChart("cam-animatedPieChart", {
    inputData: {
      '1995': [
        {'sector': 'Agriculture', 'size': 6.6},
        {'sector': 'Mining and Quarrying', 'size': 0.6},
        {'sector': 'Manufacturing', 'size': 23.2},
        {'sector': 'Electricity and Water', 'size': 2.2},
        {'sector': 'Construction', 'size': 4.5},
        {'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 14.6},
        {'sector': 'Transport and Communication', 'size': 9.3},
        {'sector': 'Finance, real estate and business services', 'size': 22.5}],
      '1996': [
        {'sector': 'Agriculture', 'size': 6.4},
        {'sector': 'Mining and Quarrying', 'size': 0.5},
        {'sector': 'Manufacturing', 'size': 22.4},
        {'sector': 'Electricity and Water', 'size': 2},
        {'sector': 'Construction', 'size': 4.2},
        {'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 14.8},
        {'sector': 'Transport and Communication', 'size': 9.7},
        {'sector': 'Finance, real estate and business services', 'size': 22}],
      '1997': [
        {'sector': 'Agriculture', 'size': 6.1},
        {'sector': 'Mining and Quarrying', 'size': 0.2},
        {'sector': 'Manufacturing', 'size': 20.9},
        {'sector': 'Electricity and Water', 'size': 1.8},
        {'sector': 'Construction', 'size': 4.2},
        {'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 13.7},
        {'sector': 'Transport and Communication', 'size': 9.4},
        {'sector': 'Finance, real estate and business services', 'size': 22.1}],
      '1998': [
        {'sector': 'Agriculture', 'size': 6.2},
        {'sector': 'Mining and Quarrying', 'size': 0.3},
        {'sector': 'Manufacturing', 'size': 21.4},
        {'sector': 'Electricity and Water', 'size': 1.9},
        {'sector': 'Construction', 'size': 4.2},
        {'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 14.5},
        {'sector': 'Transport and Communication', 'size': 10.6},
        {'sector': 'Finance, real estate and business services', 'size': 23}],
      '1999': [
        {'sector': 'Agriculture', 'size': 5.7},
        {'sector': 'Mining and Quarrying', 'size': 0.2},
        {'sector': 'Manufacturing', 'size': 20},
        {'sector': 'Electricity and Water', 'size': 1.8},
        {'sector': 'Construction', 'size': 4.4},
        {'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.2},
        {'sector': 'Transport and Communication', 'size': 10.5},
        {'sector': 'Finance, real estate and business services', 'size': 24.7}],
      '2000': [
        {'sector': 'Agriculture', 'size': 5.1},
        {'sector': 'Mining and Quarrying', 'size': 0.3},
        {'sector': 'Manufacturing', 'size': 20.4},
        {'sector': 'Electricity and Water', 'size': 1.7},
        {'sector': 'Construction', 'size': 4},
        {'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.3},
        {'sector': 'Transport and Communication', 'size': 10.7},
        {'sector': 'Finance, real estate and business services', 'size': 24.6}],
      '2001': [
        {'sector': 'Agriculture', 'size': 5.5},
        {'sector': 'Mining and Quarrying', 'size': 0.2},
        {'sector': 'Manufacturing', 'size': 20.3},
        {'sector': 'Electricity and Water', 'size': 1.6},
        {'sector': 'Construction', 'size': 3.1},
        {'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.3},
        {'sector': 'Transport and Communication', 'size': 10.7},
        {'sector': 'Finance, real estate and business services', 'size': 25.8}],
      '2002': [
        {'sector': 'Agriculture', 'size': 5.7},
        {'sector': 'Mining and Quarrying', 'size': 0.2},
        {'sector': 'Manufacturing', 'size': 20.5},
        {'sector': 'Electricity and Water', 'size': 1.6},
        {'sector': 'Construction', 'size': 3.6},
        {'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.1},
        {'sector': 'Transport and Communication', 'size': 10.7},
        {'sector': 'Finance, real estate and business services', 'size': 26}],
      '2003': [
        {'sector': 'Agriculture', 'size': 4.9},
        {'sector': 'Mining and Quarrying', 'size': 0.2},
        {'sector': 'Manufacturing', 'size': 19.4},
        {'sector': 'Electricity and Water', 'size': 1.5},
        {'sector': 'Construction', 'size': 3.3},
        {'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.2},
        {'sector': 'Transport and Communication', 'size': 11},
        {'sector': 'Finance, real estate and business services', 'size': 27.5}],
      '2004': [
        {'sector': 'Agriculture', 'size': 4.7},
        {'sector': 'Mining and Quarrying', 'size': 0.2},
        {'sector': 'Manufacturing', 'size': 18.4},
        {'sector': 'Electricity and Water', 'size': 1.4},
        {'sector': 'Construction', 'size': 3.3},
        {'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.9},
        {'sector': 'Transport and Communication', 'size': 10.6},
        {'sector': 'Finance, real estate and business services', 'size': 28.1}],
      '2005': [
        {'sector': 'Agriculture', 'size': 4.3},
        {'sector': 'Mining and Quarrying', 'size': 0.2},
        {'sector': 'Manufacturing', 'size': 18.1},
        {'sector': 'Electricity and Water', 'size': 1.4},
        {'sector': 'Construction', 'size': 3.9},
        {'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.7},
        {'sector': 'Transport and Communication', 'size': 10.6},
        {'sector': 'Finance, real estate and business services', 'size': 29.1}],
      '2006': [
        {'sector': 'Agriculture', 'size': 4},
        {'sector': 'Mining and Quarrying', 'size': 0.2},
        {'sector': 'Manufacturing', 'size': 16.5},
        {'sector': 'Electricity and Water', 'size': 1.3},
        {'sector': 'Construction', 'size': 3.7},
        {'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 14.2},
        {'sector': 'Transport and Communication', 'size': 12.1},
        {'sector': 'Finance, real estate and business services', 'size': 29.1}],
      '2007': [
        {'sector': 'Agriculture', 'size': 4.7},
        {'sector': 'Mining and Quarrying', 'size': 0.2},
        {'sector': 'Manufacturing', 'size': 16.2},
        {'sector': 'Electricity and Water', 'size': 1.2},
        {'sector': 'Construction', 'size': 4.1},
        {'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.6},
        {'sector': 'Transport and Communication', 'size': 11.2},
        {'sector': 'Finance, real estate and business services', 'size': 30.4}],
      '2008': [
        {'sector': 'Agriculture', 'size': 4.9},
        {'sector': 'Mining and Quarrying', 'size': 0.3},
        {'sector': 'Manufacturing', 'size': 17.2},
        {'sector': 'Electricity and Water', 'size': 1.4},
        {'sector': 'Construction', 'size': 5.1},
        {'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.4},
        {'sector': 'Transport and Communication', 'size': 11.1},
        {'sector': 'Finance, real estate and business services', 'size': 28.4}],
      '2009': [
        {'sector': 'Agriculture', 'size': 4.7},
        {'sector': 'Mining and Quarrying', 'size': 0.3},
        {'sector': 'Manufacturing', 'size': 16.4},
        {'sector': 'Electricity and Water', 'size': 1.9},
        {'sector': 'Construction', 'size': 4.9},
        {'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.5},
        {'sector': 'Transport and Communication', 'size': 10.9},
        {'sector': 'Finance, real estate and business services', 'size': 27.9}],
      '2010': [
        {'sector': 'Agriculture', 'size': 4.2},
        {'sector': 'Mining and Quarrying', 'size': 0.3},
        {'sector': 'Manufacturing', 'size': 16.2},
        {'sector': 'Electricity and Water', 'size': 2.2},
        {'sector': 'Construction', 'size': 4.3},
        {'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.7},
        {'sector': 'Transport and Communication', 'size': 10.2},
        {'sector': 'Finance, real estate and business services', 'size': 28.8}],
      '2011': [
        {'sector': 'Agriculture', 'size': 4.1},
        {'sector': 'Mining and Quarrying', 'size': 0.3},
        {'sector': 'Manufacturing', 'size': 14.9},
        {'sector': 'Electricity and Water', 'size': 2.3},
        {'sector': 'Construction', 'size': 5},
        {'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 17.3},
        {'sector': 'Transport and Communication', 'size': 10.2},
        {'sector': 'Finance, real estate and business services', 'size': 27.2}],
      '2012': [
        {'sector': 'Agriculture', 'size': 3.8},
        {'sector': 'Mining and Quarrying', 'size': 0.3},
        {'sector': 'Manufacturing', 'size': 14.9},
        {'sector': 'Electricity and Water', 'size': 2.6},
        {'sector': 'Construction', 'size': 5.1},
        {'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 15.8},
        {'sector': 'Transport and Communication', 'size': 10.7},
        {'sector': 'Finance, real estate and business services', 'size': 28}],
      '2013': [
        {'sector': 'Agriculture', 'size': 3.7},
        {'sector': 'Mining and Quarrying', 'size': 0.2},
        {'sector': 'Manufacturing', 'size': 14.9},
        {'sector': 'Electricity and Water', 'size': 2.7},
        {'sector': 'Construction', 'size': 5.7},
        {'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.5},
        {'sector': 'Transport and Communication', 'size': 10.5},
        {'sector': 'Finance, real estate and business services', 'size': 26.6}],
      '2014': [
        {'sector': 'Agriculture', 'size': 3.9},
        {'sector': 'Mining and Quarrying', 'size': 0.2},
        {'sector': 'Manufacturing', 'size': 14.5},
        {'sector': 'Electricity and Water', 'size': 2.7},
        {'sector': 'Construction', 'size': 5.6},
        {'sector': 'Trade (Wholesale, Retail, Motor)', 'size': 16.6},
        {'sector': 'Transport and Communication', 'size': 10.5},
        {'sector': 'Finance, real estate and business services', 'size': 26.5}]
    },
    activeYear: 1995,
    'responsive': {
      enabled: true
    },
    'type': 'pie',
    'theme': 'light',
    'dataProvider': [],
    'valueField': 'size',
    'titleField': 'sector',
    'startDuration': 0,
    'innerRadius': 50,
    'pullOutRadius': 20,
    'marginTop': 0,
    'titles': [{
      'text': 'South African Economy'
    }],
    'allLabels': [{
      'y': '45%',
      'align': 'center',
      'size': 25,
      'bold': true,
      'text': '1995',
      'color': '#555'
    }, {
      'y': '38%',
      'align': 'center',
      'size': 15,
      'text': 'Year',
      'color': '#555'
    }]
  });

  animatedPieChart.addListener("init", function (event) {
    // get map object
    var chart = event.chart;
    var currentYear = chart.activeYear;

    function getCurrentData() {
      var data = chart.inputData[currentYear];
      currentYear++;
      if (currentYear > 2014) {
        currentYear = 1995;
      }

      return data;
    }

    function loop() {
      chart.allLabels[0].text = currentYear;
      var data = getCurrentData();
      chart.animateData(data, {
        duration: 1000,
        complete: function () {
          setTimeout(loop, 3000);
        }
      });
    }

    loop();
  });

  // 3D Pie Chart
  var dddPieChart = AmCharts.makeChart("cam-dddPieChart", {
    'responsive': {
      enabled: true
    },
    'type': 'pie',
    'theme': 'light',
    'dataProvider': [{
      'country': 'Lithuania',
      'value': 260
    }, {
      'country': 'Ireland',
      'value': 201
    }, {
      'country': 'Germany',
      'value': 65
    }, {
      'country': 'Australia',
      'value': 39
    }, {
      'country': 'UK',
      'value': 19
    }, {
      'country': 'Latvia',
      'value': 10
    }],
    'valueField': 'value',
    'titleField': 'country',
    'outlineAlpha': 0.4,
    'depth3D': 15,
    'balloonText': '[[title]]<br><span style=\'font-size:14px\'><b>[[value]]</b> ([[percents]]%)</span>',
    'angle': 30
  });

  // Donut with radial gradient
  var donutChart = AmCharts.makeChart("cam-donutChart", {
    'responsive': {
      enabled: true
    },
    'type': 'pie',
    'theme': 'light',
    'innerRadius': '40%',
    'gradientRatio': [-0.4, -0.4, -0.4, -0.4, -0.4, -0.4, 0, 0.1, 0.2, 0.1, 0, -0.2, -0.5],
    'dataProvider': [{
      'country': 'Lithuania',
      'litres': 501.9
    }, {
      'country': 'Czech Republic',
      'litres': 301.9
    }, {
      'country': 'Ireland',
      'litres': 201.1
    }, {
      'country': 'Germany',
      'litres': 165.8
    }, {
      'country': 'Australia',
      'litres': 139.9
    }, {
      'country': 'Austria',
      'litres': 128.3
    }],
    'balloonText': '[[value]]',
    'valueField': 'litres',
    'titleField': 'country',
    'balloon': {
      'drop': true,
      'adjustBorderColor': false,
      'color': '#FFFFFF',
      'fontSize': 16
    }
  });

  // Solid Gauge
  var gaugeChart = AmCharts.makeChart("cam-gaugeChart", {
    'responsive': {
      enabled: true
    },
    'type': 'gauge',
    'theme': 'light',
    'axes': [{
      'axisAlpha': 0,
      'tickAlpha': 0,
      'labelsEnabled': false,
      'startValue': 0,
      'endValue': 100,
      'startAngle': 0,
      'endAngle': 270,
      'bands': [{
        'color': '#eee',
        'startValue': 0,
        'endValue': 100,
        'radius': '100%',
        'innerRadius': '85%'
      }, {
        'color': '#84b761',
        'startValue': 0,
        'endValue': 80,
        'radius': '100%',
        'innerRadius': '85%',
        'balloonText': '90%'
      }, {
        'color': '#eee',
        'startValue': 0,
        'endValue': 100,
        'radius': '80%',
        'innerRadius': '65%'
      }, {
        'color': '#fdd400',
        'startValue': 0,
        'endValue': 35,
        'radius': '80%',
        'innerRadius': '65%',
        'balloonText': '35%'
      }, {
        'color': '#eee',
        'startValue': 0,
        'endValue': 100,
        'radius': '60%',
        'innerRadius': '45%'
      }, {
        'color': '#cc4748',
        'startValue': 0,
        'endValue': 92,
        'radius': '60%',
        'innerRadius': '45%',
        'balloonText': '92%'
      }, {
        'color': '#eee',
        'startValue': 0,
        'endValue': 100,
        'radius': '40%',
        'innerRadius': '25%'
      }, {
        'color': '#67b7dc',
        'startValue': 0,
        'endValue': 68,
        'radius': '40%',
        'innerRadius': '25%',
        'balloonText': '68%'
      }]
    }],
    'allLabels': [{
      'text': 'First option',
      'x': '49%',
      'y': '5%',
      'size': 15,
      'bold': true,
      'color': '#84b761',
      'align': 'right'
    }, {
      'text': 'Second option',
      'x': '49%',
      'y': '15%',
      'size': 15,
      'bold': true,
      'color': '#fdd400',
      'align': 'right'
    }, {
      'text': 'Third option',
      'x': '49%',
      'y': '24%',
      'size': 15,
      'bold': true,
      'color': '#cc4748',
      'align': 'right'
    }, {
      'text': 'Fourth option',
      'x': '49%',
      'y': '33%',
      'size': 15,
      'bold': true,
      'color': '#67b7dc',
      'align': 'right'
    }]
  });

  // Stacked and Clustered Column Chart
  var stackedClusteredChart = AmCharts.makeChart("cam-stackedClusteredChart", {
    'type': 'serial',
    'theme': 'light',
    'responsive': {
      enabled: true
    },
    'marginRight': 0,
    'depth3D': 20,
    'angle': 30,
    'legend': {
      'align': 'center',
      'horizontalGap': 10,
      'useGraphSettings': true,
      'markerSize': 10
    },
    'dataProvider': [{
      'year': 2003,
      'europe': 2.5,
      'namerica': 2.5,
      'asia': 2.1,
      'lamerica': 1.2,
      'meast': 0.2,
      'africa': 0.1
    }, {
      'year': 2004,
      'europe': 2.6,
      'namerica': 2.7,
      'asia': 2.2,
      'lamerica': 1.3,
      'meast': 0.3,
      'africa': 0.1
    }, {
      'year': 2005,
      'europe': 2.8,
      'namerica': 2.9,
      'asia': 2.4,
      'lamerica': 1.4,
      'meast': 0.3,
      'africa': 0.1
    }],
    'valueAxes': [{
      'stackType': 'regular',
      'axisAlpha': 0,
      'gridAlpha': 0
    }],
    'graphs': [{
      'balloonText': '<b>[[title]]</b><br><span style=\'font-size:14px\'>[[category]]: <b>[[value]]</b></span>',
      'fillAlphas': 0.8,
      'labelText': '[[value]]',
      'lineAlpha': 0.3,
      'title': 'Europe',
      'type': 'column',
      'color': '#000000',
      'valueField': 'europe'
    }, {
      'balloonText': '<b>[[title]]</b><br><span style=\'font-size:14px\'>[[category]]: <b>[[value]]</b></span>',
      'fillAlphas': 0.8,
      'labelText': '[[value]]',
      'lineAlpha': 0.3,
      'title': 'North America',
      'type': 'column',
      'color': '#000000',
      'valueField': 'namerica'
    }, {
      'balloonText': '<b>[[title]]</b><br><span style=\'font-size:14px\'>[[category]]: <b>[[value]]</b></span>',
      'fillAlphas': 0.8,
      'labelText': '[[value]]',
      'lineAlpha': 0.3,
      'title': 'Asia-Pacific',
      'type': 'column',
      'newStack': true,
      'color': '#000000',
      'valueField': 'asia'
    }, {
      'balloonText': '<b>[[title]]</b><br><span style=\'font-size:14px\'>[[category]]: <b>[[value]]</b></span>',
      'fillAlphas': 0.8,
      'labelText': '[[value]]',
      'lineAlpha': 0.3,
      'title': 'Latin America',
      'type': 'column',
      'color': '#000000',
      'valueField': 'lamerica'
    }, {
      'balloonText': '<b>[[title]]</b><br><span style=\'font-size:14px\'>[[category]]: <b>[[value]]</b></span>',
      'fillAlphas': 0.8,
      'labelText': '[[value]]',
      'lineAlpha': 0.3,
      'title': 'Middle-East',
      'type': 'column',
      'color': '#000000',
      'valueField': 'meast'
    }, {
      'balloonText': '<b>[[title]]</b><br><span style=\'font-size:14px\'>[[category]]: <b>[[value]]</b></span>',
      'fillAlphas': 0.8,
      'labelText': '[[value]]',
      'lineAlpha': 0.3,
      'title': 'Africa',
      'type': 'column',
      'color': '#000000',
      'valueField': 'africa'
    }],
    'categoryField': 'year',
    'categoryAxis': {
      'gridPosition': 'start',
      'axisAlpha': 0,
      'gridAlpha': 0,
      'position': 'left'
    }
  });

  // Column With Rotated Series
  var barChart = AmCharts.makeChart("cam-barChart", {
    'type': 'serial',
    'theme': 'light',
    'responsive': {
      enabled: true
    },
    'marginRight': 0,
    'dataProvider': [{
      'country': 'USA',
      'visits': 3025,
      'color': '#FF0F00'
    }, {
      'country': 'China',
      'visits': 1882,
      'color': '#FF6600'
    }, {
      'country': 'Japan',
      'visits': 1809,
      'color': '#FF9E01'
    }, {
      'country': 'Germany',
      'visits': 1322,
      'color': '#FCD202'
    }, {
      'country': 'UK',
      'visits': 1122,
      'color': '#F8FF01'
    }, {
      'country': 'France',
      'visits': 1114,
      'color': '#B0DE09'
    }, {
      'country': 'India',
      'visits': 984,
      'color': '#04D215'
    }, {
      'country': 'Spain',
      'visits': 711,
      'color': '#0D8ECF'
    }, {
      'country': 'Netherlands',
      'visits': 665,
      'color': '#0D52D1'
    }, {
      'country': 'Russia',
      'visits': 580,
      'color': '#2A0CD0'
    }, {
      'country': 'South Korea',
      'visits': 443,
      'color': '#8A0CCF'
    }, {
      'country': 'Canada',
      'visits': 441,
      'color': '#CD0D74'
    }],
    'valueAxes': [{
      'axisAlpha': 0,
      'position': 'left',
      'title': 'Visitors from country'
    }],
    'startDuration': 1,
    'graphs': [{
      'balloonText': '<b>[[category]]: [[value]]</b>',
      'fillColorsField': 'color',
      'fillAlphas': 0.9,
      'lineAlpha': 0.2,
      'type': 'column',
      'valueField': 'visits'
    }],
    'chartCursor': {
      'categoryBalloonEnabled': false,
      'cursorAlpha': 0,
      'zoomable': false
    },
    'categoryField': 'country',
    'categoryAxis': {
      'gridPosition': 'start',
      'labelRotation': 45
    }
  });

  // 3D Cylinder Chart
  var dddCylinderChart = AmCharts.makeChart("cam-dddCylinderChart", {
    'theme': 'light',
    'type': 'serial',
    'responsive': {
      enabled: true
    },
    'startDuration': 2,
    'dataProvider': [{
      'country': 'USA',
      'visits': 4025,
      'color': '#FF0F00'
    }, {
      'country': 'China',
      'visits': 1882,
      'color': '#FF6600'
    }, {
      'country': 'Japan',
      'visits': 1809,
      'color': '#FF9E01'
    }, {
      'country': 'Germany',
      'visits': 1322,
      'color': '#FCD202'
    }, {
      'country': 'UK',
      'visits': 1122,
      'color': '#F8FF01'
    }, {
      'country': 'France',
      'visits': 1114,
      'color': '#B0DE09'
    }, {
      'country': 'India',
      'visits': 984,
      'color': '#04D215'
    }, {
      'country': 'Spain',
      'visits': 711,
      'color': '#0D8ECF'
    }, {
      'country': 'Netherlands',
      'visits': 665,
      'color': '#0D52D1'
    }, {
      'country': 'Russia',
      'visits': 580,
      'color': '#2A0CD0'
    }, {
      'country': 'South Korea',
      'visits': 443,
      'color': '#8A0CCF'
    }, {
      'country': 'Canada',
      'visits': 441,
      'color': '#CD0D74'
    }, {
      'country': 'Brazil',
      'visits': 395,
      'color': '#754DEB'
    }, {
      'country': 'Italy',
      'visits': 386,
      'color': '#DDDDDD'
    }, {
      'country': 'Taiwan',
      'visits': 338,
      'color': '#333333'
    }],
    'valueAxes': [{
      'position': 'left',
      'axisAlpha': 0,
      'gridAlpha': 0
    }],
    'graphs': [{
      'balloonText': '[[category]]: <b>[[value]]</b>',
      'colorField': 'color',
      'fillAlphas': 0.85,
      'lineAlpha': 0.1,
      'type': 'column',
      'topRadius': 1,
      'valueField': 'visits'
    }],
    'depth3D': 40,
    'angle': 30,
    'chartCursor': {
      'categoryBalloonEnabled': false,
      'cursorAlpha': 0,
      'zoomable': false
    },
    'categoryField': 'country',
    'categoryAxis': {
      'gridPosition': 'start',
      'axisAlpha': 0,
      'gridAlpha': 0
    }
  });

  // 3D Column Chart
  var dddColumnChart = AmCharts.makeChart("cam-dddColumnChart", {
    'theme': 'light',
    'type': 'serial',
    'responsive': {
      enabled: true
    },
    'startDuration': 2,
    'dataProvider': [{
      'country': 'USA',
      'visits': 4025,
      'color': '#FF0F00'
    }, {
      'country': 'China',
      'visits': 1882,
      'color': '#FF6600'
    }, {
      'country': 'Japan',
      'visits': 1809,
      'color': '#FF9E01'
    }, {
      'country': 'Germany',
      'visits': 1322,
      'color': '#FCD202'
    }, {
      'country': 'UK',
      'visits': 1122,
      'color': '#F8FF01'
    }, {
      'country': 'France',
      'visits': 1114,
      'color': '#B0DE09'
    }, {
      'country': 'India',
      'visits': 984,
      'color': '#04D215'
    }, {
      'country': 'Spain',
      'visits': 711,
      'color': '#0D8ECF'
    }, {
      'country': 'Netherlands',
      'visits': 665,
      'color': '#0D52D1'
    }, {
      'country': 'Russia',
      'visits': 580,
      'color': '#2A0CD0'
    }, {
      'country': 'South Korea',
      'visits': 443,
      'color': '#8A0CCF'
    }, {
      'country': 'Canada',
      'visits': 441,
      'color': '#CD0D74'
    }, {
      'country': 'Brazil',
      'visits': 395,
      'color': '#754DEB'
    }, {
      'country': 'Italy',
      'visits': 386,
      'color': '#DDDDDD'
    }, {
      'country': 'Australia',
      'visits': 384,
      'color': '#999999'
    }, {
      'country': 'Taiwan',
      'visits': 338,
      'color': '#333333'
    }, {
      'country': 'Poland',
      'visits': 328,
      'color': '#000000'
    }],
    'valueAxes': [{
      'position': 'left',
      'title': 'Visitors'
    }],
    'graphs': [{
      'balloonText': '[[category]]: <b>[[value]]</b>',
      'fillColorsField': 'color',
      'fillAlphas': 1,
      'lineAlpha': 0.1,
      'type': 'column',
      'valueField': 'visits'
    }],
    'depth3D': 20,
    'angle': 30,
    'chartCursor': {
      'categoryBalloonEnabled': false,
      'cursorAlpha': 0,
      'zoomable': false
    },
    'categoryField': 'country',
    'categoryAxis': {
      'gridPosition': 'start',
      'labelRotation': 90
    }
  });

  // 3D Stacked Column Chart
  var dddStackedChart = AmCharts.makeChart("cam-dddStackedChart", {
    'theme': 'light',
    'type': 'serial',
    'responsive': {
      enabled: true
    },
    'dataProvider': [{
      'country': 'USA',
      'year2004': 3.5,
      'year2005': 4.2
    }, {
      'country': 'UK',
      'year2004': 1.7,
      'year2005': 3.1
    }, {
      'country': 'Canada',
      'year2004': 2.8,
      'year2005': 2.9
    }, {
      'country': 'Japan',
      'year2004': 2.6,
      'year2005': 2.3
    }, {
      'country': 'France',
      'year2004': 1.4,
      'year2005': 2.1
    }, {
      'country': 'Brazil',
      'year2004': 2.6,
      'year2005': 4.9
    }, {
      'country': 'Russia',
      'year2004': 6.4,
      'year2005': 7.2
    }, {
      'country': 'India',
      'year2004': 8,
      'year2005': 7.1
    }, {
      'country': 'China',
      'year2004': 9.9,
      'year2005': 10.1
    }],
    'valueAxes': [{
      'stackType': '3d',
      'unit': '%',
      'position': 'left',
      'title': 'GDP growth rate',
    }],
    'startDuration': 1,
    'graphs': [{
      'balloonText': 'GDP grow in [[category]] (2004): <b>[[value]]</b>',
      'fillAlphas': 0.9,
      'lineAlpha': 0.2,
      'title': '2004',
      'type': 'column',
      'valueField': 'year2004'
    }, {
      'balloonText': 'GDP grow in [[category]] (2005): <b>[[value]]</b>',
      'fillAlphas': 0.9,
      'lineAlpha': 0.2,
      'title': '2005',
      'type': 'column',
      'valueField': 'year2005'
    }],
    'plotAreaFillAlphas': 0.1,
    'depth3D': 60,
    'angle': 30,
    'categoryField': 'country',
    'categoryAxis': {
      'gridPosition': 'start'
    }
  });

  // Smoothed Line Chart
  var lineChart = AmCharts.makeChart("cam-lineChart", {
    'type': 'serial',
    'theme': 'light',
    'marginTop': 0,
    'responsive': {
      enabled: true
    },
    'marginRight': 20,
    'dataProvider': [
      {
        'year': '1950',
        'value': -0.307
      }, {
        'year': '1951',
        'value': -0.168
      }, {
        'year': '1952',
        'value': -0.073
      }, {
        'year': '1953',
        'value': -0.027
      }, {
        'year': '1954',
        'value': -0.251
      }, {
        'year': '1955',
        'value': -0.281
      }, {
        'year': '1956',
        'value': -0.348
      }, {
        'year': '1957',
        'value': -0.074
      }, {
        'year': '1958',
        'value': -0.011
      }, {
        'year': '1959',
        'value': -0.074
      }, {
        'year': '1960',
        'value': -0.124
      }, {
        'year': '1961',
        'value': -0.024
      }, {
        'year': '1962',
        'value': -0.022
      }, {
        'year': '1963',
        'value': 0
      }, {
        'year': '1964',
        'value': -0.296
      }, {
        'year': '1965',
        'value': -0.217
      }, {
        'year': '1966',
        'value': -0.147
      }, {
        'year': '1967',
        'value': -0.15
      }, {
        'year': '1968',
        'value': -0.16
      }, {
        'year': '1969',
        'value': -0.011
      }, {
        'year': '1970',
        'value': -0.068
      }, {
        'year': '1971',
        'value': -0.19
      }, {
        'year': '1972',
        'value': -0.056
      }, {
        'year': '1973',
        'value': 0.077
      }, {
        'year': '1974',
        'value': -0.213
      }, {
        'year': '1975',
        'value': -0.17
      }, {
        'year': '1976',
        'value': -0.254
      }, {
        'year': '1977',
        'value': 0.019
      }, {
        'year': '1978',
        'value': -0.063
      }, {
        'year': '1979',
        'value': 0.05
      }, {
        'year': '1980',
        'value': 0.077
      }, {
        'year': '1981',
        'value': 0.12
      }, {
        'year': '1982',
        'value': 0.011
      }, {
        'year': '1983',
        'value': 0.177
      }, {
        'year': '1984',
        'value': -0.021
      }, {
        'year': '1985',
        'value': -0.037
      }, {
        'year': '1986',
        'value': 0.03
      }, {
        'year': '1987',
        'value': 0.179
      }, {
        'year': '1988',
        'value': 0.18
      }, {
        'year': '1989',
        'value': 0.104
      }, {
        'year': '1990',
        'value': 0.255
      }, {
        'year': '1991',
        'value': 0.21
      }, {
        'year': '1992',
        'value': 0.065
      }, {
        'year': '1993',
        'value': 0.11
      }, {
        'year': '1994',
        'value': 0.172
      }, {
        'year': '1995',
        'value': 0.269
      }, {
        'year': '1996',
        'value': 0.141
      }, {
        'year': '1997',
        'value': 0.353
      }, {
        'year': '1998',
        'value': 0.548
      }, {
        'year': '1999',
        'value': 0.298
      }, {
        'year': '2000',
        'value': 0.267
      }, {
        'year': '2001',
        'value': 0.411
      }, {
        'year': '2002',
        'value': 0.462
      }, {
        'year': '2003',
        'value': 0.47
      }, {
        'year': '2004',
        'value': 0.445
      }, {
        'year': '2005',
        'value': 0.47
      }
    ],
    'valueAxes': [{
      'axisAlpha': 0,
      'position': 'left'
    }],
    'graphs': [{
      'id': 'g1',
      'balloonText': '[[category]]<br><b><span style=\'font-size:14px;\'>[[value]]</span></b>',
      'bullet': 'round',
      'bulletSize': 8,
      'lineColor': '#d1655d',
      'lineThickness': 2,
      'negativeLineColor': '#637bb6',
      'type': 'smoothedLine',
      'valueField': 'value'
    }],
    'chartScrollbar': {
      'graph': 'g1',
      'gridAlpha': 0,
      'color': '#888888',
      'scrollbarHeight': 55,
      'backgroundAlpha': 0,
      'selectedBackgroundAlpha': 0.1,
      'selectedBackgroundColor': '#888888',
      'graphFillAlpha': 0,
      'autoGridCount': true,
      'selectedGraphFillAlpha': 0,
      'graphLineAlpha': 0.2,
      'graphLineColor': '#c2c2c2',
      'selectedGraphLineColor': '#888888',
      'selectedGraphLineAlpha': 1,
      'dragIcon': '/assets/images/amcharts/dragIconRoundBig.svg'
    },
    zoomOutButtonImage: '/assets/images/amcharts/lens.svg',
    'chartCursor': {
      'categoryBalloonDateFormat': 'YYYY',
      'cursorAlpha': 0,
      'valueLineEnabled': true,
      'valueLineBalloonEnabled': true,
      'valueLineAlpha': 0.5,
      'fullWidth': true
    },
    'dataDateFormat': 'YYYY',
    'categoryField': 'year',
    'categoryAxis': {
      'minPeriod': 'YYYY',
      'parseDates': true,
      'minorGridAlpha': 0.1,
      'minorGridEnabled': true
    }
  });
})(jQuery);
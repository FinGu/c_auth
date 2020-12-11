(function ($) {
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
        gray: '#cfcfcf'
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

    if ($('#chart-productivity').length) {
        var ctxProductivity = document.getElementById('chart-productivity').getContext('2d');
        new Chart(ctxProductivity, {
            type: 'line',
            data: {
                labels: ["Page A", "Page B", "Page C", "Page D", "Page E", "Page F", "Page G", "Page G", "Page G"],
                datasets: [{
                        label: '# of Votes',
                        data: [200, 800, 600, 1750, 1000, 1900, 1725, 1900, 1700],
                        pointRadius: 0,
                        backgroundColor: '#e3e2e2',
                        borderWidth: 0,
                        borderColor: '#e3e2e2',
                        hoverBorderWidth: 0,
                        pointBorderWidth: 0,
                        pointHoverBorderWidth: 0,
                    }]
            },
            options: defaultOptions
        });
    }

    if ($('#ct-work-status').length) {
        var ctAreaChart = new Chartist.Line('#ct-work-status', {
            labels: ["Page A", "Page B", "Page C", "Page D", "Page E", "Page F", "Page G", "Page K", "Page M", "Page R"],
            series: [
                [1900, 1800, 2500, 2200, 3600, 1400, 2200, 1300, 1880, 1750]
            ]
        }, {
            showArea: true,
            showPoint: false,
            fullWidth: true,
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 1
            }),
            chartPadding: 0,
            axisX: {
                showGrid: false,
                offset: 0,
                showLabel: false
            },
            axisY: {
                showGrid: false,
                low: 20,
                scaleMinSpace: 50,
                showLabel: false,
                offset: 0,
            }
        });

        ctAreaChart.on('created', function (data) {
            var defs = data.svg.elem('defs');
            defs.elem('linearGradient', {
                id: 'ws-gradient2',
                x1: 0,
                y1: 1,
                x2: 0,
                y2: 0
            }).elem('stop', {
                offset: 0,
                'stop-opacity': '0.5',
                'stop-color': 'rgba(255, 255, 255, 1)'
            }).parent().elem('stop', {
                offset: 1,
                'stop-opacity': '0.5',
                'stop-color': 'rgba(226, 218, 255, 1)'
            });

            defs.elem('linearGradient', {
                id: 'ws-gradient3',
                x1: 0,
                y1: 1,
                x2: 0,
                y2: 0
            }).elem('stop', {
                offset: 0.3,
                'stop-opacity': '0.4',
                'stop-color': 'rgba(255, 255, 255, 1)'
            }).parent().elem('stop', {
                offset: 1,
                'stop-opacity': '1',
                'stop-color': 'rgba(181, 164, 241, 1)'
            });
        });

        ctAreaChart.on('draw', function (data) {
            var circleRadius = 4;
            if (data.type === 'point') {

                var circle = new Chartist.Svg('circle', {
                    cx: data.x,
                    cy: data.y,
                    r: circleRadius,
                    class: 'ct-point-circle'
                });
                data.element.replace(circle);
            }
        });
    }

    if ($('#chart-active-users').length) {
        var ctxActiveUsers = document.getElementById('chart-active-users').getContext('2d');
        var gradientActiveUsers = ctxActiveUsers.createLinearGradient(0, 0, 180, 0);
        gradientActiveUsers.addColorStop(0.4, color('#ed8faa').alpha(0.9).rgbString());
        gradientActiveUsers.addColorStop(1, color('#6757de').alpha(0.9).rgbString());

        var optsActiveUsers = defaultOptions;
        optsActiveUsers.elements = {
            line: {
                tension: 0, // disables bezier curves
            }
        };

        new Chart(ctxActiveUsers, {
            type: 'line',
            data: {
                labels: ["Page A", "Page B", "Page C", "Page D", "Page E", "Page F", "Page G"],
                datasets: [{
                        label: 'Active Users',
                        data: [170, 525, 363, 720, 390, 860, 230],
                        pointRadius: 0,
                        backgroundColor: gradientActiveUsers,
                        hoverBackgroundColor: gradientActiveUsers,
                        borderWidth: 0,
                        borderColor: 'transparent',
                        hoverBorderColor: 'transparent',
                        hoverBorderWidth: 0,
                        pointBorderWidth: 0,
                        pointHoverBorderWidth: 0,
                    }]
            },
            options: optsActiveUsers
        });
    }

    // Campaign Stats
    if ($('#chart-campaign-stats').length) {
        var optsCampaignStats = defaultOptions;
        optsCampaignStats.scales = {
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

        var ctxCampaignStats = document.getElementById('chart-campaign-stats');
        new Chart(ctxCampaignStats, {
            type: 'bar',
            data: {
                labels: ["Page A", "Page B", "Page C", "Page D", "Page E", "Page F", "Page G", "Page K", "Page M"],
                datasets: [
                    {
                        label: 'Stats',
                        data: [500, 700, 900, 1600, 1200, 1000, 700, 500, 900],
                        backgroundColor: '#10316B'
                    },
                    {
                        label: 'Stats',
                        data: [600, 800, 1400, 1800, 1000, 1000, 600, 500, 800],
                        backgroundColor: '#FE9E15'
                    },
                    {
                        label: 'Stats',
                        data: [800, 1400, 2000, 1800, 1800, 1200, 1200, 700, 1400],
                        backgroundColor: '#038FDE'
                    }
                ]
            },
            options: optsCampaignStats
        });
    }

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
                    data: [45, 35, 75, 15],
                    backgroundColor: [
                        '#512DA8',
                        '#fa8c16',
                        '#52c41a',
                        '#f44336'
                    ],
                    hoverBackgroundColor: [
                        '#512DA8',
                        '#fa8c16',
                        '#52c41a',
                        '#f44336'
                    ]
                }
            ]
        };

        new Chart(document.getElementById('tickets-doughnut'), {
            type: 'doughnut',
            data: proposal_data,
            options: {
                cutoutPercentage: 70,
                responsive: false,
                legend: {
                    display: false
                }
            }
        });
    }
    // tickets doughnut Chart End

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

    if ($.isFunction($.fn.circleProgress) && $('#circle-progressbar-1').length) {
        $('#circle-progressbar-1').circleProgress({
            value: 0.52,
            size: 50,
            thickness: 10,
            lineCap: "round",
            startAngle: -Math.PI / 4 * 2,
            fill: {color: '#59c100'}
        });
    }
})(jQuery);
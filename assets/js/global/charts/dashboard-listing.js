(function ($) {
    "use strict";

    var $carousel = $(".dt-slider .owl-carousel").owlCarousel({
        items: 1
    });

    $.each(['loader-hide', 'layout-changed', 'sidebar-folded', 'sidebar-unfolded'], function (index, value) {
        $(document).on(value, function () {
            setTimeout(function () {
                $carousel.trigger('refresh.owl.carousel');
            }, 300);
        });
    });

    if ($('.ct-line-chart').length) {
        var ctLineChart = new Chartist.Line('.ct-line-chart', {
            labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
            series: [
                [78, 84, 85, 75, 55, 45, 46, 55, 65, 73, 76, 74, 68],
                [65, 72, 73, 69, 60, 50, 41, 39, 43, 55, 62, 61, 56]
            ]
        }, {
            showArea: true,
            showPoint: false,
            fullWidth: true,
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 1
            }),
            axisY: {
                showGrid: false,
                low: 0,
                scaleMinSpace: 50,
                showLabel: false,
                offset: 0,
            }
        });

        ctLineChart.on('created', function (data) {
            var defs = data.svg.elem('defs');
            defs.elem('linearGradient', {
                id: 'gradient2',
                x1: 0,
                y1: 1,
                x2: 0,
                y2: 0
            }).elem('stop', {
                offset: 0,
                'stop-opacity': '1',
                'stop-color': 'rgba(255, 255, 255, 1)'
            }).parent().elem('stop', {
                offset: 1,
                'stop-opacity': '0.8',
                'stop-color': 'rgba(226, 218, 255, 1)'
            });

            defs.elem('linearGradient', {
                id: 'gradient3',
                x1: 0,
                y1: 1,
                x2: 0,
                y2: 0
            }).elem('stop', {
                offset: 0.3,
                'stop-opacity': '1',
                'stop-color': 'rgba(255, 255, 255, 1)'
            }).parent().elem('stop', {
                offset: 1,
                'stop-opacity': '0.5',
                'stop-color': 'rgba(252, 217, 228, 1)'
            });
        });

        ctLineChart.on('draw', function (data) {
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
})(jQuery);
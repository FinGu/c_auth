(function ($) {
    "use strict";

    var calIcons = {
        time: 'icon icon-time',
        date: 'icon icon-calendar',
        up: 'icon icon-chevrolet-up',
        down: 'icon icon-chevrolet-down',
        previous: 'icon icon-chevrolet-left',
        next: 'icon icon-chevrolet-right',
        clear: 'icon icon-trash'
    };

    $('#date-time-picker-1').datetimepicker({
        format: 'L',
        icons: calIcons
    });

    $('#date-time-picker-2').datetimepicker({
        icons: calIcons
    });

    $('#date-time-picker-3').datetimepicker({
        format: 'LT',
        icons: {
            up: 'icon icon-chevrolet-up',
            down: 'icon icon-chevrolet-down'
        }
    });

    $('#date-time-picker-4').datetimepicker({
        icons: calIcons
    });

    $('#date-time-picker-5').datetimepicker({
        locale: 'ru',
        icons: calIcons
    });

    $('#date-time-picker-6').datetimepicker({
        defaultDate: "8/1/2018",
        disabledDates: [
            moment("12/25/2018"),
            new Date(2018, 8 - 1, 21),
            "8/22/2018 00:53"
        ],
        icons: calIcons
    });

    $('#date-time-picker-7').datetimepicker({
        icons: calIcons
    });

    $('#date-time-picker-8').datetimepicker({
        useCurrent: false,
        icons: calIcons
    });

    $("#date-time-picker-7").on("change.datetimepicker", function (e) {
        $('#date-time-picker-8').datetimepicker('minDate', e.date);
    });
    $("#date-time-picker-8").on("change.datetimepicker", function (e) {
        $('#date-time-picker-7').datetimepicker('maxDate', e.date);
    });

})(jQuery);
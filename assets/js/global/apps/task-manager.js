(function ($) {
    "use strict";

    //vector Map
    if ($.isFunction($.fn.datetimepicker)) {
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
            icons: calIcons,
            format: 'L'
        });
    }

})(jQuery);
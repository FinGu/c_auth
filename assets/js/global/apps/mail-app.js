(function ($) {
    "use strict";
    var mailApp = {
        toggleMailHandle: $('[data-toggle=mail]'),
        mailRef: null,
        composeBox: $('.compose-mail-box'),
        composeOpenHandle: $('[data-open=compose]'),
        composeCloseHandle: $('[data-dismiss=compose]'),
        toggleMinimizeHandle: $('[data-toggle=minimize]'),
        init: function () {
            this.initComposeBox();
            var app = this;
            app.toggleMailHandle.on('click', function (event) {
                event.preventDefault();
                app.mailRef = $(this);
                app.toggleMail();
            });
        },
        toggleMail: function () {
            if (this.mailRef.parent().hasClass('open')) {
                this.closeMail();
            } else {
                this.openMail();
            }
        },
        openMail: function () {
            this.mailRef.parent().addClass('open').find('.dt-module__list-item-content p').removeClass('text-truncate');
        },
        closeMail: function () {
            this.mailRef.parent().removeClass('open').find('.dt-module__list-item-content p').addClass('text-truncate');
        },
        initComposeBox: function () {
            var app = this;
            app.closeComposeBox();
            app.composeOpenHandle.on('click', function (event) {
                event.preventDefault();
                app.openComposeBox();
            });
            app.composeCloseHandle.on('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                app.closeComposeBox();
            });
            app.toggleMinimizeHandle.on('click', function (event) {
                event.preventDefault();
                app.toggleMinimize();
            });
        },
        closeComposeBox: function () {
            this.composeBox.fadeOut();
        },
        openComposeBox: function () {
            this.composeBox.fadeIn();
            this.maximizeComposeBox();
        },
        toggleMinimize: function () {
            if (this.toggleMinimizeHandle.hasClass('minimized')) {
                this.maximizeComposeBox();
            } else {
                this.minimizeComposeBox();
            }
        },
        minimizeComposeBox: function () {
            this.composeBox.find('.compose-mail-box__body').slideUp();
            this.toggleMinimizeHandle.addClass('minimized');
            this.toggleMinimizeHandle.find('i').addClass('icon-chevrolet-up').removeClass('icon-chevrolet-down');
        },
        maximizeComposeBox: function () {
            this.composeBox.find('.compose-mail-box__body').slideDown();
            this.toggleMinimizeHandle.removeClass('minimized');
            this.toggleMinimizeHandle.find('i').addClass('icon-chevrolet-down').removeClass('icon-chevrolet-up');
        }
    }

    mailApp.init();
})(jQuery);
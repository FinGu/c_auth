(function ($) {
    "use strict";

    var mDrawer = {
        container: $('.dt-module__drawer'),
        toggleHandle: $('[data-toggle=mdrawer]'),
        switchHandle: $('[data-switch=mdrawer]'),
        activeHandle: null,
        activeSwitch: null,
        activeChildContainer: null,
        loader: null,
        dismisHandle: $('[data-dismiss=mdrawer]'),
        overlay: null,
        init: function () {
            var mdrawer = this;
            this.toggleHandle.on('click', function () {
                mdrawer.activeHandle = $(this);
                mdrawer.toggle();
            });

            this.switchHandle.on('click', function () {
                mdrawer.activeSwitch = $(this);
                mdrawer.swtichView();
            });

            this.createLoader();
        },
        swtichView: function () {
            if (this.activeChildContainer) {
                this.activeChildContainer.removeClass('show');
            }

            this.toggleLoader();
            var mdrawer = this;

            setTimeout(function () {
                mdrawer.deactiveSwitches();
                mdrawer.toggleLoader('hide');

                if (mdrawer.activeSwitch) {
                    mdrawer.activeChildContainer = $(mdrawer.activeSwitch.data('target'));
                    mdrawer.activeSwitch.parent().addClass('active');
                    mdrawer.activeChildContainer.addClass('show')
                }
            }, 500);
        },
        toggle: function () {
            if (this.container.hasClass('open')) {
                this.close();
            } else {
                this.open()
            }
        },
        open: function () {
            this.toggleLoader();
            this.container.addClass('open');
            this.insertOverlay();
            this.toggleActiveHandle();

            var mdrawer = this;
            this.dismisHandle.on('click', function () {
                mdrawer.close();
            });
        },
        close: function () {
            this.container.removeClass('open');
            this.toggleActiveHandle();
            this.overlay.remove();
        },
        insertOverlay: function () {
            this.overlay = document.createElement('div');
            this.overlay.className = 'dt-backdrop';
            this.container.after(this.overlay);

            var mdrawer = this;
            var overlayContainer = $(this.overlay);
            overlayContainer.on('click', function (event) {
                event.stopPropagation();
                mdrawer.close();
            });
        },
        deactiveToggles: function () {
            this.toggleHandle.removeClass('active');
        },
        deactiveSwitches: function () {
            this.switchHandle.parent().removeClass('active');
        },
        activeSameTargetSwitches: function () {
            if (this.activeHandle) {
                this.deactiveSwitches();
                var target = this.activeHandle.data('target');
                this.switchHandle.each(function () {
                    if ($(this).data('target') == target) {
                        $(this).parent().addClass('active');
                    }
                });
            }
        },
        toggleActiveHandle: function () {
            if (this.activeChildContainer) {
                this.activeChildContainer.removeClass('show');
            }

            if (this.activeHandle) {
                this.activeChildContainer = $(this.activeHandle.data('target'));
                var mdrawer = this;

                setTimeout(function () {
                    mdrawer.toggleLoader('hide');

                    if (mdrawer.activeHandle && mdrawer.activeHandle.hasClass('active')) {
                        mdrawer.activeChildContainer.removeClass('show');
                        mdrawer.activeHandle.removeClass('active');
                        mdrawer.activeHandle = null;
                    } else if (mdrawer.activeHandle) {
                        mdrawer.activeChildContainer.addClass('show');
                        mdrawer.activeHandle.addClass('active');
                        mdrawer.activeSameTargetSwitches();
                    }
                }, 500);
            }
        },
        createLoader: function () {
            var svgHtml = '<svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle></svg>';
            this.loader = document.createElement('div');
            this.loader.className = 'dt-loader';
            this.loader.innerHTML = svgHtml;
            this.container.find('.dt-action-content').prepend(this.loader);
        },
        toggleLoader: function (display) {
            if (this.loader) {
                if (display) {
                    if (display == 'show') {
                        $(this.loader).addClass('active');
                    } else {
                        $(this.loader).removeClass('active');
                    }
                } else {
                    $(this.loader).toggleClass('active');
                }
            }
        }
    };

    mDrawer.init();

    var $body = $('body');
    var windowOuterWidth = $body.outerWidth();

    if (windowOuterWidth > 767) {
        $('.dt-module__sidebar-content').show();
    } else {
        $('.dt-module__sidebar-content').hide();
    }

    $(window).resize(function () {
        $('[data-toggle=msidebar-content]').removeClass('active');
        windowOuterWidth = $body.outerWidth();

        if (windowOuterWidth > 767) {
            $('.dt-module__sidebar-content').show();
        } else {
            $('.dt-module__sidebar-content').hide();
        }
    });

    $('[data-toggle=msidebar-content]').on('click', function () {
        $('.dt-module__sidebar-content').toggle(400);
        $('[data-toggle=msidebar-content]').toggleClass('active');
    });

    var dtModule = {
        win: $(window),
        docBody: $('body'),
        mainHeader: $('.dt-header'),
        mainFooter: $('.dt-footer'),
        pageContent: $('.dt-content'),
        pageHeader: $('.dt-page__header'),
        appModule: $('.dt-module'),
        appModuleSidebar: $('.dt-module__sidebar'),
        appModuleCont: $('.dt-module__container'),
        appModuleHeader: $('.dt-module__header'),
        appModuleContent: $('.dt-module__content'),
        appModuleComentbox: $('.add-comment-box'),
        init: function () {
            var dtModule = this;
            setTimeout(function () {
                dtModule.calculateHeight();
            }, 200);

            this.win.resize(function () {
                setTimeout(function () {
                    dtModule.calculateHeight();
                }, 500);
            });
        },
        calculateHeight: function () {
            var w_Height = this.win.outerHeight();
            var w_Width = this.win.outerWidth();
            var bodyVerticalPadding = parseInt(this.docBody.css('padding-top')) + parseInt(this.docBody.css('padding-bottom'));

            var h_Height = this.mainHeader.outerHeight();
            var pc_Padding = parseInt(this.pageContent.css('padding-top')) + parseInt(this.pageContent.css('padding-bottom'));
            var pm_Margin = parseInt(this.appModule.css('margin-top')) + parseInt(this.appModule.css('margin-bottom'));

            var f_Height = this.mainFooter.outerHeight();

            /*if (w_Width > 767) {
             var ph_Height = this.pageHeader.outerHeight(true);
             } else {
             var ph_Height = this.pageHeader.outerHeight();
             }*/

            var ph_Height = 0;

            var th = h_Height + pc_Padding + ph_Height + f_Height + bodyVerticalPadding;
            var moduleHeight = (w_Height + Math.abs(pm_Margin)) - th;
            this.appModule.height(moduleHeight);

            var pmc_MarginTop = parseInt(this.appModuleCont.css('margin-top'));
            var pmh_Height = 0;

            if (this.appModuleHeader.length) {
                pmh_Height = this.appModuleHeader.outerHeight(true);
            }

            var commentBoxHeight = 0;

            if (this.appModuleComentbox.length > 0) {
                commentBoxHeight = this.appModuleComentbox.outerHeight();
            }

            var ms_height = 0;
            if (w_Width > 767) {
                ms_height = 0;
            } else {
                ms_height = this.appModuleSidebar.outerHeight();
            }

            this.appModuleContent.css('height', (moduleHeight - (pmc_MarginTop + pmh_Height + ms_height + commentBoxHeight + bodyVerticalPadding)) + 'px');

            // sidebar content height
            var sh_height = this.appModuleSidebar.find('.dt-module__sidebar-header').outerHeight(true);
            var sc_height = moduleHeight - sh_height;

            this.appModuleSidebar.find('.dt-module__sidebar-content').height(sc_height - bodyVerticalPadding);

            if (this.appModule.hasClass('dt-module--chat')) {
                if (w_Width > 767) {
                    var tabHeaderHeight = this.appModuleSidebar.find('.dt-module__sidebar-content > .card-header').outerHeight(true);
                } else if (w_Width <= 767 && w_Width > 575) {
                    var tabHeaderHeight = 53.8;
                } else {
                    var tabHeaderHeight = 42.5;
                }

                this.appModuleSidebar.find('.dt-module__sidebar-content .dt-contacts__container').height(sc_height - tabHeaderHeight);
            }

        }
    };

    $.each(['loader-hide', 'layout-changed', 'sidebar-folded', 'sidebar-unfolded'], function (index, value) {
        $(document).on(value, function () {
            setTimeout(function () {
                dtModule.init();
            }, 100);
        });
    });

})(jQuery);
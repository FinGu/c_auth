"use strict";

(function ($) {
    var $body = $('body');
    var $loader = $('.dt-loader-container');
    var $root = $('.dt-root');

    if ($loader.length) {
        $loader.delay(300).fadeOut('noraml', function () {
            $body.css('overflow', 'auto');
            $root.css('opacity', '1');
            $(document).trigger('loader-hide');
        });
    } else {
        $(document).trigger('loader-hide');
    }

    if ($('#main-sidebar').length) {
        var leftSideBarScroll = new PerfectScrollbar('#main-sidebar', {
            wheelPropagation: !$body.hasClass('dt-sidebar--fixed')
        });

        $(document).on('sidebar-toggle-fixed', function () {
            leftSideBarScroll.settings.wheelPropagation = !$body.hasClass('dt-sidebar--fixed');
            leftSideBarScroll.update();
        });
    }

    $('.ps-custom-scrollbar').each(function () {
        new PerfectScrollbar(this, {
            wheelPropagation: true
        });
    });

    if ($.isFunction($.fn.masonry)) {
        var $grid = $('.dt-masonry');
        $grid.masonry({
            // options
            itemSelector: '.dt-masonry__item',
            percentPosition: true
        });

        $(document).on('layout-changed', function () {
            setTimeout(function () {
                $grid.masonry('reloadItems');
                $grid.masonry({
                    // options
                    itemSelector: '.dt-masonry__item',
                    percentPosition: true
                });
            }, 500);
        });
    }

    var $current_menu = $('a[href="' + current_path + '"]');
    $current_menu.addClass('active').parents('.nav-item').find('> .nav-link').addClass('active');

    if ($current_menu.length > 0) {
        $('.dt-side-nav__item').removeClass('open');

        if ($current_menu.parents().hasClass('dt-side-nav__item')) {
            $current_menu.parents('.dt-side-nav__item').addClass('open selected');
        } else {
            $current_menu.parent().addClass('active').parents('.dt-side-nav__item').addClass('open selected');
        }
    }

    var slideDuration = 150;
    $("ul.dt-side-nav > li.dt-side-nav__item").on("click", function () {
        var menuLi = this;
        $("ul.dt-side-nav > li.dt-side-nav__item").not(menuLi).removeClass("open");
        $("ul.dt-side-nav > li.dt-side-nav__item ul").not($("ul", menuLi)).slideUp(slideDuration);
        $(" > ul", menuLi).slideToggle(slideDuration, function () {
            $(menuLi).toggleClass("open");
        });
    });

    $("ul.dt-side-nav__sub-menu li").on('click', function (e) {
        var $current_sm_li = $(this);
        var $current_sm_li_parent = $current_sm_li.parent();

        if ($current_sm_li_parent.parent().hasClass("active")) {
            $("li ul", $current_sm_li_parent).not($("ul", $current_sm_li)).slideUp(slideDuration, function () {
                $("li", $current_sm_li_parent).not($current_sm_li).removeClass("active");
            });

        } else {
            $("ul.dt-side-nav__sub-menu li ul").not($(" ul", $current_sm_li)).slideUp(slideDuration, function () {
                //$("ul.sub-menu li").not($current_sm_li).removeClass("active");console.log('has not parent');
            });
        }

        $(" > ul", $current_sm_li).slideToggle(slideDuration, function () {
            $($current_sm_li).toggleClass("active");
        });

        e.stopPropagation();
    });

    // init Drawer
    drift.init();
    dtDrawer.init();

    changeTheme($currentTheme, $currentThemeStyle, $themeStylesheet, true);
    changeLayout($currentLayout, true);
    activeFixedStyle();
    init_indecator();

    $('.dt-brand__tool, .dt-drawer-handle').on('click', function () {
        if (drift.sidebar.drawerRef.hasClass('dt-drawer')) {
            drift.sidebar.toggle();
        }

        $(this).toggleClass('active');
    });

    /* toggle-button */
    var $toggleBtn = $('.toggle-button');
    if ($toggleBtn.length > 0) {
        $toggleBtn.on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            $(this).toggleClass('active');
        });
    }

    /* Sidebar */
    var $sidebar = $('.dt-sidebar');

    $sidebar.hover(function () {
        if ($body.hasClass('dt-sidebar--folded')) {
            $body.addClass('dt-sidebar--expended');
        }
    }, function () {
        if ($body.hasClass('dt-sidebar--folded')) {
            $body.removeClass('dt-sidebar--expended');
        }
    });
    /* /Sidebar */

    /*Popover*/
    $('[data-toggle="popover"]').popover();

    /*Tooltip*/
    $('[data-toggle="tooltip"]').tooltip();

    /*Scroll Spy*/
    $('.scrollspy-horizontal').scrollspy({target: '#scrollspy-horizontal'});

    $('.scrollspy-vertical').scrollspy({target: '#scrollspy-vertical'});

    $('.scrollspy-list-group').scrollspy({target: '#scrollspy-list-group'});

    // Displaying user info card on contact hover
    var $mailContacts = $('.contacts-list .dt-contact');
    var $userInfoCard = $('.user-info-card');

    $userInfoCard.hover(function () {
        $userInfoCard.addClass('active').show();
    }, function () {
        $userInfoCard.hide().removeClass('active');
    });

    $mailContacts.each(function (index) {
        var $contact = $(this);

        $contact.hover(function (event) {
            var contactWidth = $contact.outerWidth(true);
            var positionValue = $contact.offset();
            var bodyHeight = $body.outerHeight(true);
            var bodyWidth = $body.outerWidth(true);

            if (bodyWidth > 767) {
                var userPic = $('.dt-avatar', $contact).attr('src');
                var userName = $('.dt-contact__title', $contact).text();

                if (userPic) {
                    $('.profile-placeholder', $userInfoCard).hide();
                    $('.profile-pic', $userInfoCard).attr('src', userPic).show();
                } else {
                    $('.profile-pic', $userInfoCard).hide();
                    $('.profile-placeholder', $userInfoCard).text(userName.substring(0, 2)).show();
                }

                $('.dt-avatar-name', $userInfoCard).text(userName);

                var infoCardHeight = $userInfoCard.outerHeight(true);
                var offsetTop = positionValue.top;
                if (bodyHeight < (positionValue.top + infoCardHeight + 20)) {
                    offsetTop = (bodyHeight - infoCardHeight - 20)
                }

                $userInfoCard.css({
                    top: offsetTop,
                    left: (positionValue.left + contactWidth - 15)
                }).show();
            }
        }, function (event) {
            if (!$userInfoCard.hasClass('active')) {
                $userInfoCard.hide();
            }
        });
    });

})(jQuery);
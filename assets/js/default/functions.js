"use strict";

var drift = {
    docBody: $('body'),
    customStyle: null,
    addClass: function (eleRef, eleID, className) {
        jQuery(eleRef).parents(eleID).addClass(className);
    },
    removeClass: function (eleRef, eleID, className) {
        jQuery(eleRef).parents(eleID).removeClass(className);
    },
    sidebar: {
        window: $(window),
        docBody: $('body'),
        drawerRef: jQuery('.dt-sidebar'),
        sidebarToggleHandle: $('[data-toggle=main-sidebar]'),
        foldedHandle: $('[data-handle=folded]'),
        overlay: null,
        enabledFixedSidebar: false,
        enabledFoldedSidebar: false,
        enabledDrawer: false,
        init: function () {
            var sidebar = this;

            if (this.drawerRef.hasClass('dt-drawer')) {
                this.enabledDrawer = true;
            }

            var bodyWidth = sidebar.docBody.innerWidth();
            if (bodyWidth < 992) {
                sidebar.initDrawer();
            } else {
                sidebar.destroy();
            }

            sidebar.window.resize(function () {
                bodyWidth = sidebar.docBody.innerWidth();
                if (bodyWidth < 992) {
                    sidebar.initDrawer();
                } else {
                    sidebar.destroy();
                }
            });

            this.sidebarToggleHandle.on('click', function () {
                sidebar.toggleFolded();
            });
        },
        initDrawer: function () {
            if (this.docBody.hasClass('dt-sidebar--fixed')) {
                this.enabledFixedSidebar = true;
            }

            if (this.docBody.hasClass('dt-sidebar--folded')) {
                this.enabledFoldedSidebar = true;
            }

            this.docBody.removeClass('dt-sidebar--fixed');
            this.docBody.removeClass('dt-sidebar--folded');

            this.drawerRef.addClass('dt-drawer position-left');

            $(document).trigger('sidebar-toggle-fixed');
        },
        destroy: function () {
            if (!this.enabledDrawer) {
                this.drawerRef.removeClass('dt-drawer position-left');
            }

            if (this.enabledFixedSidebar) {
                this.docBody.addClass('dt-sidebar--fixed');
                $(document).trigger('sidebar-toggle-fixed');
            }

            if (this.enabledFoldedSidebar) {
                this.docBody.addClass('dt-sidebar--folded');
            }
        },
        toggleFolded: function () {
            if (!this.drawerRef.hasClass('dt-drawer')) {
                if (this.docBody.hasClass('dt-sidebar--folded')) {
                    this.sidebarUnfolded();
                    activeLayoutHandle('default');
                } else {
                    this.sidebarFolded();
                    activeLayoutHandle('folded');
                }
            }
        },
        sidebarFolded: function () {
            this.docBody.addClass('dt-sidebar--folded');
            $(document).trigger('sidebar-folded');
        },
        sidebarUnfolded: function () {
            this.docBody.removeClass('dt-sidebar--folded');
            $(document).trigger('sidebar-unfolded');
        },
        toggle: function () {
            if (this.drawerRef.hasClass('open')) {
                this.close();
            } else {
                this.open()
            }
        },
        open: function () {
            this.drawerRef.addClass('open');
            this.insertOverlay();
            this.sidebarToggleHandle.addClass('active');
        },
        close: function () {
            this.drawerRef.removeClass('open');
            this.overlay.remove();
            this.sidebarToggleHandle.removeClass('active');
        },
        insertOverlay: function () {
            this.overlay = document.createElement('div');
            this.overlay.className = 'dt-backdrop';
            this.drawerRef.after(this.overlay);

            var drawer = this;
            var overlayContainer = $(this.overlay);
            overlayContainer.on('click', function (event) {
                event.stopPropagation();
                drawer.toggle();
            });
        }
    },
    hoverCard: {
        docBody: $('body'),
        hoverHndle: $('[data-hover=thumb-card]'),
        handleRef: null,
        thumbCard: null,
        init: function () {
            var $this = this;
            this.createHoverCard();

            this.hoverHndle.hover(function () {
                $this.handleRef = $(this);
                $this.showThumb();
            }, function () {
                $this.hideThumb();
            });
        },
        showThumb: function () {
            var bodyWidth = this.docBody.outerWidth(true);

            if (bodyWidth > 767) {
                var $this = this;
                var offset = this.handleRef.offset();
                var handleWidth = this.handleRef.outerWidth(true);
                var name = (this.handleRef.data('name')) ? this.handleRef.data('name') : '';

                var innerHtml = '<span class="user-bg-card__info"><span class="dt-avatar-name text-center">' + name + '</span></span>';

                $this.thumbCard.html(innerHtml);

                if (($this.handleRef.data('thumb'))) {
                    $this.thumbCard.css({
                        backgroundImage: 'url(' + $this.handleRef.data('thumb') + ')',
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover'
                    });
                } else {
                    $this.thumbCard.css({background: 'transparent'});
                }

                $this.thumbCard.css({
                    left: (offset.left - ((handleWidth + 67.5) / 2)),
                    top: (offset.top - 100),
                    width: 135,
                    height: 90,
                    zIndex: 2
                });
                $this.thumbCard.fadeIn();
            }
        },
        hideThumb: function () {
            this.thumbCard.fadeOut();
        },
        createHoverCard: function () {
            var tc = document.createElement('div');
            tc.className = 'card user-bg-card position-absolute bg-primary';
            tc.style.display = 'none';
            this.docBody.append(tc);
            this.thumbCard = $(tc);
        }
    },
    customizer: {
        toggleHandle: $('[data-toggle=customizer]'),
        containerPanel: $('.dt-customizer'),
        overlay: null,
        init: function () {
            var $this = this;

            $this.toggleHandle.on('click', function () {
                $this.toggle();
            });
        },
        toggle: function () {
            if (this.containerPanel.hasClass('open')) {
                this.close();
            } else {
                this.open()
            }
        },
        open: function () {
            this.containerPanel.addClass('open');
            this.insertOverlay();
        },
        close: function () {
            this.containerPanel.removeClass('open');
            this.overlay.remove();
        },
        insertOverlay: function () {
            this.overlay = document.createElement('div');
            this.overlay.className = 'dt-backdrop';
            this.containerPanel.after(this.overlay);

            var $this = this;
            var overlayContainer = $(this.overlay);
            overlayContainer.on('click', function (event) {
                event.stopPropagation();
                $this.toggle();
            });
        }
    },
    quickDrawer: {
        toggleHandle: $('[data-toggle=quick-drawer]'),
        containerPanel: $('.dt-quick-drawer'),
        overlay: null,
        init: function () {
            var $this = this;

            $this.toggleHandle.on('click', function () {
                $this.toggle();
            });
        },
        toggle: function () {
            if (this.containerPanel.hasClass('open')) {
                this.close();
            } else {
                this.open()
            }
        },
        open: function () {
            this.containerPanel.addClass('open');
            this.insertOverlay();
        },
        close: function () {
            this.containerPanel.removeClass('open');
            this.overlay.remove();
        },
        insertOverlay: function () {
            this.overlay = document.createElement('div');
            this.overlay.className = 'dt-backdrop';
            this.containerPanel.after(this.overlay);

            var $this = this;
            var overlayContainer = $(this.overlay);
            overlayContainer.on('click', function (event) {
                event.stopPropagation();
                $this.toggle();
            });
        }
    },
    init: function () {
        this.sidebar.init();
        this.hoverCard.init();
        this.customizer.init();
        this.quickDrawer.init();
        this.initCustomStyle();
    },
    updateStyle: function (style) {
        this.customStyle.innerHTML = style;
    },
    initCustomStyle: function () {
        this.customStyle = document.createElement('style');
        this.docBody.prepend(this.customStyle);
    }
};

var dtDrawer = {
    container: $('#dt-notification-drawer'),
    toggleHandle: $('[data-toggle=drawer]'),
    switchHandle: $('[data-switch=drawer]'),
    activeHandle: null,
    activeSwitch: null,
    activeChildContainer: null,
    loader: null,
    dismisHandle: $('[data-dismiss=drawer]'),
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

/**
 * Set new Cookie
 * @param {type} name
 * @param {type} value
 * @param {type} days
 * @returns {undefined}
 */
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

/**
 * Get Cookie value
 * @param {type} name
 * @returns {unresolved}
 */
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function notifyUser(title) {
    if (title === '') {
        title = 'Settings saved successfully.';
    }

    const toast = swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000
    });

    toast({type: 'success', title: title});
}

/**
 * Change Layout
 * @param {string} $layout
 * @param {boolean} $init
 * @return {undefined}
 */
function changeLayout($layout, $init) {
    var $body = jQuery('body');

    if ($layout === 'framed') {
        $body.removeClass('dt-layout--boxed dt-layout--full-width').addClass('dt-layout--framed');
    } else if ($layout === 'full-width') {
        $body.removeClass('dt-layout--framed dt-layout--boxed').addClass('dt-layout--full-width');
    } else if ($layout === 'boxed') {
        $body.removeClass('dt-layout--framed dt-layout--full-width').addClass('dt-layout--boxed');
    }

    localStorage.setItem('dt-layout', $layout);
    $(document).trigger('layout-changed');

    if (!$init)
        notifyUser('Layout Updated successfully.');
}

/**
 * Change theme
 * @param {string} $theme
 * @param {string} $style
 * @param {string} $themeStylesheet
 * @param {boolean} $init
 * @return {undefined}
 */
function changeTheme($theme, $style, $themeStylesheet, $init) {
    var $body = jQuery('body');
    var $logo = $body.find('.dt-header .dt-brand__logo-img');
    var stylePath = $style ? '-' + $style : '';
    var rtlString = rtlEnable ? '-rtl' : '';

    $('#theme-style-chooser').show();
    if ($theme === 'light') {
        $logo.attr('src', $mediaUrl + 'assets/images/logo.png');
        $body.find('.dt-login__content-inner .dt-brand__logo-img').attr('src', $mediaUrl + 'assets/images/logo.png');
        $body.removeClass('theme-dark').removeClass('theme-semidark');
        $themeStylesheet.href = $baseUrl + 'assets/css/default/theme-' + $theme + stylePath + rtlString + '.min.css';
    } else if ($theme === 'dark') {
        $logo.attr('src', $mediaUrl + 'assets/images/logo-white.png');
        $body.removeClass('theme-semidark').addClass('theme-dark');
        $themeStylesheet.href = $baseUrl + 'assets/css/default/theme-' + $theme + rtlString + '.min.css';
        $('#theme-style-chooser').hide();
    } else if ($theme === 'semidark') {
        $logo.attr('src', $mediaUrl + 'assets/images/logo-white.png');
        $body.find('.dt-login__content-inner .dt-brand__logo-img').attr('src', $mediaUrl + 'assets/images/logo.png');
        $body.removeClass('theme-dark').addClass('theme-semidark');
        $themeStylesheet.href = $baseUrl + 'assets/css/default/theme-' + $theme + stylePath + rtlString + '.min.css';
    }

    localStorage.setItem('dt-theme', $theme);
    localStorage.setItem('dt-style', $style);
    $(document).trigger('theme-changed');

    if (!$init)
        notifyUser('Theme Updated successfully.');
}

/*
 * Active customizer layout option
 */
function activeLayoutHandle(layout) {
    var $layoutContainer = jQuery('#sidebar-layout');
    $layoutContainer.find('.choose-option').removeClass('active');

    if (layout === 'folded') {
        $layoutContainer.find('[data-value=folded]').parent().addClass('active');
    } else if (layout === 'drawer') {
        $layoutContainer.find('[data-value=drawer]').parent().addClass('active');
    } else if (layout === 'default') {
        $layoutContainer.find('[data-value=default]').parent().addClass('active');
    }
}

/*
 * Active fixed style
 */
function activeFixedStyle() {
    var $body = jQuery('body');
    var $toggleFixedHeader = jQuery('#toggle-fixed-header');
    var $toggleFixedSidebar = jQuery('#toggle-fixed-sidebar');

    if ($body.hasClass('dt-header--fixed')) {
        $toggleFixedHeader.parent().addClass('active');
    } else {
        $toggleFixedHeader.parent().removeClass('active');
    }

    if ($body.hasClass('dt-sidebar--fixed')) {
        $toggleFixedSidebar.parent().addClass('active');
    } else {
        $toggleFixedSidebar.parent().removeClass('active');
    }
}

function init_indecator() {
    var $progressbar = jQuery('.dt-indicator-item__info:not(.complete)');

    $progressbar.each(function (index) {

        var $currentBar = $(this);
        var percentage = Math.ceil($currentBar.data('fill'));
        var maxVal = ($currentBar.data('max')) ? parseInt($currentBar.data('max')) : 100;
        var fillTypePercent = ($currentBar.data('percent')) ? true : false;
        var textSufix = ($currentBar.data('suffix')) ? $currentBar.data('suffix') : '';

        if (percentage && percentage <= maxVal) {
            $({countNum: 0}).animate({countNum: percentage}, {
                duration: 1000,
                easing: 'linear',
                step: function (now, tween) {
                    // What todo on every count
                    var pct = Math.floor(now);
                    var widthPct = Math.floor((pct * 100) / maxVal) + '%';

                    if (fillTypePercent) {
                        pct += '%';
                    }

                    $currentBar.find(".dt-indicator-item__fill").css('width', widthPct);
                    $currentBar.find(".dt-indicator-item__count").text(pct + ' ' + textSufix);
                },
                progress: function (animation, progress, remainingMs) {
                }
            });
        }
    });
}

var $themeStylesheet;
var $dtTheme = getCookie('dt-theme');
var $dtLayout = getCookie('dt-layout');
var $dtStyle = getCookie('dt-style');
var $currentTheme = ($dtTheme) ? $dtTheme : 'dark';
var $currentLayout = ($dtLayout) ? $dtLayout : 'full-width';
var $currentThemeStyle = ($dtStyle) ? $dtStyle : '';

(function ($) {
    $themeStylesheet = document.createElement('link');
    $themeStylesheet.id = 'theme-stylesheet';
    $themeStylesheet.rel = 'stylesheet';
    $themeStylesheet.href = '';
    $('head').append($themeStylesheet);

    // go to location
    $('[data-location]').on('click', function (event) {
        event.preventDefault();
        window.location = $(this).data('location');
    });
})(jQuery);
"use strict";

(function ($) {
    var $body = $('body');
    var $themeChooser = $('#theme-chooser').find('.choose-option__icon');
    var $layoutChooser = $('#layout-chooser').find('.choose-option__icon');
    var $themeStyleChooser = $('#theme-style-chooser').find('.dt-color-option');

    $('#theme-chooser').find('[data-theme=' + $currentTheme + ']').parent().addClass('active');
    $('#layout-chooser').find('[data-layout=' + $currentLayout + ']').parent().addClass('active');

    if ($currentThemeStyle) {
        $('#theme-style-chooser').find('[data-style=' + $currentThemeStyle + ']').addClass('active');
    } else {
        $('#theme-style-chooser').find('.dt-color-option:eq(0)').addClass('active'); 
    }

    $themeChooser.on('click', function () {
        $themeChooser.parent().removeClass('active');
        $(this).parent().addClass('active');
        $currentTheme = $(this).data('theme');
        changeTheme($currentTheme, $currentThemeStyle, $themeStylesheet);
    });

    $layoutChooser.on('click', function () {
        $layoutChooser.parent().removeClass('active');
        $(this).parent().addClass('active');
        $currentLayout = $(this).data('layout');
        changeLayout($currentLayout);
    });

    $themeStyleChooser.on('click', function () {
        $themeStyleChooser.removeClass('active');
        $(this).addClass('active');
        $currentThemeStyle = $(this).data('style');
        changeTheme($currentTheme, $currentThemeStyle, $themeStylesheet);
    });

    var $toggleFixedHeader = $('#toggle-fixed-header');
    var $toggleFixedSidebar = $('#toggle-fixed-sidebar');
    var $layoutContainer = $('#sidebar-layout');
    var $sidebarLayoutHandle = $layoutContainer.find('.choose-option__icon');

    $toggleFixedHeader.on('click', function () {
        if ($(this).parent().hasClass('active')) {
            $(this).parent().removeClass('active');
            $body.removeClass('dt-header--fixed');
        } else {
            $body.addClass('dt-header--fixed');
            $(this).parent().addClass('active');
        }
    });

    $toggleFixedSidebar.on('click', function () {
        if ($(this).parent().hasClass('active')) {
            $(this).parent().removeClass('active');
            $body.removeClass('dt-sidebar--fixed');
            $(document).trigger('sidebar-toggle-fixed');
        } else {
            $(this).parent().addClass('active');
            $body.addClass('dt-sidebar--fixed');
            activeLayoutHandle('default');
            drift.sidebar.enabledDrawer = false;
            $('.dt-brand__tool').removeClass('active');
            drift.sidebar.destroy();
            drift.sidebar.sidebarUnfolded();
            $(document).trigger('sidebar-toggle-fixed');
        }
    });

    $sidebarLayoutHandle.on('click', function () {
        $sidebarLayoutHandle.parent().removeClass('active');
        var layout = $(this).data('value');
        $(this).parent().addClass('active');

        if (layout === 'folded') {
            drift.sidebar.enabledDrawer = false;
            drift.sidebar.destroy();
            drift.sidebar.sidebarFolded();
            $('.dt-brand__tool').addClass('active');
        } else if (layout === 'drawer') {
            drift.sidebar.sidebarUnfolded();
            drift.sidebar.enabledDrawer = true;
            drift.sidebar.initDrawer();
            $('.dt-brand__tool').removeClass('active');
        } else if (layout === 'default') {
            drift.sidebar.enabledDrawer = false;
            drift.sidebar.destroy();
            drift.sidebar.sidebarUnfolded();
            $('.dt-brand__tool').removeClass('active');
        }

        activeFixedStyle();
    });

    if ($body.hasClass('dt-sidebar--folded')) {
        $('[data-value=folded]').parent().addClass('active');
    } else if (drift.sidebar.drawerRef.hasClass('dt-drawer')) {
        $('[data-value=drawer]').parent().addClass('active');
    } else {
        $('[data-value=default]').parent().addClass('active');
    }
})(jQuery);
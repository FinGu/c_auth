(function ($) {
    "use strict";
    let primaryColor = '#512DA8';
    let orangeColor = '#ff9800';
    let successColor = '#52c41a';
    let infoColor = '#1890ff';
    let blueGrayColor = '#607d8b';

    $("#picker-1").spectrum({
        color: primaryColor
    });

    $("#picker-2").spectrum({
        color: primaryColor,
        cancelText: "None",
        chooseText: "Done"
    });

    $("#picker-3").spectrum({
        color: primaryColor,
        showButtons: false
    });

    let isDisabled = true;
    $("#picker-4").spectrum({
        color: primaryColor,
        disabled: isDisabled
    });

    $("#toggle-disabled").on('change', function () {
        if ($(this).is(':checked')) {
            $("#picker-4").spectrum("enable");
        }
        else {
            $("#picker-4").spectrum("disable");
        }
        isDisabled = !isDisabled;
        return false;
    });

    $("#picker-5").spectrum({
        color: primaryColor,
        containerClassName: 'bg-dark',
    });

    $("#picker-6").spectrum({
        color: primaryColor,
        replacerClassName: 'bg-success border-success',
    });

    $("#picker-7").spectrum({
        color: blueGrayColor,
        showInitial: true
    });

    $("#picker-8").spectrum({
        color: blueGrayColor,
        showInput: true
    });

    $("#picker-9").spectrum({
        color: blueGrayColor,
        showAlpha: true
    });

    $("#picker-10").spectrum({
        color: blueGrayColor,
        allowEmpty: true
    });

    $("#picker-11").spectrum({
        color: blueGrayColor,
        showInitial: true,
        showInput: true
    });

    $("#picker-12").spectrum({
        color: blueGrayColor,
        showInitial: true,
        showInput: true,
        showAlpha: true,
        allowEmpty: true
    });

    $("#picker-13").spectrum({
        color: successColor,
        showPalette: true,
        palette: [
            ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
            ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
            ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
            ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
            ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
            ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
            ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
            ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
        ]
    });

    $("#picker-14").spectrum({
        color: successColor,
        showPaletteOnly: true,
        showPalette: true,
        palette: [
            ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
            ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
            ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
            ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
            ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
            ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
            ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
            ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
        ]
    });

    $("#picker-15").spectrum({
        color: successColor,
        showPaletteOnly: true,
        togglePaletteOnly: true,
        togglePaletteMoreText: 'more',
        togglePaletteLessText: 'less',
        palette: [
            ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
            ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
            ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
            ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
            ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
            ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
            ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
            ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
        ]
    });

    $("#picker-16").spectrum({
        color: successColor,
        showPalette: true,
        showSelectionPalette: true,
        palette: []
    });

    $("#picker-17").spectrum({
        color: successColor,
        showPalette: true,
        showSelectionPalette: true,
        palette: [],
        maxSelectionSize: 3,
        selectionPalette: ["#600", "#f1c232"]
    });

    $("#picker-18").spectrum({
        color: successColor,
        showPalette: true,
        hideAfterPaletteSelect: true,
        palette: [
            ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
            ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
            ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
            ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
            ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
            ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
            ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
            ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
        ]
    });

    $("#picker-19").spectrum({
        color: infoColor,
        preferredFormat: "hex",
        showInput: true,
        showPalette: true
    });

    $("#picker-20").spectrum({
        color: infoColor,
        preferredFormat: "hex3",
        showInput: true,
        showPalette: true
    });

    $("#picker-21").spectrum({
        color: infoColor,
        preferredFormat: "hsl",
        showInput: true,
        showPalette: true
    });

    $("#picker-22").spectrum({
        color: infoColor,
        preferredFormat: "rgb",
        showInput: true,
        showPalette: true
    });

    $("#picker-23").spectrum({
        color: infoColor,
        preferredFormat: "name",
        showInput: true,
        showPalette: true
    });

    $("#picker-24").spectrum({
        color: infoColor,
        showInput: true,
        showPalette: true
    });

    $("#picker-25").spectrum({
        showInput: true,
        color: orangeColor,
        change: function (color) {
            let label = $("#change-result-1");
            label.html("Change called: <strong>" + color.toHexString() + "</strong>");
        }
    });

    $("#picker-26").spectrum({
        showInput: true,
        color: orangeColor,
        move: function (color) {
            let label = $("#change-result-2");
            label.html("Move called: <strong>" + color.toHexString() + "</strong>");
        }
    });

    $("#picker-27").spectrum({
        showInput: true,
        color: orangeColor,
        hide: function (color) {
            let label = $("#change-result-3");
            label.html("Hide called: <strong>" + color.toHexString() + "</strong>");
        }
    });

    $("#picker-28").spectrum({
        showInput: true,
        color: orangeColor,
        show: function (color) {
            let label = $("#change-result-4");
            label.html("Show called: <strong>" + color.toHexString() + "</strong>");
        }
    });

    $("#picker-29").spectrum({
        showInput: true,
        color: orangeColor,
        dragstart: function (color) {
            let label = $("#change-result-5");
            label.html("Drag Start called: <strong>" + color.toHexString() + "</strong>");
        }
    });

    $("#picker-30").spectrum({
        showInput: true,
        color: orangeColor,
        dragDrop: function (color) {
            let label = $("#change-result-6");
            label.html("Drag Stop called: <strong>" + color.toHexString() + "</strong>");
        }
    });

    $("#picker-31").spectrum({
        color: blueGrayColor,
        flat: true,
        showInitial: true
    });

    $("#picker-32").spectrum({
        flat: true,
        showPaletteOnly: true,
        togglePaletteOnly: true,
        palette: [
            ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
            ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
            ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
            ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
            ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
            ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
            ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
            ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
        ]
    });

    $("#picker-33").spectrum({
        color: blueGrayColor,
        flat: true,
        showAlpha: true
    });

    $("#picker-34").spectrum({
        color: blueGrayColor,
        flat: true,
        allowEmpty: true
    });

    $("#picker-35").spectrum({
        color: blueGrayColor,
        flat: true,
        showInitial: true,
        showInput: true
    });

    $("#picker-36").spectrum({
        color: blueGrayColor,
        flat: true,
        showInitial: true,
        showInput: true,
        showAlpha: true,
        allowEmpty: true
    });

})(jQuery);
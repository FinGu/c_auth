(function ($) {
    "use strict";

    new Datamap({
        element: document.getElementById("data-map-1"),
        fills: {
            defaultFill: "#c5c5c5"
        },
        geographyConfig: {
            highlightFillColor: '#512DA8',
            highlightBorderWidth: 0,
        },
    });

    var dataMapChoropleth = new Datamap({
        element: document.getElementById("data-map-2"),
        projection: 'mercator',
        fills: {
            defaultFill: "#c5c5c5",
            authorHasTraveledTo: "#512DA8"
        },
        data: {
            USA: {fillKey: "authorHasTraveledTo"},
            JPN: {fillKey: "authorHasTraveledTo"},
            ITA: {fillKey: "authorHasTraveledTo"},
            CRI: {fillKey: "authorHasTraveledTo"},
            KOR: {fillKey: "authorHasTraveledTo"},
            DEU: {fillKey: "authorHasTraveledTo"},
        }
    });

    var colors = d3.scale.category10();

    window.setInterval(function () {
        dataMapChoropleth.updateChoropleth({
            USA: colors(Math.random() * 10),
            RUS: colors(Math.random() * 100),
            AUS: {fillKey: 'authorHasTraveledTo'},
            BRA: colors(Math.random() * 50),
            CAN: colors(Math.random() * 50),
            ZAF: colors(Math.random() * 50),
            IND: colors(Math.random() * 50),
        });
    }, 2000);

    new Datamap({
        element: document.getElementById("data-map-3"),
        scope: 'usa',
        fills: {
            defaultFill: "#c5c5c5",
            active: "#512DA8"
        },
        geographyConfig: {
            highlightFillColor: '#3e2280',
            highlightBorderWidth: 0
        },
        data: {
            MT: {fillKey: "active"},
            NC: {fillKey: "active"},
            AL: {fillKey: "active"},
            IA: {fillKey: "active"},
            MA: {fillKey: "active"},
            CA: {fillKey: "active"},
            TX: {fillKey: "active"},
        }
    });

    var dataMapArc = new Datamap({
        element: document.getElementById("data-map-4"),
        fills: {
            defaultFill: "#c5c5c5",
            arival: "#ffc107",
            IND: "#512DA8"
        },
        geographyConfig: {
            highlightFillColor: '#3e2280',
            highlightBorderWidth: 0
        },
        data: {
            IND: {fillKey: "IND"},
            USA: {fillKey: "arival"},
            RUS: {fillKey: "arival"},
            DEU: {fillKey: "arival"},
            POL: {fillKey: "arival"},
            JAP: {fillKey: "arival"},
            AUS: {fillKey: "arival"},
            BRA: {fillKey: "arival"}
        }
    });

    dataMapArc.arc(
        [
            {origin: 'IND', destination: 'RUS'},
            {origin: 'IND', destination: 'USA'},
            {origin: 'IND', destination: 'DEU'},
            {origin: 'IND', destination: 'POL'},
            {origin: 'IND', destination: 'JAP'},
            {origin: 'IND', destination: 'AUS'},
            {origin: 'IND', destination: 'BRA'}
        ],
        {strokeColor: '#512DA8', strokeWidth: 2}
    );
})(jQuery);
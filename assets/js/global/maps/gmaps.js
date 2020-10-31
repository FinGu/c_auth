"use strict";
var googleMaps = {
    basic: {
        options: {
            lat: -12.043333,
            lng: -77.028333
        },
        init: function (mapEleRef) {
            this.options.div = mapEleRef;
            var basicMap = new GMaps(this.options);
        }
    },
    events: {
        options: {
            zoom: 16,
            lat: -12.043333,
            lng: -77.028333,
            click: function (e) {
                alert('click');
            },
            dragend: function (e) {
                alert('dragend');
            }
        },
        init: function (mapEleRef) {
            this.options.div = mapEleRef;
            var eventsMap = new GMaps(this.options);
        }
    },
    markers: {
        options: {
            zoom: 16,
            lat: -12.043333,
            lng: -77.028333
        },
        init: function (mapEleRef) {
            this.options.div = mapEleRef;
            var markerMap = new GMaps(this.options);

            markerMap.addMarker({
                lat: -12.043333,
                lng: -77.03,
                title: 'Lima',
                click: function (e) {
                    alert('You clicked in this marker');
                }
            });

            markerMap.addMarker({
                lat: -12.042,
                lng: -77.028333,
                title: 'Marker with InfoWindow',
                infoWindow: {
                    content: '<p>HTML Content</p>'
                }
            });
        }
    },
    geolocate: {
        options: {
            lat: -12.043333,
            lng: -77.028333
        },
        init: function (mapEleRef) {
            this.options.div = mapEleRef;
            var geoMap = new GMaps(this.options);

            GMaps.geolocate({
                success: function (position) {
                    geoMap.setCenter(position.coords.latitude, position.coords.longitude);
                },
                error: function (error) {
                    alert('Geolocation failed: ' + error.message);
                },
                not_supported: function () {
                    alert("Your browser does not support geolocation");
                },
                always: function () {
                    alert("Done!");
                }
            });
        }
    },
    geocoding: {
        options: {
            lat: -12.043333,
            lng: -77.028333
        },
        init: function (mapEleRef) {
            this.options.div = mapEleRef;
            var geocodeMap = new GMaps(this.options);

            $('#geocoding_form').submit(function (e) {
                e.preventDefault();
                
                GMaps.geocode({
                    address: $('input#address', this).val().trim(),
                    callback: function (results, status) {
                        if (status == 'OK') {
                            var latlng = results[0].geometry.location;
                            geocodeMap.setCenter(latlng.lat(), latlng.lng());
                            geocodeMap.addMarker({
                                lat: latlng.lat(),
                                lng: latlng.lng()
                            });
                        }
                    }
                });
            });
        }
    },
    overlays: {
        options: {
            lat: -12.043333,
            lng: -77.028333
        },
        init: function (mapEleRef) {
            this.options.div = mapEleRef;
            var overlayMap = new GMaps(this.options);

            overlayMap.drawOverlay({
                lat: overlayMap.getCenter().lat(),
                lng: overlayMap.getCenter().lng(),
                content: '<span class="custom-tooltip">Lima</span>',
                verticalAlign: 'top',
                horizontalAlign: 'center'
            });
        }
    },
    overlayPolylines: {
        options: {
            lat: -12.043333,
            lng: -77.028333
        },
        init: function (mapEleRef) {
            this.options.div = mapEleRef;
            var overPolylineMap = new GMaps(this.options);

            var path = [[-12.044012922866312, -77.02470665341184], [-12.05449279282314, -77.03024273281858], [-12.055122327623378, -77.03039293652341], [-12.075917129727586, -77.02764635449216], [-12.07635776902266, -77.02792530422971], [-12.076819390363665, -77.02893381481931], [-12.088527520066453, -77.0241058385925], [-12.090814532191756, -77.02271108990476]];

            overPolylineMap.drawPolyline({
                path: path, // pre-defined polygon shape
                strokeColor: '#512DA8',
                strokeOpacity: 0.6,
                strokeWeight: 6
            });
        }
    },
    overlayPolygons: {
        options: {
            lat: -12.043333,
            lng: -77.028333
        },
        init: function (mapEleRef) {
            this.options.div = mapEleRef;
            var overPolygonsMap = new GMaps(this.options);

            var path = [[-12.040397656836609, -77.03373871559225], [-12.040248585302038, -77.03993927003302], [-12.050047116528843, -77.02448169303511], [-12.044804866577001, -77.02154422636042]];

            overPolygonsMap.drawPolygon({
                paths: path, // pre-defined polygon shape
                strokeColor: '#512DA8',
                strokeOpacity: 0.4,
                strokeWeight: 2,
                fillColor: '#512DA8',
                fillOpacity: 0.4
            });
        }
    },
    GeoJsonPolygons: {
        options: {
            lat: 39.743296277167325,
            lng: -105.00517845153809
        },
        init: function (mapEleRef) {
            this.options.div = mapEleRef;
            var geoPolygonsMap = new GMaps(this.options);

            var paths = [
                [
                    [
                        [-105.00432014465332, 39.74732195489861],
                        [-105.00715255737305, 39.74620006835170],
                        [-105.00921249389647, 39.74468219277038],
                        [-105.01067161560059, 39.74362625960105],
                        [-105.01195907592773, 39.74290029616054],
                        [-105.00989913940431, 39.74078835902781],
                        [-105.00758171081543, 39.74059036160317],
                        [-105.00346183776855, 39.74059036160317],
                        [-105.00097274780272, 39.74059036160317],
                        [-105.00062942504881, 39.74072235994946],
                        [-105.00020027160645, 39.74191033368865],
                        [-105.00071525573731, 39.74276830198601],
                        [-105.00097274780272, 39.74369225589818],
                        [-105.00097274780272, 39.74461619742136],
                        [-105.00123023986816, 39.74534214278395],
                        [-105.00183105468751, 39.74613407445653],
                        [-105.00432014465332, 39.74732195489861]
                    ], [
                        [-105.00361204147337, 39.74354376414072],
                        [-105.00301122665405, 39.74278480127163],
                        [-105.00221729278564, 39.74316428375108],
                        [-105.00283956527711, 39.74390674342741],
                        [-105.00361204147337, 39.74354376414072]
                    ]
                ], [
                    [
                        [-105.00942707061768, 39.73989736613708],
                        [-105.00942707061768, 39.73910536278566],
                        [-105.00685214996338, 39.73923736397631],
                        [-105.00384807586671, 39.73910536278566],
                        [-105.00174522399902, 39.73903936209552],
                        [-105.00041484832764, 39.73910536278566],
                        [-105.00041484832764, 39.73979836621592],
                        [-105.00535011291504, 39.73986436617916],
                        [-105.00942707061768, 39.73989736613708]
                    ]
                ]
            ];

            geoPolygonsMap.drawPolygon({
                paths: paths, // pre-defined polygon shape
                useGeoJSON: true,
                strokeColor: '#512DA8',
                strokeOpacity: 0.4,
                strokeWeight: 2,
                fillColor: '#512DA8',
                fillOpacity: 0.6
            });
        }
    },
    routes: {
        options: {
            lat: -12.043333,
            lng: -77.028333
        },
        init: function (mapEleRef) {
            this.options.div = mapEleRef;
            var routeMap = new GMaps(this.options);

            routeMap.drawRoute({
                origin: [-12.044012922866312, -77.02470665341184],
                destination: [-12.090814532191756, -77.02271108990476],
                travelMode: 'driving',
                strokeColor: '#512DA8',
                strokeOpacity: 0.6,
                strokeWeight: 5
            });
        }
    },
    advanceRoute: {
        options: {
            lat: -12.043333,
            lng: -77.028333
        },
        init: function (mapEleRef) {
            this.options.div = mapEleRef;
            var advRouteMap = new GMaps(this.options);

            $('#start_travel').on('click', function (e) {
                e.preventDefault();
                advRouteMap.travelRoute({
                    origin: [-12.044012922866312, -77.02470665341184],
                    destination: [-12.090814532191756, -77.02271108990476],
                    travelMode: 'driving',
                    step: function (e) {
                        $('#instructions').append('<li>' + e.instructions + '</li>');
                        $('#instructions li:eq(' + e.step_number + ')').delay(450 * e.step_number).fadeIn(200, function () {
                            advRouteMap.setCenter(e.end_location.lat(), e.end_location.lng());
                            advRouteMap.drawPolyline({
                                path: e.path,
                                strokeColor: '#512DA8',
                                strokeOpacity: 0.6,
                                strokeWeight: 6
                            });
                        });
                    }
                });
            });
        }
    },
    static: {
        options: {
            size: [610, 300],
            lat: -12.043333,
            lng: -77.028333
        },
        init: function (mapEleRef) {
            var url = GMaps.staticMapURL(this.options);

            $('<img class="img-fluid" />').attr('src', url).appendTo(mapEleRef);
        }
    },
};

(function ($) {
    $('.gmap-container').each(function (index) {
        var mapContainer = $(this);
        var mapType = mapContainer.data('map-type');
        var mapId = mapContainer.attr('id');
        if (!mapId) {
            mapId = 'gmap-container-' + (index + 1);
            mapContainer.attr('id', mapId);
        }

        googleMaps[mapType].init('#' + mapId);

    });
    /*var basicMap = new GMaps({
     div: '#basic-map',
     lat: -12.043333,
     lng: -77.028333
     });
     
     GMaps.geolocate({
     success: function (position) {
     basicMap.setCenter(position.coords.latitude, position.coords.longitude);
     },
     error: function (error) {
     alert('Geolocation failed: ' + error.message);
     },
     not_supported: function () {
     alert("Your browser does not support geolocation");
     },
     always: function () {
     alert("Done!");
     }
     });*/
})(jQuery);
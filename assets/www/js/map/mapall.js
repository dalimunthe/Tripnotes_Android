$('#map_canvas').gmap({'disableDefaultUI': true}).bind('init', function (ev, map) {
    $("[data-gmapping]").each(function (i, el) {
        var data = $(el).data('gmapping');
        var images = ['img/marker_nature.png'];

        $('#map_canvas').gmap('addMarker', {
            'id': data.id,
            'tags': data.tags,
            'position': new google.maps.LatLng(data.latlng.lat, data.latlng.lng),
            'bounds': true
        }, function (map, marker) {
            $(el).click(function () {
                $(marker).triggerEvent('click');
            });
        }).click(function () {
            $('#map_canvas').gmap('openInfoWindow', {
                'content': '<strong>' + $(el).find('.info-box').text() + '</strong>' + '<br/>' + $(el).find('.fill-box').text() + '<br/>' + $(el).find('.foot-box').text()
            }, this);
        });
    });
});
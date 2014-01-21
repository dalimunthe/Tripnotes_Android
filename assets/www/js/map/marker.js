
function AssignValues() {
    sessionStorage.setItem("latLs", document.form1.latLi.value);
    sessionStorage.setItem("lngLs", document.form1.lngLi.value);
}

function mapgo(){
   window.location = 'map.html'; 
}

$(function() {
    var lata = parseFloat(sessionStorage.getItem("latLs"));
    var lnga = parseFloat(sessionStorage.getItem("lngLs"));
    var posa = new google.maps.LatLng(lata,lnga);
 
    $('#map_canvas').gmap({'center': posa, 'zoom': 18, 'disableDefaultUI': true}).bind('init', function (ev, map) {
        $("[data-gmapping]").each(function (i, el) {
            var data = $(el).data('gmapping');
            
            $('#map_canvas').gmap('addMarker', {
                'id': data.id,
                'tags': data.tags,
                'position': new google.maps.LatLng(data.latlng.lat, data.latlng.lng),
                'bounds': false
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
});
   
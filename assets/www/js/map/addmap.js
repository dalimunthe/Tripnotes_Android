$(document).on('pageshow', '#map', function (event) {
    max_height();
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        'enableHighAccuracy': true,
        'timeout': 2000
    });
});

function max_height() {
    var header = $.mobile.activePage.find("div[data-role='header']:visible");
    var footer = $.mobile.activePage.find("div[data-role='footer']:visible");
    var content = $.mobile.activePage.find("div[data-role='content']:visible:visible");
    var viewport_height = $(window).height();

    var content_height = viewport_height - header.outerHeight() - footer.outerHeight();
    if ((content.outerHeight() - header.outerHeight() - footer.outerHeight()) <= viewport_height) {
        content_height -= (content.outerHeight() - content.height());
    }
    $.mobile.activePage.find('[data-role="content"]').height(content_height);
}


function onSuccess(position) {
    var minZoomLevel = 18;
    var image = 'img/marker_here.png';
    var koordinat = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
        zoom: minZoomLevel,
        center: koordinat,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var mapDiv = document.getElementById('map_canvas');
    var map = new google.maps.Map(mapDiv, mapOptions);
    var pusatDiv = document.getElementById('pusat_peta');
    google.maps.event.addDomListener(pusatDiv, 'click', function () {
        map.setCenter(koordinat)
    });

    var marker = new google.maps.Marker({
        position: koordinat,
        map: map,
        icon: image,
        title: 'YOU ARE HERE'
    });
}

function onError() {
    alert('Error');
}
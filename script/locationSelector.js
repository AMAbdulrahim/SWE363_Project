var map;
var marker;

function showMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0.0, lng: 0.0 }, 
        zoom: 12 
    });

    marker = new google.maps.Marker({
        map: map,
        draggable: true 
    });

    marker.addListener('dragend', function () {

        var position = marker.getPosition();
        document.getElementById('locationLat').value = position.lat();
        document.getElementById('locationLng').value = position.lng();
    });
}

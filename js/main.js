var app = {
  map: null,
  popup: L.popup()
};

function onMapClick(e) {
  var location_link = window.location.href.replace(window.location.hash,"") + "#/loc/" + e.latlng.lat + '/' + e.latlng.lng;

  app.popup.setLatLng(e.latlng)
  .setContent('<a href="' + location_link + '">Link to this location</a><br><div style="overflow:auto">' + location_link + '</div>')
  .openOn(app.map);
}

function addHashLocationMarker() {
  if(window.location.hash.indexOf("loc") !== -1) {
    var hash = window.location.hash.split('/');
    L.marker([hash[2], hash[3]]).addTo(app.map)
    .bindPopup('Shared Location<br><div style="overflow:auto">'+document.location.href+'</div>').openPopup();
    app.map.setView([hash[2], hash[3]], 3);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  app.map = L.map("map", {
    maxBounds: L.latLngBounds(
      L.latLng(-85, -180),
      L.latLng(85, 180)
    )
  }).setView([1,1], 2);

  L.tileLayer("tiles/{z}/{x}/{y}.jpg", {
    minZoom: 0,
    maxZoom: 5,
    tileSize: 256,
    continuousWorld: true,
    attribution: '<a href="https://github.com/denschub/c3map/blob/master/LICENSE">c3map license information</a>'
  }).addTo(app.map);

  addHashLocationMarker();
  app.map.on("click", onMapClick);
});

window.addEventListener("hashchange", addHashLocationMarker);

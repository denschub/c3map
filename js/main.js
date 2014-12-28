var app = {
  map: null,
  popup: L.popup()
};

function onMapClick(e) {
  var location_link = window.location.href.replace(window.location.hash,"") + "#/loc/" + e.latlng.lat + "/" + e.latlng.lng;

  if(typeof(MozActivity) !== "undefined") {
    app.popup
      .setLatLng(e.latlng)
      .setContent('<a href="" id="sharelink" data-link="' + location_link + '">Share this location</a>')
      .openOn(app.map);

    document.getElementById("sharelink").addEventListener("click", function(e) {
      e.preventDefault();
      new MozActivity({
        name: "share",
        data: {
          type: "url",
          url: location_link
        }
      });
    });
  } else {
    app.popup
      .setLatLng(e.latlng)
      .setContent('Link to this location:<br> <div style="overflow:auto"><a href="' + location_link + '">' + location_link + "</a></div>")
      .openOn(app.map);
  }
}

function addHashLocationMarker() {
  if(window.location.hash.indexOf("loc") !== -1) {
    var hash = window.location.hash.split("/");
    L.marker([hash[2], hash[3]]).addTo(app.map)
      .bindPopup("Shared Location").openPopup();
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

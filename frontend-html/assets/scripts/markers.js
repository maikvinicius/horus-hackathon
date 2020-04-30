let distanceLimit = 5000; //in meters
let mapZoomLevel = 11;
let lat = -23.533773;
let lng = -46.62529;
let city = "São Paulo";
let markers = [];
let currentcircle;
let mapcenter;
let map;
let centermarker;
let markerCluster;
let infowindowCluster;
let autocomplete;

function initMap() {
  //Start autocomplete
  let input = document.getElementById("cidades");
  let options = {
    componentRestrictions: { country: "br" },
  };
  autocomplete = new google.maps.places.Autocomplete(input, options);
  google.maps.event.addListener(autocomplete, "place_changed", function () {
    let place = autocomplete.getPlace();
    lat = place.geometry.location.lat();
    lng = place.geometry.location.lng();
    axios
      .get("https://api.opencagedata.com/geocode/v1/json", {
        params: {
          q: String(lat) + ", " + String(lng),
          key: "f4ee44678a53425884dc6e32c3e927be",
          pretty: "1",
          no_annotations: "1",
          countrycode: "br",
        },
      })
      .then(function (response) {
        city = response.data.results[0].components.city;
        if ($("#cidades").val() != "" && $("#products").val() != "") {
          newLocation(lat, lng);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  });
  //Create the default map
  mapcenter = new google.maps.LatLng(lat, lng);
  let myOptions = {
    zoom: mapZoomLevel,
    scaleControl: true,
    center: mapcenter,
    disableDefaultUI: true,
  };
  map = new google.maps.Map(document.getElementById("map"), myOptions);
  infowindowCluster = new google.maps.InfoWindow();
  //Draw default center point
  centermarker = addCenterMarker(mapcenter, "centro");
}
// Create Cluster
function createCluster() {
  markerCluster = new MarkerClusterer(map, markers, {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    zoomOnClick: false,
  });
  infoClusters();
}

//Add a unique center marker
function addCenterMarker(centerposition, title) {
  let newmarker = new google.maps.Marker({
    icon: ".",
    position: mapcenter,
    map: map,
    title: title,
    zIndex: 3,
  });

  return newmarker;
}

//Draw a circle on the map
function drawRadiusCircle(map, marker, distance) {
  currentcircle = new google.maps.Circle({
    map: map,
    radius: distance,
  });
  currentcircle.bindTo("center", marker, "position");
}

//Create Reports
function createReports(jsonResponse) {
  peoples = {};
  products = {};
  ages = { "13 a 25 anos": 0, "26 a 50 anos": 0, "51 a 80 anos": 0 };

  jsonResponse.forEach((obj) => {
    let sex = JSON.stringify(obj.sex);
    peoples[sex] = (peoples[sex] || 0) + 1;
    let prod = JSON.stringify(obj.product);
    products[prod] = (products[prod] || 0) + 1;
    let age = JSON.stringify(obj.age);
    if (age <= 25) {
      ages["13 a 25 anos"] = ages["13 a 25 anos"] + 1;
    } else if (age > 25 && age <= 50) {
      ages["26 a 50 anos"] = ages["26 a 50 anos"] + 1;
    } else {
      ages["51 a 80 anos"] = ages["51 a 80 anos"] + 1;
    }
  });

  Generos.destroy();
  Idade.destroy();
  Produtos.destroy();
  reports($("#ctx-peoples"), "bar", peoples, "Gêneros");
  reports($("#ctx-ages"), "bar", ages, "Idade");
  reports($("#ctx-products"), "bar", products, "Produtos");
}

//Create markers for the randomly generated points
function createMarkers(map) {
  $(".loading").show();
  let response = requestMarkers();

  response
    .then((jsonResponse) => {
      //Create Reports
      createReports(jsonResponse);

      jsonResponse.forEach((mappoint) => {
        //Map points without the east/west adjustment
        let newmappoint = new google.maps.LatLng(
          mappoint.latitude,
          mappoint.longitude
        );

        let title =
          mappoint.product + " | " + mappoint.sex + " | " + mappoint.age;

        let marker = new google.maps.Marker({
          position: newmappoint,
          map: map,
          title: title,
          zIndex: 2,
        });

        markers.push(marker);
      });
      createCluster();
      drawRadiusCircle(map, centermarker, distanceLimit);
    })
    .catch(() => {
      //error
    })
    .then(() => {
      $(".loading").hide();
    });
}
//Destroy all markers
function clearMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

//New Location
function newLocation(lat, lng) {
  mapcenter = new google.maps.LatLng(lat, lng);
  map.panTo(mapcenter);

  centermarker = addCenterMarker(mapcenter, "centro");

  //Clear Map
  try {
    currentcircle.setMap(null);
    markerCluster.setMap(null);
  } catch {
    console.log("first request");
  }
  clearMarkers();
  createMarkers(map);
  createCluster();
}

//Info windows Clusters
function infoClusters() {
  google.maps.event.addListener(markerCluster, "clusterclick", function (
    cluster
  ) {
    let markers = cluster.getMarkers();

    let array = [];
    let num = 0;
    let prodCount = {};

    for (i = 0; i < markers.length; i++) {
      title = markers[i].getTitle().split("|");
      produto = title[0];
      sexo = title[1];
      idade = title[2];
      if (prodCount[produto]) {
        prodCount[produto] = prodCount[produto] + 1;
      } else {
        prodCount[produto] = 1;
      }
    }

    let text = "";

    for (const [key, total] of Object.entries(prodCount)) {
      text +=
        key +
        ": " +
        total +
        " (" +
        ((total / markers.length) * 100).toFixed(1) +
        "%) " +
        "<br>";
    }

    infowindowCluster.setContent(text);
    infowindowCluster.setPosition(cluster.getCenter());
    infowindowCluster.open(map);
  });

  for (i = 0; i < markers.length; i++) {
    let marker = markers[i];

    google.maps.event.addListener(
      marker,
      "click",
      (function (marker) {
        return function () {
          infowindowCluster.setContent(this.getTitle());
          infowindowCluster.open(map, this);
        };
      })(marker)
    );
  }
}

// Request Markers in API
function requestMarkers() {
  let url = "https://horus-hackaton-api.herokuapp.com/random-geo-coordinates";

  let data = {
    latitude: lat,
    longitude: lng,
    city: city,
    radius: distanceLimit,
    products: $("#products").val(),
  };

  return axios
    .post(url, data)
    .then(function (response) {
      console.log(response);
      return response.data.data;
    })
    .catch(function (error) {
      console.log(error);
      return [];
    });
}

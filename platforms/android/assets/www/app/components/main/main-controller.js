"use strict";

angular.module("ngapp").controller("MainController", function ($http, $rootScope, shared, $state, $scope, $location, $cordovaInAppBrowser, $window) {
    if (map != undefined || map != null) {
        map.remove();
        $("#mapcon").html("");
      
        $("<div id=\"map\" ></div>").appendTo("#mapcon");
    }

    $scope.mapready = false;

    var markers = new L.FeatureGroup();
    var map = L.map('map').setView([16.782602, 96.182764], 14, {
        reset: true
    });
    map.addLayer(markers);
    //L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYXVuZ3BoeW9raGluZSIsImEiOiJjaXh4NTVjeGcwMDFvMzJxdWdzNW8xNXdoIn0.ScCw9S1FXeiTGlmHdpUW-A', {
    //    L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
    //    maxZoom: 18,
    //    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
	//		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
	//		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    //    id: 'mapbox.streets'
    //    }).addTo(map);
    //L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYXVuZ3BoeW9raGluZSIsImEiOiJjaXh4NTVjeGcwMDFvMzJxdWdzNW8xNXdoIn0.ScCw9S1FXeiTGlmHdpUW-A', {
    //    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    //    maxZoom: 18,
    //    id: 'YBS Guide',
    //    accessToken: 'pk.eyJ1IjoiYXVuZ3BoeW9raGluZSIsImEiOiJjaXh4NTVjeGcwMDFvMzJxdWdzNW8xNXdoIn0.ScCw9S1FXeiTGlmHdpUW-A'
    //}).addTo(map);

      var  mapLink =
      '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
          'http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
              attribution: '&copy; ' + mapLink + ' Contributors',
              maxZoom: 18,
          }).addTo(map);

    
    map.on('click', function (e) {
        //alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
        getnerstops(e.latlng.lat, e.latlng.lng,1);
    });


    setTimeout(loadmap, 1000);

    function loadmap() {
       

        $http.get('assets/data/paths.js')
        .then(function (result) {
            $scope.paths = result.data;


            for (var i = 0; i < $scope.paths.length; i++) {
                //  console.log($scope.paths[i]);
                var myLines = [{
                    "type": "LineString",
                    "coordinates": $scope.paths[i].path
                }];

                var myStyle = {
                    "color": changecolor($scope.paths[i].color),
                    "weight": 1,
                    "opacity": .5
                };

                L.geoJSON(myLines, {
                    style: myStyle
                }).addTo(map).bindPopup("No " + $scope.paths[i].no + " " + $scope.paths[i].name);
              //  map.setZoom(15);

              

                
                $scope.mapready = true;
                L.Util.requestAnimFrame(map.invalidateSize, map, !1, map._container);




               


            }

        }, function (err) {
            console.log(err);
        });

        
       



        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
            
        } else {
            $scope.mapready = true;
            console.log("Geolocation is not supported by this browser.");
        }
        function showPosition(position) {
           // getnerstops(position.coords.latitude, position.coords.longitude, 0.5);
            map.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude));

            //L.circle(new L.LatLng(position.coords.latitude, position.coords.longitude),100, {
            //    color: 'transparent', fillColor: '#303f9f',
            //    fillOpacity: 0.9
            //}).addTo(map).bindPopup("သင်ရှိသောနေရာ").openPopup();


            L.marker(new L.LatLng(position.coords.latitude, position.coords.longitude), { icon: iconred }).addTo(map)
                   .bindPopup("သင်ရှိသောနေရာ").openPopup();
            $scope.mapready = true;

        }
       



    }



    $http.get('assets/data/stops.js')
.then(function (result) {
    $scope.stops = result.data;
    //console.log(result.data);

    for (var i = 0; i < $scope.stops.length; i++) {
        for (var j = 0; j < $scope.stops[i].stops.length; j++) {
            $scope.stops[i].stops[j].color = changecolor($scope.stops[i].stops[j].color);


            // L.circle([$scope.stops[i].stops[j].lat, $scope.stops[i].stops[j].lng], 5).addTo(map);

        }

        //for (var k = 0; k < $scope.stops[i].stops.length;) {
        //    //var labelLocation = new L.LatLng($scope.stops[i].stops[k].lat, $scope.stops[i].stops[k].lng);
        //    //var labelTitle = new L.LabelOverlay(labelLocation, '<b>88</b>');
        //    //map.addLayer(labelTitle);


        //    L.circle([$scope.stops[i].stops[k].lat, $scope.stops[i].stops[k].lng], 30, {
        //        color: $scope.stops[i].stops[k].color, fillColor: $scope.stops[i].stops[k].color,
        //        fillOpacity: 0.5
        //    }).addTo(map);
        //    k = k + 20;
        //}

    }

    map.on('moveend', function (e) {

        stopslayer.clearLayers();

        var center = map.getCenter();
        addStops(center);


    });

});
    var stopslayer = new L.FeatureGroup();
    map.addLayer(stopslayer);
    

    function addStops(center) {
        console.log(center);
        //console.log(bounds._northEast.LatLng.Lat);
        //console.log($scope.stops.length);
        for (var i = 0; i < $scope.stops.length; i++) {
               

                    for (var k = 0; k < $scope.stops[i].stops.length;) {
                        //var labelLocation = new L.LatLng($scope.stops[i].stops[k].lat, $scope.stops[i].stops[k].lng);
                        //var labelTitle = new L.LabelOverlay(labelLocation, '<b>88</b>');
                        //map.addLayer(labelTitle);
                        var d = calcCrow(center.lat, center.lng, $scope.stops[i].stops[k].lat, $scope.stops[i].stops[k].lng);
                      //  console.log(d);
                        if (d < 3) {
                           


                            L.circle([$scope.stops[i].stops[k].lat, $scope.stops[i].stops[k].lng], 50, {
                                color: 'transparent', fillColor: $scope.stops[i].stops[k].color,
                                fillOpacity: 0.5
                            }).addTo(stopslayer);
                        }


                        k = k + 5;

                        
                      
                    }

                }
    }
  
    var iconred = L.icon({
        iconUrl: "assets/css/images/marker-icon-blue.png",
        //shadowUrl: 'leaf-shadow.png',
        opacity: .6,
        iconSize: [30, 50], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
    });

    var icon = L.icon({
        iconUrl: "assets/css/images/marker-icon.png",
        //shadowUrl: 'leaf-shadow.png',
        opacity: .6,
        iconSize: [30,50], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
    });

    var sicon = L.icon({
        iconUrl: "assets/css/images/start.png",
        //shadowUrl: 'leaf-shadow.png',

        iconSize: [50, 50], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
    });

    var eicon = L.icon({
        iconUrl: "assets/css/images/end.png",
        //shadowUrl: 'leaf-shadow.png',

        iconSize: [50, 50], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
    });
   
   
    var trip = [];
    var cs;
    function markerclick(stop) {
        if (cs == stop) {
            if (trip.length >= 2) {
                var p = trip.shift();
            }

            trip.push(stop);
            $scope.tp = trip;
            console.log($scope.tp);
            $scope.$apply();
        }
        else {
            cs = stop;
        }
       
        //if (!smarker) {
        //    smarker = L.marker(new L.LatLng(e.latlng.lat, e.latlng.lng), { icon: sicon }).addTo(map);
        //}
        //else if (!emarker) {
        //    emarker = L.marker(new L.LatLng(e.latlng.lat, e.latlng.lng), { icon: eicon }).addTo(map);
        //}
        //else {
        //    map.removeLayer(smarker);
        //    map.removeLayer(emarker);
        //    smarker = null;
        //    emarker = null;
        //}
    }

    function getnerstops(lat, lng, rd) {
       // markers.clearLayers();
     
        if ($scope.stops) {
            console.log(lat);
            for (var i = 0; i < $scope.stops.length; i++) {
                var bus = $scope.stops[i];
                for (var s = 0; s < bus.stops.length; s++) {
                    var stop = bus.stops[s];
                    var d = calcCrow(lat, lng, stop.lat, stop.lng);
                    if (d < rd) {
                      


                        L.marker([$scope.stops[i].stops[s].lat, $scope.stops[i].stops[s].lng], { icon: icon }).addTo(map)
                .bindPopup(bus.no + "." + stop.name).openPopup().on('click', L.bind(markerclick, null, stop));

                        //L.circle([$scope.stops[i].stops[s].lat, $scope.stops[i].stops[s].lng], 100, {
                        //    color: $scope.stops[i].stops[s].color, fillColor: $scope.stops[i].stops[s].color,
                        //    fillOpacity: 0.3
                        //}).addTo(markers).bindPopup(bus.no + "." + stop.name).openPopup().on('click', L.bind(markerclick, null, stop));

                       // L.marker(new L.LatLng(stop.lat, stop.lng), { icon: icon }).addTo(markers).bindPopup(bus.no + "." + stop.name).openPopup().on('click', L.bind(markerclick, null, stop));
                    
                    }

                }
            }
        }
    }
    function toRad(Value) {
        return Value * Math.PI / 180;
    }
    function calcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }
    $scope.clears = function(idx){
        if (idx == 0) {
            var t = $scope.tp.shift();
        }
        else {
            var t = $scope.tp.pop();
        }
    }
    $scope.goroute = function () {
        $rootScope.tp = $scope.tp;
        $location.path('/route').search({ tp: $scope.tp });
    }
    //function onLocationFound(e) {
    //    var radius = e.accuracy / 2;

    //    L.marker(e.latlng).addTo(map)
    //        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    //    map = L.map('map').setView(e.latlng, 14);
    //}

    //map.on('locationfound', onLocationFound);

   
   
   // FindsNearBus(gs[7]);

    // Converts numeric degrees to radians
    

   // BindBusInfo();
   

   
});

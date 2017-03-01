"use strict";

angular.module("ngapp").controller("MapController", function ($http, $rootScope, shared, $state, $scope, $location, $cordovaInAppBrowser, $window) {
    

    if ($rootScope.mapinfo) {
        
        var mapinfo = $rootScope.mapinfo;
        console.log(mapinfo);
        var markers = new L.FeatureGroup();
        var paths = mapinfo.paths;
        console.log(paths.path[0]);

        var map = L.map('map').setView(new L.LatLng(paths.path[0][1], paths.path[0][0]), 12);
        map.addLayer(markers);

        var mapLink =
         '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
          'http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
              attribution: '&copy; ' + mapLink + ' Contributors',
              maxZoom: 18,
          }).addTo(map);
       
           
        

            //if (i==0) {
            //    //   map.panTo(new L.LatLng(paths.path[0], paths.path[1]));
            //    console.log(paths.path[0]);
            //    map.setView([paths.path[0]], 15);
            //}

            
            var myLines = [{
                "type": "LineString",
                "coordinates": paths.path
            }];

            var myStyle = {
                "color": changecolor(paths.color),
                "weight": 5,
                "opacity": 1
            };

            L.geoJSON(myLines, {
                style: myStyle
            }).addTo(map).bindPopup("No " + paths.no + " " + paths.name);

            for (var i = 0; i < paths.stops.length; i++) {

            }
        
    }
    else {
        $location.path("/buses");
    }
















    //L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYXVuZ3BoeW9raGluZSIsImEiOiJjaXh4NTVjeGcwMDFvMzJxdWdzNW8xNXdoIn0.ScCw9S1FXeiTGlmHdpUW-A', {
        //L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
        //maxZoom: 18,
        //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		//	'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		//	'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        //id: 'mapbox.streets'
        //}).addTo(map);

   //   var  mapLink =
   //   '<a href="http://openstreetmap.org">OpenStreetMap</a>';
   //     L.tileLayer(
   //       'http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
   //           attribution: '&copy; ' + mapLink + ' Contributors',
   //           maxZoom: 18,
   //       }).addTo(map);

   // if (navigator.geolocation) {
   //    // navigator.geolocation.getCurrentPosition(showPosition);
   // } else {
   //    console.log("Geolocation is not supported by this browser.");
   // }
   // function showPosition(position) {
   //     getnerstops(position.coords.latitude, position.coords.longitude,1);
   //     map.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude));
       
   //     //L.marker(new L.LatLng(position.coords.latitude, position.coords.longitude)).addTo(map)
   //     //        .bindPopup("You are within  meters from this point").openPopup();

   // }

   // map.on('click', function (e) {
   //     //alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
   //     getnerstops(e.latlng.lat, e.latlng.lng,1);
   // });
   // $http.get('/assets/data/stops.js')
   //.then(function (result) {
   //    $scope.stops = result.data;
      
   //});

   // $http.get('/assets/data/paths.js')
   // .then(function (result) {
   //     $scope.paths = result.data;
   //     for (var i = 0; i < $scope.paths.length; i++) {
   //       //  console.log($scope.paths[i]);
   //         var myLines = [{
   //             "type": "LineString",
   //             "coordinates": $scope.paths[i].path
   //         }];

   //         var myStyle = {
   //             "color":  changecolor($scope.paths[i].color) ,
   //             "weight": 3,
   //             "opacity": .3
   //         };

   //         L.geoJSON(myLines, {
   //             style: myStyle
   //         }).addTo(map).bindPopup("No " + $scope.paths[i].no + " " + $scope.paths[i].name );

   //     }

   // }, function (err) {
   //     console.log(err);
   // });
    

   // var icon = L.icon({
   //     iconUrl: "assets/css/images/marker-icon.png",
   //     //shadowUrl: 'leaf-shadow.png',
   //     opacity: .6,
   //     iconSize: [30,50], // size of the icon
   //     shadowSize: [50, 64], // size of the shadow
   //     iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
   //     shadowAnchor: [4, 62],  // the same for the shadow
   //     popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
   // });

   // var sicon = L.icon({
   //     iconUrl: "assets/css/images/start.png",
   //     //shadowUrl: 'leaf-shadow.png',

   //     iconSize: [50, 50], // size of the icon
   //     shadowSize: [50, 64], // size of the shadow
   //     iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
   //     shadowAnchor: [4, 62],  // the same for the shadow
   //     popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
   // });

   // var eicon = L.icon({
   //     iconUrl: "assets/css/images/end.png",
   //     //shadowUrl: 'leaf-shadow.png',

   //     iconSize: [50, 50], // size of the icon
   //     shadowSize: [50, 64], // size of the shadow
   //     iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
   //     shadowAnchor: [4, 62],  // the same for the shadow
   //     popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
   // });
   
   
   // var trip = [];
   // var cs;
   // function markerclick(stop) {
   //     if (cs == stop) {
   //         if (trip.length >= 2) {
   //             var p = trip.shift();
   //         }

   //         trip.push(stop);
   //         $scope.tp = trip;
   //         console.log($scope.tp);
   //         $scope.$apply();
   //     }
   //     else {
   //         cs = stop;
   //     }
       
   //     //if (!smarker) {
   //     //    smarker = L.marker(new L.LatLng(e.latlng.lat, e.latlng.lng), { icon: sicon }).addTo(map);
   //     //}
   //     //else if (!emarker) {
   //     //    emarker = L.marker(new L.LatLng(e.latlng.lat, e.latlng.lng), { icon: eicon }).addTo(map);
   //     //}
   //     //else {
   //     //    map.removeLayer(smarker);
   //     //    map.removeLayer(emarker);
   //     //    smarker = null;
   //     //    emarker = null;
   //     //}
   // }

   // function getnerstops(lat, lng, rd) {
   //    // markers.clearLayers();
     
   //     if ($scope.stops) {
   //         console.log(lat);
   //         for (var i = 0; i < $scope.stops.length; i++) {
   //             var bus = $scope.stops[i];
   //             for (var s = 0; s < bus.stops.length; s++) {
   //                 var stop = bus.stops[s];
   //                 var d = calcCrow(lat, lng, stop.lat, stop.lng);
   //                 if (d < rd) {
                      
   //                     L.marker(new L.LatLng(stop.lat, stop.lng), { icon: icon }).addTo(markers).bindPopup(bus.no + "." + stop.name).openPopup().on('click', L.bind(markerclick, null, stop));
                    
   //                 }

   //             }
   //         }
   //     }
   // }
   // function toRad(Value) {
   //     return Value * Math.PI / 180;
   // }
   // function calcCrow(lat1, lon1, lat2, lon2) {
   //     var R = 6371; // km
   //     var dLat = toRad(lat2 - lat1);
   //     var dLon = toRad(lon2 - lon1);
   //     var lat1 = toRad(lat1);
   //     var lat2 = toRad(lat2);

   //     var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
   //       Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
   //     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
   //     var d = R * c;
   //     return d;
   // }

   // $scope.goroute = function () {
   //     $rootScope.tp = $scope.tp;
   //     $location.path('/route').search({ tp: $scope.tp });
   // }
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

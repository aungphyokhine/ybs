"use strict";

angular.module("ngapp").controller("StopController", function ($interval,$location, $stateParams, $rootScope, shared, $state, $scope, $mdSidenav, $mdComponentRegistry, $cordovaInAppBrowser, $window, $http) {
    var from;
    var to;
    $http.get('assets/data/stops.js')
                 .then(function (result) {
                     $scope.stops = result.data;
                    // console.log($scope.stops);
                     $interval(search,1000);
                    
                     for (var i = 0; i < $scope.stops.length; i++) {
                         for (var j = 0; j < $scope.stops[i].stops.length; j++) {
                             $scope.stops[i].stops[j].color = changecolor($scope.stops[i].stops[j].color);
                         }

                     }


                 });
    $http.get('assets/data/townships.js')
              .then(function (result) {
                  $scope.townships = result.data;
               //   console.log($scope.townships);
               



              });
    $scope.search = function () {
        console.log('search');
        search();
    }
    $scope.startchoice = function (fs) {
 
        $scope.sc = fs;

    }
    $scope.tochoice = function (ts) {
       
        $scope.tc = ts;
    }

    $scope.clearcs = function () {
        $scope.sc = null;
    }
    $scope.clearct = function () {
        $scope.tc = null;
    }

    $scope.goroute = function () {
        var tp = [];
        if ($scope.tc.stopid != $scope.sc.stopid) {
            tp.push($scope.sc);
            tp.push($scope.tc);
            $rootScope.tp = tp;
            $location.path('/route');
        }
       
    }

    function get(input1, input2) {
         var list=[];
        for (var i = 0; i < $scope.stops.length; i++) {
            for (var j = 0; j < $scope.stops[i].stops.length; j++) {
                var n = $scope.stops[i].stops[j].name;
                //console.log(n);
                if (n.indexOf(input1) > -1 || n.indexOf(input2) > -1) {
                    console.log(n);
                    $scope.stops[i].stops[j].no = $scope.stops[i].no;
                    $scope.stops[i].stops[j].tn = $scope.townships[$scope.stops[i].stops[j].tid];
                    list.push($scope.stops[i].stops[j]);
                    break;
                }
            }
            
        }

        return list;
    }

    function search() {

        if ($scope.from != from && $scope.from.length > 2) {
            var input1 = $scope.from.trim();
            var input2 = Z1_Uni(input1);
            console.log('search' + input2);
            from = $scope.from;
            var fromlist = get(input1, input2);
           
            $scope.fromlist = fromlist;
        }

        if ($scope.to != to && $scope.to.length > 2) {
            var input1 = $scope.to.trim();
            var input2 = Z1_Uni(input1);
            console.log('search' + input2);
            to = $scope.to;
            var tolist = get(input1, input2);
    
            $scope.tolist = tolist;
        }
    }


  
    //var markers = new L.FeatureGroup();
    //var map = L.map('map').setView([17.0995334, 96.2255428], 13);
    //map.addLayer(markers);

    //map.on('click', function (e) {
    //    getnerstops(e.latlng.lat, e.latlng.lng, 1);
    //});

  
    //L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
    //maxZoom: 18,
    //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    //	'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    //	'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    //id: 'mapbox.streets'
    //}).addTo(map);


    //var icon = L.icon({
    //    iconUrl: "assets/css/images/marker-icon-blue.png",
    //    //shadowUrl: 'leaf-shadow.png',
    //    opacity: .6,
    //    iconSize: [30, 50], // size of the icon
    //    shadowSize: [50, 64], // size of the shadow
    //    iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
    //    shadowAnchor: [4, 62],  // the same for the shadow
    //    popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
    //});

    
    //function getnerstops(lat, lng, rd) {
    //    if ($scope.stops) {
    //        console.log(lat);
    //        for (var i = 0; i < $scope.stops.length; i++) {
    //            var bus = $scope.stops[i];
    //            for (var s = 0; s < bus.stops.length; s++) {
    //                var stop = bus.stops[s];
    //                var d = calcCrow(lat, lng, stop.lat, stop.lng);
    //                if (d < rd) {

    //                    L.marker(new L.LatLng(stop.lat, stop.lng), { icon: icon }).addTo(markers).bindPopup(bus.no + "." + stop.name).openPopup().on('click', L.bind(markerclick, null, stop));

    //                }

    //            }
    //        }
    //    }
    //}
    //function toRad(Value) {
    //    return Value * Math.PI / 180;
    //}
    //function calcCrow(lat1, lon1, lat2, lon2) {
    //    var R = 6371; // km
    //    var dLat = toRad(lat2 - lat1);
    //    var dLon = toRad(lon2 - lon1);
    //    var lat1 = toRad(lat1);
    //    var lat2 = toRad(lat2);

    //    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    //    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //    var d = R * c;
    //    return d;
    //}

    //function markerclick() {

    //}

});

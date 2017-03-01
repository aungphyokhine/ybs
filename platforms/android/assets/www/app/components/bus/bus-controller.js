"use strict";

angular.module("ngapp").controller("BusController", function ($location, $stateParams, $rootScope, shared, $state, $scope, $mdSidenav, $mdComponentRegistry, $cordovaInAppBrowser, $window, $http) {
    if ($stateParams.bus) {
        ////getting buses data
     

        $http.get('assets/data/paths.js')
     .then(function (result) {
         $scope.paths = result.data[$stateParams.bus.id];

         $http.get('assets/data/buses.js')
      .then(function (result) {
          $scope.buses = result.data;


          for (var i = 0; i < $scope.buses.length; i++) {

              $scope.buses[i].color = changecolor($scope.buses[i].color);
          }


          $scope.stopsshow = [];
          ////getting transist data
          $http.get('assets/data/transists.js')
                 .then(function (transits) {


                     $scope.tinfo = transits.data[$stateParams.bus.id];

                     $scope.bus = $scope.buses[$stateParams.bus.id];


                     //getting stops
                     $http.get('assets/data/stops.js')
                       .then(function (result) {
                           $scope.stops = result.data;
                           var stops = $scope.stops[$scope.tinfo.id].stops;
                           var tstops = $scope.tinfo.stops;
                           for (var i = 0; i < stops.length; i++) {

                               var tsbuses = [];
                               for (var s = 0; s < tstops[i].ts.length; s++) {

                                   tsbuses.push($scope.buses[tstops[i].ts[s].bid]);
                               }
                               stops[i].ts = tsbuses;


                           }
                           console.log(stops);
                           $scope.viewstops = stops;


                       });





                 }, function (err) {
                     console.log(err);
                 });

      }, function (err) {
          console.log(err);
      });

     });

      


        $scope.gomap = function () {
            var pts = $scope.paths;
           
            $rootScope.mapinfo = { paths: pts, stops: $scope.stops[$stateParams.bus.id] };
            console.log($rootScope.mapinfo);
             $location.path("/map");
        }

    }
    else {
        $location.path("/buses");
    }


  



});

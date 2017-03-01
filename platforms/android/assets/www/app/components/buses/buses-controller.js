"use strict";



angular.module("ngapp").controller("BusesController", function ($rootScope, shared, $state, $scope, $mdSidenav, $mdComponentRegistry, $cordovaInAppBrowser, $window, $http) {
   
  

    $http.get('assets/data/buses.js')
      .then(function (result) {
          $scope.buses = result.data;
          for (var i = 0; i < $scope.buses.length; i++) {
              $scope.buses[i].color = changecolor($scope.buses[i].color);
            //  $scope.buses[i].no = tommno($scope.buses[i].no);
             
          }

      }, function (err) {
          console.log(err);
      });



    //$scope.bs = [];
    //for (var i = 0; i < buses.length; i++) {
    //    var bus = buses[i];
    //    if (bus.color == "blue") {
    //        bus.color = "#405caa";
    //    }
    //    else if (bus.color == "red") {
    //        bus.color = "#f2534d";
    //    }
    //    else if (bus.color == "green") {
    //        bus.color = "#2c8a6c";
    //    }
    //    else if (bus.color == "brown") {
    //        bus.color = "#86603e";
    //    }
    //    else if (bus.color == "violet") {
    //        bus.color = "#96509f";
    //    }
    //    $scope.bs.push(bus);
    //}
  
});

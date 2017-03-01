"use strict";

angular.module("ngapp").controller("FindbusController", function ($interval,$location, $stateParams, $rootScope, shared, $state, $scope, $mdSidenav, $mdComponentRegistry, $cordovaInAppBrowser, $window, $http) {
    var from;
    var to;
    $http.get('assets/data/stops.js')
                 .then(function (result) {
                     $scope.stops = result.data;
                     console.log($scope.stops);
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
                 console.log($scope.townships);




             });
    $http.get('assets/data/transists.js')
             .then(function (result) {
                 $scope.transists = result.data;
                 console.log($scope.townships);




             });
    $http.get('assets/data/buses.js')
            .then(function (result) {
                $scope.buses = result.data;
                console.log($scope.buses);




            });
   
    $scope.search = function () {
        console.log('search');
        search();
    }
    $scope.startchoice = function (fs) {
        $scope.sc = fs;
        console.log(fs);
        var ts = $scope.transists[fs.busid];

        for (var i = 0; i < ts.stops.length; i++) {
            if (ts.stops[i].sid == fs.stopid) {
                console.log(ts.stops[i].ts);
                $scope.tsstops = ts.stops[i].ts;
                $scope.nbstops = ts.stops[i].nb;



               
                for (var t = 0; t < $scope.tsstops.length; t++) {
                    $scope.tsstops[t].color =  changecolor($scope.buses[$scope.tsstops[t].bid].color);
                    $scope.tsstops[t].no = $scope.buses[$scope.tsstops[t].bid].no;
                }

                for (var n = 0; n < $scope.nbstops.length; n++) {
                    $scope.nbstops[n].color = changecolor( $scope.buses[$scope.tsstops[n].bid].color);
                    $scope.nbstops[n].no = $scope.buses[$scope.tsstops[n].bid].no;
                }

                break;
            }
        }
        //console.log(ts.stops[fs.stopid].ts);

        console.log(ts);
    }

    $scope.clearcs = function () {
        $scope.sc = null;
    }

    $scope.goroute = function () {
        var tp = [];
        tp.push($scope.sc);
        tp.push($scope.tc);
        $rootScope.tp = tp;
        $location.path('/route').search({ tp: tp });
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
            $scope.fromlist = get(input1, input2);
           
           
        }

 
    }

});

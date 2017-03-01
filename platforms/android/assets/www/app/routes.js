"use strict";

angular.module("ngapp").config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/buses");

    $stateProvider.state("main", {
        url: "/main",
        
        templateUrl: "app/components/main/main.html",
        title: "Cordova Angular-Material",
        controller: "MainController",
        controllerAs: "main"
    })
        .state("stop", {
            url: "/stop",
            templateUrl: "app/components/stop/stop.html?9",
            title: "Cordova Angular-Material",
            controller: "StopController",
            controllerAs: "stop"
        })
    .state("buses", {
        url: "/buses",      
        templateUrl: "app/components/buses/buses.html?9",
        title: "Cordova Angular-Material",
        controller: "BusesController",
        controllerAs: "buses"
    })
    .state("route", {
        url: "/route",
        params: { tp: null, },
        templateUrl: "app/components/route/route.html?9",
             title: "Cordova Angular-Material",
             controller: "RouteController",
             controllerAs: "buses"
    })
         .state("map", {
             url: "/map",
             templateUrl: "app/components/map/map.html?9",
             title: "Cordova Angular-Material",
             controller: "MapController",
             controllerAs: "map"
         })
                 .state("findbus", {
                     url: "/findbus",
                     params: { tp: null, },
                     templateUrl: "app/components/findbus/findbus.html?9",
                     title: "Cordova Angular-Material",
                     controller: "FindbusController",
                     controllerAs: "findbus"
                 })
    .state("bus", {
        url: "/bus",
        params: { bus: null, },
        templateUrl: "app/components/bus/bus.html",
        title: "Cordova Angular-Material",
        controller: "BusController",
        controllerAs: "bus"
    });
}]);

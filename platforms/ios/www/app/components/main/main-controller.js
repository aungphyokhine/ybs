"use strict";

angular.module("ngapp").controller("MainController", function ($rootScope,shared, $state, $scope, $mdSidenav, $mdComponentRegistry, $cordovaInAppBrowser) {

    var ctrl = this;

    this.auth = shared.info.auth;

    



    var options = {
        location: 'yes',
        clearcache: 'yes',
        toolbar: 'no'
    };
   

    


    //   $cordovaInAppBrowser.close();

  
    $rootScope.$on('$cordovaInAppBrowser:loadstart', function (e, event) {
        alert(1);
    });

    //inAppBrowserRef.addEventListener('loadstart', function (e, event) {
    //    console.log(event);
    //    //// insert CSS via code / file
    //    //$cordovaInAppBrowser.insertCSS({
    //    //    code: 'body {background-color:blue;}'
    //    //});

    //    // insert Javascript via code / file
    //    //$cordovaInAppBrowser.executeScript({
    //    //    file: 'script.js'
    //    //});
    //});

    $rootScope.$on('$cordovaInAppBrowser:loaderror', function (e, event) {

    });

    $rootScope.$on('$cordovaInAppBrowser:exit', function (e, event) {
        alert(2);
    });


    $scope.fbLogin = function () {
        $cordovaInAppBrowser.open('http://ngcordova.com', '_blank', options)
           .then(function (event) {
               // success
               //console.log(event);
           })
           .catch(function (event) {
               // error
               alert(1);
           });

        $rootScope.$on('$cordovaInAppBrowser:loadstart', function (e, event) {
            alert(JSON.stringify(event));
        });

        $rootScope.$on('$cordovaInAppBrowser:loadstop', function (e, event) {
            // insert CSS via code / file
            $cordovaInAppBrowser.insertCSS({
                code: 'body {background-color:blue;}'
            });

            // insert Javascript via code / file
            $cordovaInAppBrowser.executeScript({
                file: 'script.js'
            });
        });

        $rootScope.$on('$cordovaInAppBrowser:loaderror', function (e, event) {
            alert(4);
        });

        $rootScope.$on('$cordovaInAppBrowser:exit', function (e, event) {
            alert(5);
        });
        //console.log('fb login');
        //Parse.FacebookUtils.logIn(null, {
        //    success: function (user) {
        //        if (!user.existed()) {
        //            console.log("User signed up and logged in through Facebook!");
        //        } else {
        //            console.log("User logged in through Facebook!");
        //        }

              
        //    },
        //    error: function (user, error) {
             
        //        console.log("User cancelled the Facebook login or did not fully authorize.");

        //    }
        //});
    }

    $scope.logout = function () {
        //FB.logout(function (response) {
        //    // user is now logged out
        //});

        Parse.User.logOut();
        console.log('log out');
    };
});

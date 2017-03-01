"use strict";

angular.module("ngapp").controller("RouteController", function ($location, $stateParams, $rootScope, shared, $state, $scope, $mdSidenav, $mdComponentRegistry, $cordovaInAppBrowser, $window, $http) {

    if ($rootScope.tp) {
       
    
   console.log($rootScope.tp);
    //if ($rootScope.tp) {
    $scope.tp = $rootScope.tp;
    var halt = 0;
    $scope.routes = [];
    var founds = [];
      
        $http.get('assets/data/transists.js')
                     .then(function (result) {

                         $scope.ts = result.data;
                         //console.log(result.data);
                         $http.get('assets/data/buses.js')
                      .then(function (result) {

                          $scope.bs = result.data;

                          $http.get('assets/data/stops.js')
                     .then(function (result) {
                         $scope.stops = result.data;
                          

                         if ($rootScope.tp[0].no == $rootScope.tp[1].no) {


                             $scope.showroute = [{ color: $rootScope.tp[0].color, no: $rootScope.tp[0].no, name: $rootScope.tp[0].name }, { color: $rootScope.tp[1].color, no: $rootScope.tp[1].no, name: $rootScope.tp[1].name }];
                         }
                         else {
                             var tsend = $scope.ts[getbid($rootScope.tp[1].no)];
                             var ends = [];
                             for (var i = 0; i < tsend.stops.length; i++) {
                                 if ($rootScope.tp[1].stopid == tsend.stops[i].sid) {
                                     for (var j = 0; j < tsend.stops[i].ts.length; j++) {
                                         ends.push(tsend.stops[i].ts[j]);
                                     }
                                 }
                             }
                             console.log(ends);
                             if (ends.length > 0) {
                                 for (var k = 0; k < ends.length; k++) {
                                     getpaths({ no: $rootScope.tp[0].no, sid: $rootScope.tp[0].stopid }, { no: getbno(ends[k].bid), sid: ends[k].sid });
                                 }
                             }

                             getpaths({ no: $rootScope.tp[0].no, sid: $rootScope.tp[0].stopid }, { no: $rootScope.tp[1].no, sid: $rootScope.tp[1].stopid });

                             //getpaths({ no: $rootScope.tp[0].no, sid: $rootScope.tp[0].stopid }, { no: $rootScope.tp[1].no, sid: $rootScope.tp[1].stopid });
                             // console.log(founds);

                             $scope.showroute;
                             for (var r = 0; r < $scope.routes.length; r++) {
                                 if (!$scope.showroute) {
                                     $scope.showroute = $scope.routes[r];
                                 }
                                 else {
                                     if ($scope.showroute.length > $scope.routes[r].length) {
                                         $scope.showroute = $scope.routes[r];
                                     }
                                 }
                             }

                             for (var t = 0; t < $scope.showroute.length; t++) {
                                 $scope.showroute[t].color = changecolor($scope.showroute[t].color);
                             }

                         }
                         
                         
                          function getpaths(b1, b2) {
                              var id = getbid(b1.no);
                              findpath(b1.no, b2.no, 0, [b1.no], $scope.ts[id], ['T']);
                              var pl = [];
                              for (var i = 0; i < founds.length; i++) {
                                  var ps = JSON.parse(founds[i].ps);
                                  var nf = JSON.parse(founds[i].nf);
                                  var pp = [];
                                  for (var j = 0; j < ps.length; j++) {
                                      pp.push({ ps: ps[j], nf: nf[j] });
                                  }

                                  pl.push(pp);
                              }

                              if (pl.length == 0) {
                                  $scope.nodata = true;
                                  return;
                              }
                              else {
                                  $scope.nodata = false;
                              }
                              
                              var gates = [];
                              // for (var i = 0; i < pl.length; i++) {


                              //selecting shortest route
                              var plsize = 100000;
                              var temppl = [];
                              for (var i = 0; i < pl.length; i++) {
                                  if (pl[i].length < plsize) {
                                      temppl = [pl[i]];
                                      plsize = pl[i].length;
                                  }
                              }
                              pl = temppl;

                              for (var i = 0; i < 1; i++) {
                                  var pinfo = [];
                                  var ss = b1.sid;
                                  pinfo.push(b1);
                                  for (var j = 0; j < pl[i].length - 1; j++) {
                                      //console.log(pl[i][j].ps);
                                      var bn1 = pl[i][j].ps;
                                      var bn2 = pl[i][j + 1].ps;
                                      //  console.log(bn1 + '-' + bn2);
                                      var fstop = findneareststops(bn1, bn2, ss);
                                      // console.log(fstop);
                                      if (fstop) {
                                          //1 = fstop.sid;

                                          //if (fstop.d != 0) {
                                          pinfo.push(fstop.b1);
                                          pinfo.push(fstop.b2);

                                          ss = fstop.b2.sid;
                                          //  }


                                      }

                                  }
                                  pinfo.push(b2);
                                  console.log(">>>>>");
                                  //removing dup gate
                                  var pno;
                                  var pname;
                                  //  console.log(pinfo);
                                  for (var k = 0 ; k < pinfo.length; k++) {
                                      var fs = findstop(pinfo[k]);
                                      console.log(fs);
                                      if (fs) {

                                          if (fs.no == pno && pname == fs.name) {
                                              var g = gates.pop();
                                          }
                                          else {
                                              pno = fs.no;
                                              pname = fs.name;
                                              gates.push(fs);
                                          }

                                      }

                                  }



                              }

                              for (var i = 0; i < gates.length; i++) {
                                  gates[i].color = gates[i].color;//changecolor(gates[i].color);
                              }

                              $scope.routes.push(gates);
                              // console.log(pl);
                          }

                          function getbid(no) {
                              var bid;
                              for (var j = 0 ; j < $scope.bs.length; j++) {
                                  if ($scope.bs[j].no == no) {
                                      return $scope.bs[j].id;
                                  }
                              }
                              return null;
                          }

                          function getbno(id) {
                              var bid;
                              for (var j = 0 ; j < $scope.bs.length; j++) {
                                  if ($scope.bs[j].id == id) {
                                      return $scope.bs[j].no;
                                  }
                              }
                              return null;
                          }

                          function findstop(stop) {

                              var id = getbid(stop.no);
                              var stops = $scope.stops[id].stops;

                              for (var i = 0; i < stops.length; i++) {
                                  if (stops[i].stopid == stop.sid) {
                                      return stops[i];
                                  }


                              }

                              return null;
                          }



                          function findneareststops(no1, no2, s1) {
                              var bid1 = getbid(no1);
                              var bid2 = getbid(no2);
                              var ts1 = $scope.ts[bid1];
                              var stops = ts1.stops;

                              console.log('findneareststops' + no1 + "-" + no2 + "-" + s1);
                              var stops = $scope.stops[bid1].stops;

                              for (var i = 0; i < stops.length; i++) {
                                  if (stops[i].stopid == s1) {
                                      console.log(s1);
                                      console.log("--" + stops[i].name);
                                  }


                              }



                              // console.log(ts1);

                              var ss = s1;
                              var d = 1000000;
                              var ssid = 0;
                              var seid = 0;
                              for (var t = 0; t < ts1.stops.length; t++) {
                                  //console.log(no2);
                                  //  console.log('++++++++++++');
                                  //  console.log(ts1.stops[t]);

                                  for (var s = 0; s < ts1.stops[t].ts.length; s++) {
                                      if (ts1.stops[t].ts[s].bid == bid2) {
                                          //  console.log("d cal:" + s1 + "-" + ts1.stops[t].sid);
                                          var ds = Math.abs(s1 - ts1.stops[t].sid);
                                          if (ds < d) {
                                              d = ds;
                                              ssid = ts1.stops[t].sid;
                                              seid = ts1.stops[t].ts[s].sid
                                              //   console.log("found" + ts1.stops[t].sid + " D:" + d);
                                          }


                                          //    console.log(ts1.stops[t].ts[s].sid);
                                          //var ds = Math.abs(ss - ts1.stops[t].ts[s].sid);
                                          //if (ds < d) {
                                          //    ssid = ts1.stops[t].sid;
                                          //    seid = ts1.stops[t].ts[s].sid
                                          //}
                                          // break;
                                          //console.log(stops[t]);
                                          // var tstops = JSON.stringify(ts1.stops[t].ts);
                                          // console.log(tstops);
                                          // return findgap(s1, ts1.stops, JSON.stringify(ts1.stops[t].ts));
                                          // break;
                                      }


                                  }

                              }

                              //var stops = $scope.stops[bid1].stops;

                              //for (var i = 0; i < stops.length; i++) {


                              //    if (stops[i].stopid == ssid) {
                              //        console.log(ssid);
                              //        console.log(stops[i].name);
                              //    }

                              //}


                              //stops = $scope.stops[bid2].stops;
                              //for (var i = 0; i < stops.length; i++) {

                              //    if (stops[i].stopid == seid) {
                              //        console.log(stops[i].name);
                              //    }

                              //}

                              console.log("shortest" + bid1 + "----" + ssid + " D:" + d);

                              return { b1: { sid: ssid, no: no1 }, b2: { sid: seid, no: no2 }, d: d };

                              //var idx = 0;
                              //for (var i = 0; i < stops.length; i++) {
                              //    if (stops[i].sid == s1) {
                              //        idx = i;
                              //        break;
                              //    }
                              //}
                              //console.log(idx);
                              //var before = stops.splice(i, (stops.length - i) - 1).reverse();
                              //var after = stops.splice(0, i + 1);

                              //for (var b = 0; b < before.length; b++) {
                              //    if (before[b].ts.indexOf(no2)) {
                              //        console.log(before[b]);
                              //        console.log(b);
                              //        break;
                              //    }
                              //}
                              //for (var b = 0; b < after.length; b++) {
                              //    if (after[b].ts.indexOf(no2)) {
                              //        console.log(after[b]);
                              //        console.log(b);
                              //        break;
                              //    }
                              //}

                              //console.log(stops);
                              //var rstops = stops.reverse();            
                              //var r = rstops.shift();
                              //var fstops = stops.concat(rstops);

                              //  var route = stops.concat(stops.reverse());

                          }

                       
                          function findpath(no1, no2, ds, ps, tn, nf) {

                              var ts = tn.ts;
                              var nb = tn.nb;

                              if (halt > 10000) {
                                  console.log('halt');
                                  return null;
                              }
                              if (ps.length > 10) {
                                  console.log('too long');
                                  return null;
                              }

                              halt++;
                              ds++;
                              if (no1 == no2) {

                                  console.log('found 1');
                                  ps.push(no2);
                                  nf.push('T');
                                  founds.push({ ps: JSON.stringify(ps), nf: JSON.stringify(nf) });
                                  console.log(ps);
                                  console.log(nf);
                              }
                              else {
                                  // console.log('ts search' + no1);
                                  // console.log(ts);

                                  if (ts.indexOf(no2) >= 0) {
                                      ps.push(no2);
                                      nf.push('T');
                                      console.log('found 2');
                                      founds.push({ ps: JSON.stringify(ps), nf: JSON.stringify(nf) });
                                      console.log(ps);
                                      console.log(nf);
                                      return null;
                                  }
                                  else {
                                      for (var i = 0 ; i < ts.length; i++) {

                                          // console.log('loop' + ts[i] + "," + no2);
                                          //console.log("tsi" + ts[i]);



                                          if (ps.indexOf(ts[i]) < 0) {

                                              var bid = getbid(ts[i]);
                                              ps.push(ts[i]);
                                              nf.push('T');
                                              findpath(ts[i], no2, ds, ps, $scope.ts[bid], nf);
                                          }
                                          else {
                                              //console.log("ps sop");

                                          }
                                      }

                                  }


                                  if (nb.indexOf(no2) >= 0) {
                                      ps.push(no2);
                                      nf.push('N');
                                      console.log('found 2');
                                      founds.push({ ps: JSON.stringify(ps), nf: JSON.stringify(nf) });
                                      console.log(ps);
                                      console.log(nf);
                                      return null;
                                  }
                                  else {
                                      for (var i = 0 ; i < nb.length; i++) {

                                          // console.log('loop' + ts[i] + "," + no2);
                                          //console.log("tsi" + ts[i]);



                                          if (ps.indexOf(nb[i]) < 0) {

                                              var bid = getbid(nb[i]);
                                              ps.push(nb[i]);
                                              nf.push('N');
                                              findpath(nb[i], no2, ds, ps, $scope.ts[bid], nf);
                                          }
                                          else {
                                              //console.log("ps sop");

                                          }
                                      }

                                  }





                              }
                              return null;
                          }

                        
                          function findroute(bno1, bno2, ds, pt) {
                              if (halt > 1000) {
                                  console.log('halt');
                                  return null;
                              }

                              ds++;
                              halt++;

                              if (bno1 == bno2) {

                                  console.log('end:' + bno1 + "," + ds);
                                  console.log(pt);
                                  return { b1: bno1, b2: bno2 };


                              }
                              else {
                                  var bid;
                                  for (var j = 0 ; j < $scope.bs.length; j++) {
                                      if ($scope.bs[j].no == bno1) {
                                          bid = $scope.bs[j].id;
                                          break;
                                      }
                                  }

                                  var tsg = $scope.ts[bid];
                                  var bts = tsg.ts;
                                  for (var i = 0; i < bts.length; i++) {


                                      if (bts[i] == bno2) {
                                          console.log('end:' + bno1 + "," + ds);
                                          console.log(pt);
                                          return { b1: bno1, b2: bno2 };
                                          break;
                                      }
                                      else {

                                          if (ds <= $scope.bs.length) {
                                              pt.push(bts[i]);
                                              console.log('loop:' + bts[i] + "," + ds);
                                              findroute(bts[i], bno2, ds, pt);
                                          }
                                          else {

                                              console.log('not found:' + bno1 + "," + ds);
                                              break;
                                          }
                                      }
                                  }

                              }
                              return false;
                          }







                     });

                      });



                     });

       
        // }
    }
    else {
        $location.path("/stop");
    }
});

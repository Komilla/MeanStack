'use strict';


var angular = require('angular');
require('angular-route');
window.$ = window.jQuery = require('jquery');
require('bootstrap');
require('angularjs-dropdown-multiselect');
require('../css/app.scss');

var app = angular.module('movieApp', [ 'ngRoute', 'angularjs-dropdown-multiselect' ]);


require('./controller');
require('./service');

app.config(function($routeProvider) {

  $routeProvider.when('/', {
    templateUrl: 'views/home.html',
    controller: 'HomeController',
    access: {restricted: true}
  })
  .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController',
      access: {restricted: false}
    })
    .when('/logout', {
      templateUrl: 'views/logout.html',
      controller: 'LogoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterController',
      access: {restricted: false}
    })
  .when('/cancellation', {
    templateUrl: 'views/cancellation.html',
    controller: 'CancellationController'
  })
  .when('/admin', {
    templateUrl: 'views/admin.html',
    controller: 'AdminController',
    access: {restricted: true}
  })
  .when('/searchmovie', {
    templateUrl: 'views/searchmovie.html',
    controller: 'SearchmovieController'
  })
  .when('/seatselection', {
    templateUrl: 'views/seatselection.html',
    controller: 'SeatselectionController'
  })
  .when('/booking', {
    templateUrl: 'views/booking.html',
    controller: 'BookingController'
  })
  .when('/rating', {
    templateUrl: 'views/rating.html',
    controller: 'RatingController'
  })
  .otherwise({
    redirectTo: '/',
  });
});
//
// app.run(function ($rootScope, $location, $route, AuthService) {
//   $rootScope.$on('$routeChangeStart',
//     function (event, next, current) {
//       AuthService.getUserStatus()
//       .then(function(){
//         if (next.access.restricted && !AuthService.isLoggedIn()){
//           $location.path('/login');
//           $route.reload();
//         }
//       });
//   });
// });

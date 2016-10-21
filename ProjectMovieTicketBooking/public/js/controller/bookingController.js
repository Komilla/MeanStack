'use strict';

module.exports = function($scope, $http) {

    $scope.booking = 'booking';

    var refresh = function () {
          $http.get('/stim/getstim').success(function (response) {
              console.log('READ IS SUCCESSFUL');
              $scope.mybookinglist = response;
              $scope.mybooking = "";
          });
      };

      refresh();

      $scope.addBook = function () {
          console.log($scope.mybooking);
          $http.post('/book/book', $scope.mybooking).success(function (response) {
              console.log(response);
              console.log("CREATE IS SUCCESSFUL");
              refresh();
          });
      };

      $scope.removeBook = function (id) {
          console.log(id);
          $http.delete('/book/book/' + id._id).success(function (response) {
              console.log(response);
              console.log('DELETED SUCCESSFULLY');
              refresh();
          });
      };

      $scope.editBook = function (id) {
           $http.get('/book/book/' + id._id).success(function (response) {
              $scope.mybooking = response[0];
          });
      };

      $scope.updateBook = function () {
          console.log("REACHED UPDATE");
          console.log($scope.mybooking._id);
          $http.put('/book/book/' + $scope.mybooking._id, $scope.mybooking).success(function (response) {
              console.log(response);
              refresh();
          })
      }

  };

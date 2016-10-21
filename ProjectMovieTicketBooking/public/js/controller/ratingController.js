'use strict';

module.exports = function($scope, $http) {

    $scope.rating = 'rating';
    $scope.myrate = 'myrate';

    var refresh = function () {
          $http.get('/rate/rate').success(function (response) {
              console.log('READ IS SUCCESSFUL');
              $scope.myratinglist = response;
              $scope.myrating = "";
          });
      };

      refresh();

      $scope.addRate = function () {
          console.log($scope.myrating);
          $http.post('/rate/rate', $scope.myrating).success(function (response) {
              console.log(response);
              console.log("CREATE IS SUCCESSFUL");
              refresh();
          });
      };

      $scope.removeRate = function (id) {
          console.log(id);
          $http.delete('/rate/rate/' + id._id).success(function (response) {
              console.log(response);
              console.log('DELETED SUCCESSFULLY');
              refresh();
          });
      };

      $scope.editRate = function (id) {
           $http.get('/rate/rate/' + id._id).success(function (response) {
              $scope.myrating = response[0];
          });
      };

      $scope.updateRate = function () {
          console.log("REACHED UPDATE");
          console.log($scope.myrating._id);
          $http.put('/rate/rate/' + $scope.myrating._id, $scope.myrating).success(function (response) {
              console.log(response);
              refresh();
          })
      }

      var viewrating = function () {
            $http.get('/show/getshow').success(function (response) {
                console.log('READ IS SUCCESSFUL');
                $scope.myratelist = response;
                $scope.myrate = "";
            });
        };

        viewrating();

  };

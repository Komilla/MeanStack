'use strict';

module.exports = function($scope, $http)
{
    $scope.whichmovie = "Thanks Mom";
    $scope.whichyear = "2011";
    anymovie(); // default search

    function anymovie() {
      $http.get("http://www.omdbapi.com/?t=" + $scope.whichmovie + "&y=" + $scope.whichyear + "&tomatoes=true&plot=full")
        .then(function(response) {
          $scope.myentirelist = response.data;
        });
    }

    $scope.update = function(movie) {
      $scope.whichmovie = movie.Title;
      $scope.whichyear = movie.Year;
          anymovie(); // search on request
    };

    // $scope.$watch('looking', function() {
    //   anymovie();
    // });

 };

'use strict';
Show.$inject = ['$http'];

function Show($http){
   var _this = this;
    _this.getShow = function () {

         return $http({
            method: 'GET',
            url: '/show/getshow',
        })
        .then(function(response) {
            console.log(response);
            return response.data;
        })
        .catch(function(error) {
            throw error;
        });
    };

    _this.addShow = function (data) {
        //console.log($scope.show);
         return $http({
            method: 'POST',
            url: '/show/addShow',
            data: data,

        })
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
            throw error;
        });
    };

    _this.deleteShow = function (showID) {
        //console.log($scope.show);
          return $http.delete('/show/deleteShow/'+showID)

        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
            throw error;
        });
    };

     _this.editShow = function (showID) {
        //console.log($scope.show);
          return $http({
            method: 'GET',
            url: '/show/getShow/'+showID,
        })
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {

            throw error;
        });
    };

    _this.updateShow = function (show) {
        console.log(show);
          return $http({
            method: 'PUT',
            url: '/show/updateShow/'+show._id,
            data: show
        })
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {

            throw error;
        });
    };
}
module.exports = Show;

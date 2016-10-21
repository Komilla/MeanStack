'use strict';
Stim.$inject = ['$http'];

function Stim($http){
   var _this = this;
    _this.getStim = function () {

         return $http({
            method: 'GET',
            url: '/stim/getstim',
        })
        .then(function(response) {
            console.log(response);
            return response.data;
        })
        .catch(function(error) {
            throw error;
        });
    };

    _this.addStim = function (data) {
        //console.log($scope.stim);
         return $http({
            method: 'POST',
            url: '/stim/addStim',
            data: data,

        })
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
            throw error;
        });
    };

    _this.deleteStim = function (stimID) {
        // console.log($scope.stim);
          return $http.delete('/stim/deleteStim/'+stimID)

        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
            throw error;
        });
    };

     _this.editStim = function (stimID) {
        // console.log($scope.stim);
          return $http({
            method: 'GET',
            url: '/stim/getStim/'+stimID,
        })
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {

            throw error;
        });
    };

    _this.updateStim = function (stim) {
        console.log(stim);
          return $http({
            method: 'PUT',
            url: '/stim/updateStim/'+stim._id,
            data: stim
        })
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {

            throw error;
        });
    };
}
module.exports = Stim;

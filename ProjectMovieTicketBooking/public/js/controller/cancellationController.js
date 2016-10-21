'use strict';

module.exports = function($scope, $http, ) {

  $scope.seatselection = 'seatselection';

  var refresh = function () {
        $http.get('/seat/seat').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.myseatinglist = response;
            $scope.myseating = "";
        });
    };

    refresh();

    $scope.addSeat = function () {
        console.log($scope.myseating);

        $http.post('/seat/seat', $scope.myseating).success(function (response) {
            console.log(response);
            console.log("CREATE IS SUCCESSFUL");
            refresh();
        });
    };

    $scope.removeSeat = function (id) {
        console.log(id);
        $http.delete('/seat/seat/' + id._id).success(function (response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

    // $scope.editSeat = function (id) {
    //      $http.get('/seat/seat/' + id._id).success(function (response) {
    //         $scope.myseating = response[0];
    //     });
    // };
    //
    // $scope.updateSeat = function () {
    //     console.log("REACHED UPDATE");
    //     console.log($scope.myseating._id);
    //     $http.put('/seat/seat/' + $scope.myseating._id, $scope.myseating).success(function (response) {
    //         console.log(response);
    //         refresh();
    //     })
    // }

};

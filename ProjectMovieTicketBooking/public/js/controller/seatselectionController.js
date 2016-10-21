'use strict';

module.exports = function($scope, $http, ) {

/* Controller for seat & amount starts here */

  // Init layout
  $scope.rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
  $scope.cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  // Set reserved and selected
  var reserved = ['D4', 'D5', 'D6', 'D7', 'E4','F4', 'E7', 'F7', 'G4', 'G5', 'G6', 'G7'];
  var selected = [];

  // seat onClick
  $scope.seatClicked = function(seatPos) {
      console.log("Selected Seat: " + seatPos);
      var index = selected.indexOf(seatPos);
      if(index != -1) {
          // seat already selected, remove
          selected.splice(index, 1)
      } else {
          // new seat, push
          selected.push(seatPos);
      }
  }

  // get seat status
  $scope.getStatus = function(seatPos) {
      if(reserved.indexOf(seatPos) > -1) {
          return 'reserved';
      } else if(selected.indexOf(seatPos) > -1) {
          return 'selected';
      }
  }

  // clear selected
  $scope.clearSelected = function() {
      selected = [];
  }

  // show selected
  $scope.showSelected = function() {
        return selected.length;
  }

$scope.seatNumbers = function() {
{if(selected.length > 0)
  {
  return selected;
  }
  else
  {
    return "NONE !!!";
  }
}
}

/* Controller for seat & amount ends here */

/* Controller for CRUD starts here */

  $scope.seatselection = 'seatselection';

  var refresh = function () {
        $http.get('/book/book').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.myseatinglist = response;
            $scope.myseating = "";
        });
    };

    refresh();

    $scope.addSeat = function () {
        console.log($scope.myseating);
        $scope.myseating.seatNo = selected;
        $scope.myseating.amount = selected.length*200*115/100+50;
        $scope.myseating.bookID = $scope.myseatinglist.length;
        $http.post('/seat/seat', $scope.myseating).success(function (response) {
            console.log(response);
            console.log("CREATE IS SUCCESSFUL");
            refresh();
            viewdetails();
        });
    };

    // $scope.removeSeat = function (id) {
    //     console.log(id);
    //     $http.delete('/seat/seat/' + id._id).success(function (response) {
    //         console.log(response);
    //         console.log('DELETED SUCCESSFULLY');
    //         refresh();
    //     });
    // };
    //
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

/* Controller for CRUD ends here */

/* Controller for reading data from the same page starts here */

var viewdetails = function () {

$http.get('/seat/seat').success(function (response) {

console.log('READ IS SUCCESSFUL');

$scope.myseatlist = response;
$scope.myseat = "";
});
};

/* Controller for reading data from the same page ends here */

};

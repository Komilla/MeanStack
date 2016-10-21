'use strict';

module.exports = function($scope, $http, AdminCRUDService) {
  $scope.admin = 'admin';

var collections = ['city', 'show', 'thtr', 'stim'];

var dataRefresh = function (collections) {
        collections.forEach(function(collection){
                                var promise =  AdminCRUDService.getData(collection);
                                    promise.then(function(data){
                                        $scope[`${collection}List`] = data;
                                        $scope[collection] = "";
                                    })
                             });
    };

dataRefresh(collections);

$scope.addData = function(model){
  var serviceName = (Object.keys(model)[0]).substring(0,4);
	var promise =  AdminCRUDService.addData(model, serviceName);
    promise.then(function(data){
        dataRefresh([serviceName]);
    })
}

$scope.deleteData= function(model){
    var serviceName = (Object.keys(model)[1]).substring(0,4);
    var promise =  AdminCRUDService.deleteData(model, serviceName);
    promise.then(function(data){
      dataRefresh([serviceName]);
    })
}

$scope.editData = function(model){
    var serviceName = (Object.keys(model)[1]).substring(0,4);
    var promise =  AdminCRUDService.editData(model, serviceName);
    promise.then(function(data){
        $scope[serviceName] = data[0];
    })
}

$scope.updateData = function(model){
    var serviceName = (Object.keys(model)[1]).substring(0,4);
    var promise =  AdminCRUDService.updateData(model, serviceName);
    promise.then(function(data){
        dataRefresh([serviceName]);
    })
}

 $(document).ready(function() {
    $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });
});

//Theatre
//  var theatreRefresh = function () {
//        var promise =  TheatreService.getTheatre();
//         promise.then(function(data){
//             $scope.theatreList = data;
//             $scope.theatre = "";
//         })
//     };

//     theatreRefresh();

// $scope.addTheatre = function(){
//     var promise =  TheatreService.addTheatre($scope.theatre);
//     promise.then(function(data){
//         theatreRefresh();
//     })

// }

// $scope.deleteTheatre = function(theatre){
//     var promise =  TheatreService.deleteTheatre(theatre._id);
//     promise.then(function(data){
//         theatreRefresh();
//     })
// }

// $scope.editTheatre = function(theatre){
//     var promise =  TheatreService.editTheatre(theatre._id);
//     promise.then(function(data){
//         $scope.theatre = data[0];
//     })
// }

// $scope.updateTheatre = function(){
//     var promise =  TheatreService.updateTheatre($scope.theatre);
//     promise.then(function(data){
//         theatreRefresh();
//     })
// }

// // Show timings
 $scope.example13model = [];
        $scope.example13data = [
            {id: 7, label: "David"},
            {id: 2, label: "Jhon"},
            {id: 3, label: "Lisa"},
            {id: 4, label: "Nicole"},
            {id: 5, label: "Danny"}];

        $scope.example13settings = {
            smartButtonMaxItems: 2,
            smartButtonTextConverter: function(itemText, originalItem) {
                if (itemText === 'Jhon') {
                return 'Jhonny!';
                }

                return itemText;
            }
        };


// // Show timings

// var showTimeRefresh = function () {
//        var promise =  TheatreService.getTheatre();
//         promise.then(function(data){
//             $scope.theatreList = data;
//             $scope.theatre = "";
//         })
//     };

//     showTimeRefresh();

// $scope.addshowTime = function(){
//     var promise =  showTimeService.addshowTime($scope.theatre);
//     promise.then(function(data){
//         showTimeRefresh();
//     })

// }

// $scope.deleteTheatre = function(theatre){
//     var promise =  TheatreService.deleteTheatre(theatre._id);
//     promise.then(function(data){
//         theatreRefresh();
//     })
// }

// $scope.editTheatre = function(theatre){
//     var promise =  TheatreService.editTheatre(theatre._id);
//     promise.then(function(data){
//         $scope.theatre = data[0];
//     })
// }

// $scope.updateTheatre = function(){
//     var promise =  TheatreService.updateTheatre($scope.theatre);
//     promise.then(function(data){
//         theatreRefresh();
//     })
// }




};

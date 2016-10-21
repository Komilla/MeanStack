
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST
router.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');

var citySchema = mongoose.Schema({
    cityID: String,
    cityName: String
 });
var City = mongoose.model('City', citySchema, 'city');

//Master
  router.get('/getCity', function (req, res) {
    console.log("REACHED city GET FUNCTION ON SERVER");
    City.find({}, function (err, docs) {
         res.json(docs);
    });
});

  router.get('/getCity/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
    console.log(req.params.id);
     City.find({cityID: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/addCity', function(req, res){
  console.log(req.body);
  var cityID = req.body.cityID;
  var cityName = req.body.cityName;
  var city = new City({
    cityID : cityID,
    cityName: cityName
  });

  city.save(function(err, docs){
    if ( err ) throw err;
    console.log("Book Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/deleteCity/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
   console.log(req.params.id);
      City.remove({cityID:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateCity/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    City.findOneAndUpdate({cityID:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

  module.exports = router;

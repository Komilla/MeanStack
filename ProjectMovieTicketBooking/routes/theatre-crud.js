
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST
router.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');

var TheatreSchema = mongoose.Schema({
    thtrID: String,
    // showName: String,
    thtrName: String,
    cityName: String
 });
var Theatre = mongoose.model('Theatre', TheatreSchema, 'theatre');



//Master
  router.get('/getThtr', function (req, res) {
    console.log("REACHED theatre GET FUNCTION ON SERVER");
    Theatre.find({}, function (err, docs) {
         res.json(docs);
    });
});

  router.get('/getThtr/:id', function (req, res) {
    console.log("REACHED theatre GET ID FUNCTION ON SERVER");
    console.log(req.params.id);
     Theatre.find({thtrID: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/addThtr', function(req, res){
  console.log(req.body);
  var thtrID = req.body.thtrID;
  var thtrName = req.body.thtrName;
  // var showName = req.body.showName;
  var cityName = req.body.cityName;

  var theatre = new Theatre({
    thtrID : thtrID,
    // showName:showName,
    thtrName:thtrName,
    cityName:cityName
  });

console.log(theatre);
  theatre.save(function(err, docs){
    if ( err ) throw err;
    console.log("Theatre Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/deleteThtr/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
   console.log(req.params.id);
      Theatre.remove({thtrID:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateThtr/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Theatre.findOneAndUpdate({thtrID:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

  module.exports = router;

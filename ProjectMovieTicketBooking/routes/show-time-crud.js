var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST
router.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');

var StimSchema = mongoose.Schema({
  stimID : String,
  stimName:String,
  cityName:String,
  thtrName:String,
  showName:String
 });
var Stim = mongoose.model('Stim', StimSchema, 'stim');

//Master
  router.get('/getStim', function (req, res) {
    console.log("REACHED stim GET FUNCTION ON SERVER");
    Stim.find({}, function (err, docs) {
         res.json(docs);
    });
});

  router.get('/getStim/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
    console.log(req.params.id);
     Stim.find({stimID: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/addStim', function(req, res){
  console.log(req.body);
  var stimID = req.body.stimID;
  var stimName = req.body.stimName;
  var cityName = req.body.cityName;
  var thtrName = req.body.thtrName;
  var showName = req.body.showName;


  var stim = new Stim({
    stimID : stimID,
    stimName:stimName,
    cityName:cityName,
    thtrName:thtrName,
    showName:showName


  });

  stim.save(function(err, docs){
    if ( err ) throw err;
    console.log("Book Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/deleteStim/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
   console.log(req.params.id);
    Stim.remove({stimID:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateStim/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Stim.findOneAndUpdate({stimID:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

  module.exports = router;

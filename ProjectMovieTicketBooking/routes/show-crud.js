
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST
router.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');

var ShowSchema = mongoose.Schema({
    showID: String,
    // stimName: String,
    // thtrName: String,
    showName: String

});
var Show = mongoose.model('Show', ShowSchema, 'show');



//Master
  router.get('/getShow', function (req, res) {
    console.log("REACHED show GET FUNCTION ON SERVER");
    Show.find({}, function (err, docs) {
         res.json(docs);
    });
});

  router.get('/getShow/:id', function (req, res) {
    console.log("REACHED show GET ID FUNCTION ON SERVER");
    console.log(req.params.id);
     Show.find({showID: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/addShow', function(req, res){
  console.log(req.body);
  var showID = req.body.showID;
  var showName = req.body.showName;
  // var name = req.body.stimName;
  // var theatreName = req.body.thtrName;

  var show = new Show({
    showID : showID,
    // stimName:name,
    // thtrName:theatreName,
    showName:showName
  });

console.log(show);
  show.save(function(err, docs){
    if ( err ) throw err;
    console.log("show Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/deleteShow/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
   console.log(req.params.id);
      Show.remove({showID:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateShow/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Show.findOneAndUpdate({showID:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

  module.exports = router;

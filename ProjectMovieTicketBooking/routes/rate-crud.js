
var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'), //parses information from POST


//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))


var mongoose = require('mongoose');

var rateSchema = mongoose.Schema({
  rateID: String,
  raterName: String,
  emailID: String,
  showName:String
 });
var Rate = mongoose.model('Rate', rateSchema, 'rate');

router.get('/rate', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Rate.find({}, function (err, docs) {
         res.json(docs);
    });
});

router.get('/rate/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Rate.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/rate', function(req, res){
  console.log(req.body);
  var rateID = req.body.rateID;
  var raterName = req.body.raterName;
  var emailID = req.body.emailID;
  var showName = req.body.showName;
  var rate = new Rate({
    rateID: rateID,
    raterName: raterName,
    emailID: emailID,
    showName:showName
  });

  rate.save(function(err, docs){
    if ( err ) throw err;
    console.log("Rate Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/rate/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Rate.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/rate/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Rate.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})


// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;

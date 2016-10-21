
var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'), //parses information from POST


//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))


var mongoose = require('mongoose');

var seatSchema = mongoose.Schema({
  bookID: String,
  emailID: String,
  mobileNo: String,
  seatNo: String,
  amount: String,
  moviedetails: String
 });
var Seat = mongoose.model('Seat', seatSchema, 'seat');

router.get('/seat', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Seat.find({}, function (err, docs) {
         res.json(docs);

    });
});

router.get('/seat/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Seat.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/seat', function(req, res){
  console.log(req.body);
  var bookID = req.body.bookID;
  var emailID = req.body.emailID;
  var mobileNo = req.body.mobileNo;
  var seatNo = req.body.seatNo;
  var amount = req.body.amount;
  var moviedetails = req.body.moviedetails;

  var seat = new Seat({
    bookID: bookID,
    emailID: emailID,
    mobileNo: mobileNo,
    seatNo: seatNo,
    amount: amount,
    moviedetails:moviedetails
  });

  seat.save(function(err, docs){
    if ( err ) throw err;
    console.log("Seat Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/seat/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Seat.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/seat/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Seat.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
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

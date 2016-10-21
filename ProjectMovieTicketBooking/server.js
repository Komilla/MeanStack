
var logger = require('morgan');
var express = require('express');
var app = express();
var bodyParser=require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

// user schema/model
var User = require('./models/user.js');

//Database
var mongo = require('mongodb');
var mongoose = require('mongoose');
var dbHost = 'mongodb://localhost:27017/test';
mongoose.connect(dbHost);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log("server.js told me to connect to your Database");
});

var auth =  require('./routes/auth');
var bookCrud = require('./routes/book-crud');
var seatCrud = require('./routes/seat-crud');
var rateCrud = require('./routes/rate-crud');
var cityCrud = require('./routes/city-crud');
var theatreCrud = require('./routes/theatre-crud');
var showTimeCrud = require('./routes/show-time-crud');
var showCrud = require('./routes/show-crud');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/book', bookCrud);
app.use('/rate', rateCrud);
app.use('/seat', seatCrud);
app.use('/city', cityCrud);
app.use('/thtr', theatreCrud);
app.use('/stim', showTimeCrud);
app.use('/show', showCrud);
app.use('/user/', auth);


// Only load this middleware in dev mode (important).
if (app.get('env') === 'development') {
  var webpackMiddleware = require("webpack-dev-middleware");
  var webpack = require('webpack');

  var config = require('./webpack.config');

  app.use(webpackMiddleware(webpack(config), {
    publicPath: "/build",

    headers: { "X-Custom-Webpack-Header": "yes" },

    stats: {
      colors: true
    }
  }));

}
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

var server = app.listen(8000, function () {
  console.log('server.js told me to listen to you on port 8000');
});

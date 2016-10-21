'use strict';

var app = require('angular').module('movieApp');

app.service('TodoService', require('./todos'));
app.service('AdminCRUDService',  require('./admin-crud-service'));
app.service('TheatreService',  require('./theatre-service'));
app.service('ShowService',  require('./show-service'));
app.service('StimService',  require('./stim-service'));
app.service('AuthService',  require('./auth-service'));

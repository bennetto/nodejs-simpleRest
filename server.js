// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var logger = require("./app/utils/logger.js");
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 		// set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/simpleRest'); // connect to our database

logger.info("Require begin");
var Object = require('./app/models/Object');
var Users = require('./app/models/Users');
var Apps = require('./app/models/Apps');

logger.info("Require finished");
global.app = app;

/*
var objects = {};
objects["bears"] = new Object({name:"bears"});
objects["beers"] = new Object({name:"beers"});

logger.info('objects : ',objects["bears"].toString());
*/

logger.info("RouterUser");
var routerUser = express.Router();
var _users = new Users('/users',routerUser);
app.use('/users', routerUser);


logger.info("RouterApp");
var routerApp = express.Router();
var _apps = new Apps('/apps',routerApp);
app.use('/apps', routerApp);




// =============================================================================
// START THE SERVER
// =============================================================================
app.listen(port);
logger.info('Magic happens on port ' + port);
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

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


var port = process.env.PORT || 8080; 		// set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/simpleRest'); // connect to our database

logger.info("Require begin");
var Object = require('./app/models/Object');
var Users = require('./app/models/Users');
var Apps = require('./app/models/Apps');

logger.info("Require finished");
global.app = app;


logger.info("Public Folder : ",__dirname+ '/webSite');
app.use("/public", express.static(__dirname+ '/webSite'));


var _users = new Users('/users');

var _apps = new Apps('/apps');


// =============================================================================
// START THE SERVER
// =============================================================================
app.listen(port);
logger.info('Magic happens on port ' + port);
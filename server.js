// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var winston = require('winston');
winston.add(winston.transports.File, { filename: 'simpleRest.log' });
global.__logger = winston;
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 		// set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/simpleRest'); // connect to our database

var Object = require('./app/models/Object');
var objects = {};
objects["bears"] = Object({name:"bears"});
objects["beers"] = Object({name:"beers"});

winston.info('objects : ',objects["bears"].toString());

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    winston.info('');
    winston.info('/* request begin */');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here
router.route('/:nameObject')
    // create
    .post(function(req, res) {
        winston.info('post bears',req.params.nameObject);
        var result = objects[req.params.nameObject].post({name:req.body.name});
        res.json(result);
    })
// get all
    .get(function(req, res) {
        winston.info('get all',req.params.nameObject);
        var result = objects[req.params.nameObject].getAll(undefined,function(result){
            res.json(result);
        });
    });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/:nameObject/:bear_id')

    .get(function(req, res) {
        winston.info('get ',req.params.nameObject);
        var result = objects[req.params.nameObject].get({id:req.params.bear_id},function(result){
            res.json(result);
        });
    })

    .put(function(req, res) {
        winston.info('put ',req.params.nameObject," : ",req.params.bear_id);
        var result = objects[req.params.nameObject].put({id:req.params.bear_id,name:req.body.name},function(result){
            res.json(result);
        });
    })

    .delete(function(req, res) {
        winston.info('remove ',req.params.nameObject," : ",req.params.bear_id);
        var result = objects[req.params.nameObject].delete({id:req.params.bear_id},function(result){
            res.json(result);
        });
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
winston.info('Magic happens on port ' + port);

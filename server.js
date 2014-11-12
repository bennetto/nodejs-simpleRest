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

var Object = require('./app/models/Object');
var objects = {};
objects["bears"] = new Object({name:"bears"});
objects["beers"] = new Object({name:"beers"});

logger.info('objects : ',objects["bears"].toString());

/*
 _    _                 _____             _
| |  | |               |  __ \           | |
| |  | |___  ___ _ __  | |__) |___  _   _| |_ ___
| |  | / __|/ _ \ '__| |  _  // _ \| | | | __/ _ \
| |__| \__ \  __/ |    | | \ \ (_) | |_| | ||  __/
\____/|___/\___|_|    |_|  \_\___/ \__,_|\__\___|
*/

var routerUser = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
routerUser.use(function(req, res, next) {
    // do logging
    logger.info('');
    logger.info('/* request begin User*/');

    //todo : add securité

    next(); // make sure we go to the next routes and don't stop here
});


routerUser.route('/')
    .get(function(req, res) {
        logger.info('get all user');
        //var result = objects[req.params.nameObject].getAll(undefined,function(result){
        res.json({message:"all user"});
        // });
    })
    .post(function(req, res) {
        logger.info('add new user : ');
        // var result = objects[req.params.nameObject].post({name:req.body.name});
        // res.json(result);
        res.json({message:"post user"});
    });


// more routes for our API will happen here
routerUser.route('/:userId')
    // create
    .post(function(req, res) {
        logger.info('post : ',req.params.userId);
        // var result = objects[req.params.nameObject].post({name:req.body.name});
        // res.json(result);
        res.json({message:"post user",user:req.params.userId});
    })
// get all
    .get(function(req, res) {
        logger.info('get : ',req.params.userId);
        //var result = objects[req.params.nameObject].getAll(undefined,function(result){
        //res.json(result);
        // });
        res.json({message:"get user",user:req.params.userId});
    })
    .delete(function(req, res) {
        logger.info('remove : ',req.params.userId);
        /* var result = objects[req.params.nameObject].delete({id:req.params.bear_id},function(result){
         res.json(result);
         });*/
        res.json({message:"delete user",user:req.params.userId});
    });

app.use('/users', routerUser);


/*
                             _____             _
     /\                     |  __ \           | |
    /  \   _ __  _ __  ___  | |__) |___  _   _| |_ ___
   / /\ \ | '_ \| '_ \/ __| |  _  // _ \| | | | __/ _ \
  / ____ \| |_) | |_) \__ \ | | \ \ (_) | |_| | ||  __/
 /_/    \_\ .__/| .__/|___/ |_|  \_\___/ \__,_|\__\___|
          | |   | |
          |_|   |_|
 */
var routerApp = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
routerApp.use(function(req, res, next) {
    // do logging
    logger.info('');
    logger.info('/* request begin Apps /');
    next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
/*routerApp.get('/', function(req, res) {
    res.json({ message: 'get list app' });
});*/

routerApp.route('/')
    .get(function(req, res) {
        logger.info('get all app');
        //var result = objects[req.params.nameObject].getAll(undefined,function(result){
        //res.json(result);
        // });
        res.json({message:"get all app"});
    })
    .post(function(req, res) {
    logger.info('add new app : ');
    // var result = objects[req.params.nameObject].post({name:req.body.name});
    // res.json(result);
        res.json({message:"post app"});
});



// more routes for our API will happen here
routerApp.route('/:nameApp')
    // create
    .post(function(req, res) {
        logger.info('post : ',req.params.nameApp);
       // var result = objects[req.params.nameObject].post({name:req.body.name});
       // res.json(result);
        res.json({message:"post app",app:req.params.nameApp});
    })
// get all
    .get(function(req, res) {
        logger.info('get : ',req.params.nameApp);
        //var result = objects[req.params.nameObject].getAll(undefined,function(result){
            //res.json(result);
        // });
        res.json({message:"get app",app:req.params.nameApp});
     })
    .delete(function(req, res) {
        logger.info('remove : ',req.params.nameApp);
       /* var result = objects[req.params.nameObject].delete({id:req.params.bear_id},function(result){
            res.json(result);
        });*/
        res.json({message:"delete app",app:req.params.nameApp});
    });

/*
   ____  _     _           _         _____             _
  / __ \| |   (_)         | |       |  __ \           | |
 | |  | | |__  _  ___  ___| |_ ___  | |__) |___  _   _| |_ ___
 | |  | | '_ \| |/ _ \/ __| __/ __| |  _  // _ \| | | | __/ _ \
 | |__| | |_) | |  __/ (__| |_\__ \ | | \ \ (_) | |_| | ||  __/
  \____/|_.__/| |\___|\___|\__|___/ |_|  \_\___/ \__,_|\__\___|
             _/ |
            |__/
 */

// more routes for our API will happen here
routerApp.route('/:nameApp/:nameObject')
    // create
    .post(function(req, res) {
        logger.info('post bears',req.params.nameObject);
        var result = objects[req.params.nameObject].post(req.body,function(result){
            res.json(result);
        });
    })
// get all
    .get(function(req, res) {
        logger.info('get all',req.params.nameObject);
        var result = objects[req.params.nameObject].getAll(undefined,function(result){
            res.json(result);
        });
    });


routerApp.route('/:nameApp/:nameObject/:id')

    .get(function(req, res) {
        logger.info('get ',req.params.nameObject);
        var result = objects[req.params.nameObject].get({id:req.params.id},function(result){
            res.json(result);
        });
    })

    .put(function(req, res) {
        logger.info('put ',req.params.nameObject," : ",req.params.id);
        var result = objects[req.params.nameObject].put({id:req.params.id,name:req.body.name},function(result){
            res.json(result);
        });
    })

    .delete(function(req, res) {
        logger.info('remove ',req.params.nameObject," : ",req.params.id);
        var result = objects[req.params.nameObject].delete({id:req.params.id},function(result){
            res.json(result);
        });
    });

app.use('/apps', routerApp);






// START THE SERVER
// =============================================================================
app.listen(port);
logger.info('Magic happens on port ' + port);

/**
 * REQUIRE
 */
var mongoose = require('mongoose');
var logger = require("../utils/logger.js");
var express = require('express');
var Schema = mongoose.Schema;


var method  = Object.prototype;
function Object(params,schema) {
    logger.info('begin createObject Model ');
    /*
     Var
     */
    var ModelObject;
    var _self = this;
    var nameObject = params.name;
    var _prefixRoute;
    var objectSchema;
    var isExpose = true;
    var defaultObject = params.defaultObject;


    if(params.prefixRoute) {
        _prefixRoute = params.prefixRoute;
    }else{
        _prefixRoute = "";
    }

    /**
     * Schema
     */

    logger.info('createObject Model ', nameObject," , prefix:",_prefixRoute);

    objectSchema = new Schema({
        name: String,
        age:String,
        prenom:String,
        isExpose:Boolean
    },{ strict: true });



    if(schema)
    {
       // _self.addInSchema(schema);
        objectSchema.add(schema);
    }

    ModelObject = mongoose.model(params.name, objectSchema);



    /**
     *   Function
     */
    this.toString = function () {
        return nameObject;
    };


    this.getName = function(){
        return nameObject;
    }

    this.addInSchema = function(params){
        objectSchema.add(params);
    };

    this.removeInSchema = function(params){
       // objectSchema.remove(params);
    };

    this.getRoute = function(){
        return _routeObject;
    }



    /*
    ALL
     */
    this.getAll = function (params, callback) {
        logger.info('getAll ', nameObject);
        ModelObject.find(function (err, object) {
            if (err) {
                res = {error:true,data: err};
            } else if (object) {
                res = {success:true,data: object};
            } else{
                res = {};
            }
            callback(res);
        });
    };

    this.deleteAll = function (params, callback) {


    };

    /*
    Unique
     */

    this.post = function (params, callback) {
        var res;

        logger.info('post ', nameObject);
        var model = new ModelObject(); 		// create a new instance of the object Model

        objectSchema.eachPath(function(value){
          //  logger.info('objectSchema.eachPath ', value);
            if(params[value])
            {
                model[value] = params[value];
            }else if(defaultObject && defaultObject[value]){
                model[value] = defaultObject[value];
            }
        });

        // save the object and check for errors
        model.save(function (err) {
            if (err) {
                res = {error:true,data: err};
            } else {
                if(_self.objectCreated){
                    _self.objectCreated(model);
                }
                logger.info(nameObject,' created!');
                res = {success:true,data: nameObject+' created!'};
            }
            callback(res);
        });
    };



    this.get = function (params, callback) {
        logger.info('get ', nameObject, ' : ', params.id);
        ModelObject.findById(params.id, function (err, object) {

            if (err) {
                logger.info('err ', err);
                res = {error:true,data: err};
            } else  if (object) {
                res = {success:true,data: object};
            } else{
                res = {};
            }
            callback(res);
        });
        ModelObject.find
    };

    this.getByName = function (params, callback) {
        logger.info('get by name', nameObject, ' : ', params.name);
        ModelObject.find({name:params.name}, function (err, object) {

            if (err) {
                logger.info('err ', err);
                res = {error:true,data: err};
            } else  if (object) {
                res = {success:true,data: object};
            } else{
                res = {};
            }
            callback(res);
        });
        ModelObject.find
    };


    this.put = function (params, callback) {
        logger.info('put ' + nameObject + ' : ', params.id, " : ", params.name);
        // use our object Model to find the object we want
        ModelObject.findById(params.id, function (err, object) {

            var args = params.args;

            if (err) {
                res = err;
                callback(res);
            } else {
                logger.info('find');

                objectSchema.eachPath(function(value){
                    //  logger.info('objectSchema.eachPath ', value);
                    if(params[value])
                    {
                        object[value] = params[value];
                    }else if(defaultObject && defaultObject[value]){
                        object[value] = defaultObject[value];
                    }
                });

                // save the object
                object.save(function (err) {
                    logger.info('save done');
                    if (err) {
                        res = {error:true,data: err};
                    } else {
                        res = {success:true,data: 'Object updated!'};
                    }
                    callback(res);
                });
            }
        });
    };

    this.delete = function (params, callback) {
        logger.info('delete ' + nameObject + ' : ', params.id);
        ModelObject.remove({
            _id: params.id
        }, function (err) {
            if (err) {
                res = {error:true,data: err};
            } else {
                res = {success:true,data: 'Successfully deleted'};
            }
            callback(res);
        });
    };

/*
  _____             _
 |  __ \           | |
 | |__) |___  _   _| |_ ___
 |  _  // _ \| | | | __/ _ \
 | | \ \ (_) | |_| | ||  __/
 |_|  \_\___/ \__,_|\__\___|
 */

    logger.info("routeObject : ",_prefixRoute);

    _routeObject = express.Router();


// middleware to use for all requests
    _routeObject.use(function(req, res, next) {
        // do logging
        logger.info('');
        logger.info('/* request begin ',nameObject,'*/');


        //todo : add securité

        next(); // make sure we go to the next routes and don't stop here
    });


    _routeObject.route("/")
        .get(function(req, res) {
            logger.info('get all ',nameObject);
           _self.getAll(undefined,function(result){
                res.json(result);
            });
            // });
        })
        .post(function(req, res) {
            logger.info('add new ',nameObject,' : ');
            _self.post(req.body,function(result){
                res.json(result);
            });
        })
        .put(function(req, res) {
           // logger.info('add new ',nameObject,' : ');


        })
        .delete(function(req, res) {
            // logger.info('add new ',nameObject,' : ');


        });


// more routes for our API will happen here
    _routeObject.route('/:id')
        // update
        .put(function(req, res) {
            logger.info('put : ',req.params.id);
            var result = _self.put({id:req.params.id,args:req.body},function(result){

                res.json(result);
            });
        })
// get
        .get(function(req, res) {
            logger.info('get : ',req.params.id);
            var result = _self.get({id:req.params.id},function(result){
                if(result.error)
                {
                    var result = _self.getByName({name:req.params.id},function(result){
                        res.json(result);
                    });

                }else if(result.success){
                    res.json(result);
                }
            });
        })
        .delete(function(req, res) {
            logger.info('remove : ',req.params.id);
            var result = _self.delete({id:req.params.id},function(result){
                res.json(result);
            });
        });

    global.app.use(_prefixRoute, _routeObject);
}

module.exports = Object;
/**
 * REQUIRE
 */
var mongoose = require('mongoose');
var logger = require("../utils/logger.js");
var Schema = mongoose.Schema;


var method  = Object.prototype;
function Object(params,schema) {

    /*
     Var
     */
    var ModelObject;
    var _self = this;
    var nameObject = params.name;
    var objectSchema;
    var isExpose = true;


    /**
     * Schema
     */

    logger.info('createObject Model ', params.name);

    if(schema)
    {
        objectSchema = new Schema(schema);
    }else{
        objectSchema = new Schema({
            name: String,
            age:String
        });
    }

    ModelObject = mongoose.model(params.name, objectSchema);



    /**
     *   Function
     */
    this.toString = function () {
        return nameObject;
    }



    this.post = function (params, callback) {
        var res;

        objectSchema.add({prenom:String});
        //ModelObject = mongoose.model(nameObject, objectSchema);

        logger.info('post ', nameObject);
        var Model = new ModelObject(); 		// create a new instance of the Bear Model

        logger.info(params);



        objectSchema.eachPath(function(value){
            logger.info('objectSchema.eachPath ', value);
            if(params[value])
            {
                logger.info('objectSchema.eachPath Sur ', value);
                Model[value] = params[value];
            }
        });


        // save the bear and check for errors
        Model.save(function (err) {
            if (err) {
                res = err;
            } else {
                logger.info('Bear created!');
                res = {message: 'Bear created!'};
            }
            callback(res);
        });
    };


    this.getAll = function (params, callback) {
        logger.info('getAll ', nameObject);
        ModelObject.find(function (err, bear) {
            if (err) {
                res = err;
            } else {
                res = bear;
            }
            callback(res);
        });
    };

    this.get = function (params, callback) {
        logger.info('get ', nameObject, ' : ', params.id);
        ModelObject.findById(params.id, function (err, bear) {
            if (err) {
                res = err;
            } else {
                res = bear;
            }
            callback(res);
        });
    };

    this.put = function (params, callback) {
        logger.info('put ' + nameObject + ' : ', params.id, " : ", params.name);
        // use our bear Model to find the bear we want
        ModelObject.findById(params.id, function (err, bear) {

            if (err) {
                res = err;
                callback(res);
            } else {
                logger.info('find');
                bear.name = params.name; 	// update the bears info
                logger.info('change name done');
                // save the bear
                bear.save(function (err) {
                    logger.info('save done');
                    if (err) {
                        res = err;
                    } else {
                        res = {message: 'Bear updated!'};
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
                res = err;
            } else {
                res = {message: 'Successfully deleted'};
            }
            callback(res);
        });
    };
};


module.exports = Object;





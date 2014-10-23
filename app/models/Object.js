/**
 * REQUIRE
 */
var mongoose = require('mongoose');

var _self = this;
/**
 * Var
 */
    var isExpose = true;
    var Model;
/**
 * Expose `createApplication()`.
 */


function createObject(params) {
    /**
     * Schema
     */
    __logger.info('createObject');
    var Schema       = mongoose.Schema;
    var objectSchema   = new Schema({
        name: String

    });

   // var schema = new Schema({ name: String });
    //var Model = mongoose.model('Page', schema);

    __logger.info('createObject model',params.name);
    Model = exports.model = mongoose.model(params.name, objectSchema);
    return exports;
};
exports = module.exports = createObject;


/**
*   Function
 */
exports.toString = function(){
    return "MDR";
}

exports.post = function(params,callback) {
    var res;
    __logger.info('post bear');
    var model = new Model(); 		// create a new instance of the Bear model
    model.name = params.name;  // set the bears name (comes from the request)

    // save the bear and check for errors
    model.save(function(err) {
        if (err){
            res = err;
        }else{
            __logger.info('Bear created!');
            res = { message: 'Bear created!' };
        }
        callback(res);
    });
};


exports.getAll = function(params,callback) {
    __logger.info('getAll bears ');
    Model.find(function(err, bear) {
        if (err){
            res = err;
        }else{
            res = bear;
        }
        callback(res);
    });
};

exports.get = function(params,callback) {
    __logger.info('get bear : ',params.id);
    Model.findById(params.id, function(err, bear) {
        if (err){
            res = err;
        }else{
            res = bear;
        }
        callback(res);
    });
};

exports.put = function(params,callback) {
    __logger.info('put bear : ',params.id," : ",params.name);
        // use our bear model to find the bear we want
    Model.findById(params.id, function(err, bear) {

        if (err){
            res = err;
            callback(res);
        }else {
            __logger.info('find');
            bear.name = params.name; 	// update the bears info
            __logger.info('change name done');
            // save the bear
            bear.save(function (err) {
                __logger.info('save done');
                if (err) {
                    res = err;
                } else {
                    res = { message: 'Bear updated!' };
                }
                callback(res);
            });
        }
        });
    };

exports.delete = function(params,callback) {
    __logger.info('delete bear : ',params.id);
        Model.remove({
            _id: params.id
        }, function(err, model) {
            if (err){
                res = err;
            }else{
                res = { message: 'Successfully deleted' };
            }
            callback(res);
        });
};



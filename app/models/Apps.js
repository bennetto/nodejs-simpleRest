/**
 * REQUIRE
 */
var mongoose = require('mongoose');
var object = require('Object');


/**
 * Var
 */
var isExpose = true;

/**
 * Expose `createApplication()`.
 */

exports = module.exports = createApplication;

function createApps(param) {


};


/**
 * Schema
 */
var Schema       = mongoose.Schema;
var ObjectSchema   = new Schema({
    id: String

});

exports.model = mongoose.model('Apps', Object);
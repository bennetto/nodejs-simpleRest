/**
 * REQUIRE
 */
var mongoose = require('mongoose');
var object = require('./Object');
var logger = require("../utils/logger.js");

var Schema  = mongoose.Schema;
function Users(prefix) {
    var userSchema  = {password:String};
    var params = {name:"users",
        prefixRoute:prefix,
        defaultObject:{
            name:"",
            password:""
        }
    };
    object.call(this, params, userSchema);

    var _self = this;


}
/*
 ImgElement.prototype = Object.create(ElementBase.prototype);
 ImgElement.prototype.constructor = ElementBase;
 */
module.exports = Users;
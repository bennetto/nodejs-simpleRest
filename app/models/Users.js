/**
 * REQUIRE
 */
var mongoose = require('mongoose');
var express = require('express');
var object = require('./Object');
var logger = require("../utils/logger.js");

var Schema  = mongoose.Schema;
function Users(prefix,route) {
    var userSchema  = {password:String };
    var params = {name:"users",
        prefix:prefix,
        defaultObject:{
            name:"",
            password:""
        }
    };
    object.call(this, params, userSchema,route);

    var _self = this;



}
/*
 ImgElement.prototype = Object.create(ElementBase.prototype);
 ImgElement.prototype.constructor = ElementBase;
 */
module.exports = Users;
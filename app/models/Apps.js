/**
 * REQUIRE
 */
var mongoose = require('mongoose');
var express = require('express');
var object = require('./Object');
var logger = require("../utils/logger.js");


var Schema  = mongoose.Schema;
function Apps(prefix,route) {
    var appSchema   = {
        listObjects:[]
    };
    var params = {name:"apps",prefix:prefix};
    object.call(this, params, appSchema,route);

    var _self = this;
    var listObjects = [];


    this.objectCreated = function(model){
        var name = model.name;
        listObjects[name] = new Object({name:name});

        logger.info("RouterUser");
        var routerObject = express.Router();
        var _users = new Object({name:name,prefix: prefix+'/'+name},{},routerObject);
        global.app.use(prefix+'/'+name, routerObject);

    }


    //Init
    _self.getAll(undefined,function(result){
        logger.info('init ',JSON.stringify(result));
        if(result.success && result.data){
            result.data.forEach(function(object){
                var name = object.name;
                logger.info("Router ",name,' ',prefix+'/'+name);

                var routerObject = express.Router();
                var object= new Object({name:name,prefix: prefix+'/'+name},{},routerObject);
                global.app.use(prefix+'/'+name, routerObject);
            });
        }
    });

}
/*
 ImgElement.prototype = Object.create(ElementBase.prototype);
 ImgElement.prototype.constructor = ElementBase;
 */
module.exports = Apps;
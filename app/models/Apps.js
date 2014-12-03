/**
 * REQUIRE
 */
var mongoose = require('mongoose');
var Object = require('./Object');
var logger = require("../utils/logger.js");
var express = require('express');

var Schema  = mongoose.Schema;
function Apps(prefix) {
    var appSchema   = {
        listObjects:[]
    };
    var params = {name:"apps",prefixRoute:prefix};


    Object.call(this, params, appSchema);

    var _self = this;
    var listObjects = [];


    this.objectCreated = function(model){
        var name = model.name;
        //listObjects[name] = new Object({name:name});

        logger.info("Router ",name,' ', prefix+'/'+name+'/objects');
        new Object({name:name,prefixRoute: prefix+'/'+name+'/objects'},{});

    };


    //Init
    _self.getAll(undefined,function(result){
        logger.info('init ',JSON.stringify(result));
        if(result.success && result.data){
            result.data.forEach(function(object){
                var name = object.name;
                logger.info("Router ",name,' ', prefix+'/'+name+'/objects');
                 new Object({name:name,prefixRoute: prefix+'/'+name+'/objects'},{});

            });
        }
    });

}
/*
 ImgElement.prototype = Object.create(ElementBase.prototype);
 ImgElement.prototype.constructor = ElementBase;
 */
module.exports = Apps;
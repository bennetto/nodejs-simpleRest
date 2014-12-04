/**
 * REQUIRE
 */
var mongoose = require('mongoose');
var Object = require('./Object');
var Tables = require('./Tables');
var logger = require("../utils/logger.js");
var express = require('express');

var Schema  = mongoose.Schema;
function Apps(prefix) {
    var appSchema   = {
        listTables:[]
    };
    var params = {name:"apps",prefixRoute:prefix};


    Object.call(this, params, appSchema);

    var _self = this;
    var listTables = [];


    this.objectCreated = function(model){
        var name = model.name;
        //listObjects[name] = new Object({name:name});

        logger.info("Router ",name,' ', prefix+'/'+name+'/tables');
        new Tables({name:name,prefixRoute: prefix+'/'+name+'/tables'},{});

    };


    //Init
    _self.getAll(undefined,function(result){
        logger.info('init ',JSON.stringify(result));
        if(result.success && result.data){
            result.data.forEach(function(object){
                var name = object.name;
                logger.info("Router ",name,' ', prefix+'/'+name+'/tables');
                 new Tables({name:name,prefixRoute: prefix+'/'+name+'/tables'},{});

            });
        }
    });

}
/*
 ImgElement.prototype = Object.create(ElementBase.prototype);
 ImgElement.prototype.constructor = ElementBase;
 */
module.exports = Apps;
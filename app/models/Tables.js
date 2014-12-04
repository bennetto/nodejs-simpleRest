/**
 * REQUIRE
 */
var mongoose = require('mongoose');
var Object = require('./Object');
var logger = require("../utils/logger.js");
var express = require('express');

var Schema  = mongoose.Schema;
function Tables(params) {

    var prefix= "";
    if(params.prefixRoute) {
        prefix = params.prefixRoute;
    }
    var _name = params.name;


    var tableSchema   = {
        listObjects:[]
    };
    var params = {name:_name,prefixRoute:prefix};


    Object.call(this, params, tableSchema); //Heritage

    var _self = this;
    var listObjects = [];


    this.objectCreated = function(model){
      var name;
      if(model.name)
      {
         name = model.name;
      }else if(model._id){
         name = model._id;
      }

        //listObjects[name] = new Object({name:name});

        logger.info("Router ",name,' ', prefix+'/'+name+'/objects');
        new Object({name:name,prefixRoute: prefix+'/'+name+'/objects'},{});

    };


    //Init
    _self.getAll(undefined,function(result){
        logger.info('init ',JSON.stringify(result));
        if(result.success && result.data){
            result.data.forEach(function(object){
                var name;
                if(object.name)
                {
                   name = object.name;

                logger.info("Router ",name,' ', prefix+'/'+name+'/objects');
                 new Object({name:name,prefixRoute: prefix+'/'+name+'/objects'},{});
                }else if(object._id){
                  logger.info(object,' has not create');
                   name = object._id; //create nothing
                }
            });
        }
    });

}
/*
 ImgElement.prototype = Object.create(ElementBase.prototype);
 ImgElement.prototype.constructor = ElementBase;
 */
module.exports = Tables;
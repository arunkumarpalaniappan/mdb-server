'use strict';
const Boom = require("boom");
const Movies = require("../models/movies");

exports.list = function (request, reply) {
    const params = request.query; //accessing page id from url
    return Movies.list.call(params).then(function(movies){
        return movies;
    }).catch(function(err){
        return err;
    });
};

exports.get = function (request, reply) {
    const params = request.params; //accessing movie id from url 
    return Movies.get.call(params).then(function(movie){
        return movie;
    }).catch(function(err){
        return err;
    });
};

exports.search = function (request, reply) {
    const params = request.query;
    return Movies.search.call(params).then(function(movies){
        return movies;
    }).catch(function(err){
        return err;
    });
}
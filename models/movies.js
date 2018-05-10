'use strict';
const Promise = require("bluebird");
const movies = require("../lib/movies");

exports.list = function () {
    return new Promise((resolve,reject) => {
        movies.list.call(this).then(response => { //calling lib from here {if we want some data manipulation, that can be done here}
            resolve(response)
        })
            .catch(error => {
                reject(error)
            });
    });
};

exports.get = function () {
    return new Promise((resolve,reject) => {
        movies.get.call(this).then(response => { //calling lib from here {if we want some data manipulation, that can be done here}
            resolve(response)
        })
            .catch(error => {
                reject(error)
            });
    });
};

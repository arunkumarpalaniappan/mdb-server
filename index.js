'use strict';
const config = require('config');
const Hapi = require('hapi');
const env = process.env.NODE_ENV;
const routes = require('./routes/routes.js');
//Making config immutable
Object.freeze(config.get('serverConf'));
const init = async () => {
    const server = Hapi.Server({
        host: process.env.APP_HOST || config.get('serverConf.host'),
        port: process.env.APP_PORT || config.get('serverConf.port'),
        debug: {
            request: ['error']
        },
        routes: {
            cors: true
        }
    });
    server.route(routes); //pass routes to Hapi
    await server.start();
    return server;
};
init().then(server => { //start the server
        console.log('Server running at:', server.info.uri);
    })
    .catch(error => {
        console.log(error);
    });
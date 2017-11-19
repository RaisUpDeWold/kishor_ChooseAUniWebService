'use strict';

const packageJson = require('../package.json');
const configEnv = require('./config-env');

const config = {
    apiRoutes: 'routes/api/search.js',
    viewRoutes: 'routes/routes.js',
    autorouting: true,
    logging: {
        express: false,
        files: false,
        pathDir: 'logs'
    },
    server: {
        port: process.env.PORT || configEnv.port
    },
    livereload: {
        port: 30000
    },
    token: {
        secretToken: 'development'
    },
    timezone: 'America/Argentina/Buenos_Aires',
    corsConfig: {
        origin: '*',
        methods: [
            'GET',
            'POST',
            'PUT',
            'DELETE',
            'HEAD',
            'OPTIONS'
        ],
        allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'Type',
            'Authorization'
        ],
        credentials: true,
        preflightContinue: true
    }
};

module.exports = config;
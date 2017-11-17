'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');

const configEnv = require('.' + path.sep + 'config-env');

function createExpressApp() {
    const app = express();

    app.use(logger('dev'));

    // MongoClient
    logger.info('Configuring MongoDB...');
    let db = configEnv.mongo.db;
    if (process.env.NODE_ENV === 'test') {
        db += '-test';      // Test Mode
    }
    logger.info('MongoDB: Connecting to ', db, configEnv.mongo.host + ' : ' + configEnv.mongo.port);
    mongoose.connect(configEnv.mongo.host, db, configEnv.mongo.port, {
        user: configEnv.mongo.user,
        pass: configEnv.mongo.pass
    }, function () {
        if (process.env.NODE_ENV === 'test') {
            logger.debug('MongoDB: Dropping the Database...');
            mongoose.connection.db.dropDatabase();
        }
    })

    return app;
}

module.exports = createExpressApp();
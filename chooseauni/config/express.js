'use strict';

const path = require('path');
const express = require('express');
var favicon = require('serve-favicon');
const morganLogger = require('morgan');
const logger = require(path.join('..', 'modules', 'logger'));
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('.' + path.sep + 'config');
const configEnv = require('.' + path.sep + 'config-env');

function createExpressApp() {
    const app = express();

    //app.use(morganLogger('dev'));

    // MongoClient
    logger.info('Configuring MongoDB...');
    let db = configEnv.mongo.db;
    if (process.env.NODE_ENV === 'test') {
        db += '-test';      // Test Mode
    }
    logger.info('MongoDB: Connecting to ', db, configEnv.mongo.host + ' : ' + configEnv.mongo.port);
    /*mongoose.connect(configEnv.mongo.host, db, configEnv.mongo.port, {
        user: configEnv.mongo.user,
        pass: configEnv.mongo.pass
    }, function () {
        if (process.env.NODE_ENV === 'test') {
            logger.debug('MongoDB: Dropping the Database...');
            mongoose.connection.db.dropDatabase();
        }
    });*/
    logger.info('mongodb://' + configEnv.mongo.host + ':' + configEnv.mongo.port + '/' + db);
    mongoose.connect('mongodb://' + configEnv.mongo.host + '/' + db);

    // Auto Routing
    if (config.autorouting) {
        logger.info('Configuring Auto-Routing...');

        const apiFiles = require('glob').sync(config.apiRoutes);
        apiFiles.forEach((file) => {
            const route = '/' + file.replace(/(^(\.\/|)routes\/|((\/|)index|)\.js$)/g, '');
            logger.debug('Api - Auto-Routing: Using', file, 'Router for Route', route);
            app.use(route, require(path.join('..', file)));
        });

        const viewFiles = require('glob').sync(config.viewRoutes);
        viewFiles.forEach((file) => {
            const route = '/';
            logger.debug('View - Auto-Routing: Using', file, 'Router for Route', route);
            app.use(route, require(path.join('..', file)));
        });
    }

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Set Port...
    logger.info('Configuring Port', config.server.port);
    app.set('port', config.server.port);

    // Set View
    logger.info('Configuring Views');
    let staticView = 'views';
    /*if (app.get('env') == 'development') {
        staticView = 'views_public';
    }*/
    logger.info(path.join(__dirname, staticView));
    app.set('views', path.join(staticView));
    app.set('view engine', 'jade');

    // Set Static Folder
    logger.info('Configuring Static Folder...');
    let staticRoute = 'public';
    /*if (app.get('env') === 'development') {
        staticRoute = 'build_public';
    }*/
    logger.debug('Static folder: Using', staticRoute);
    app.use(express.static(path.join(staticRoute)));

    return app;
}

module.exports = createExpressApp();
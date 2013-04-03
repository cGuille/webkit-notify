#! /usr/bin/env node

(function () {
    'use strict';

    try {
        var express = require('express');
    } catch (error) {
        console.error(error.message);
        console.error('Did you run `npm install`?');
        process.exit(1);
    }

    var app = express(),
        appPort = +process.argv[2],
        servingDirectory = __dirname + '/static';

    if (isNaN(appPort)) {
        appPort = 8080;
    }

    app.configure(function () {
        app.use(express.compress());
        app.use(express.logger('dev'));
        app.use(express.static(servingDirectory));
    });

    var httpServer = app.listen(appPort, function () {
        var binding = httpServer.address();
        console.info('Server running on ' + binding.address + ':' + binding.port + ' (' + binding.family + ')');
        console.info('Files will be served from "' + servingDirectory + '"');
    });

    httpServer.on('error', function (error) {
        console.error("Error: ", error);
    });
}());


'use strict';

var log4js = require('log4js');
var LOG_FILE = process.env.APP_LOG || 'system.log';
var APP_NAME = process.env.APP_NAME || 'file_service';

module.exports = function(app) {
    log4js.configure({
        appenders: [
            { type: 'console' },
            { type: 'file', filename: LOG_FILE, category: APP_NAME }
        ]
    });
    var logger = log4js.getLogger(APP_NAME);
    app.use(log4js.connectLogger(logger, { level: 'auto' }));
};
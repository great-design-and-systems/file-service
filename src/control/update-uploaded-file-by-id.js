'use strict';
var UploadedFile = require('../entity/uploaded-file');
var logger = require('./get-logger');

function execute(fileId, data, callback) {
    UploadedFile.findOneAndUpdate({fileId: fileId}, data, function (err) {
        if (err) {
            logger.error('update-uploaded-file-by-id', err);
            callback(err);
        } else {
            callback();
        }
    });
}

module.exports = execute;
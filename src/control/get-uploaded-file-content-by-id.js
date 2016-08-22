'use strict';
var UploadedFileContent = require('../entity/uploaded-file-content');
var logger = require('./get-logger');

function execute(fileId, callback) {
    UploadedFileContent.find({
        fileId: fileId
    }, function (err, result) {
        if (err) {
            logger.error('get-uploaded-file-content', err);
            callback({
                message: 'Failed to get uploaded file content.'
            });
        } else {
            callback(undefined, result);
        }
    });
}

module.exports = execute;
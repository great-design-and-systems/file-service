'use strict';
var UploadedFileContent = require('../entity/uploaded-file-content');
var logger = require('./get-logger');

function execute(fileId, newContent, callback) {
    UploadedFileContent.findOneAndUpdate({fileId: fileId}, {
        content: newContent
    }, function (err) {
        if (err) {
            logger.error('update-content-file-by-id', err);
            callback(err);
        } else {
            callback();
        }
    });
}

module.exports = execute;
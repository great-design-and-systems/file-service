'use strict';
var UploadedFileContent = require('../entity/uploaded-file-content');
var logger = require('./get-logger');

function execute(fileId, callback) {
    UploadedFileContent.findOneAndRemove({fileId: fileId}, function (err) {
        if (err) {
            logger.error('remove-content-file-by-id', err);
            callback({
                message: 'Failed to remove content file with id: ' + fileId
            });
        } else {
            callback();
        }
    });
}

module.exports = execute;
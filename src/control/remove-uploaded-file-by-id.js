'use strict';
var UploadedFile = require('../entity/uploaded-file');
var logger = require('./get-logger');

function execute(fileId, callback) {
    UploadedFile.findByIdAndRemove(fileId, function (err) {
        if (err) {
            logger.error('remove-uploaded-file-by-id', err);
            callback({
                message: 'Failed to remove file with id: ' + fileId
            });
        } else {
            callback();
        }
    });
}

module.exports = execute;
'use strict';
var UploadedFileContent = require('../entity/uploaded-file-content');
var logger = require('./get-logger');

function execute(fileId, content, contentSequence, callback) {
    UploadedFileContent.create({
        fileId: fileId,
        content: content,
        contentSequence: contentSequence
    }, function (err, result) {
        if (err) {
            logger.error('create-uploaded-file-content', err);
            callback(err);
        } else {
            callback(undefined, result);
        }
    });
}

module.exports = execute;
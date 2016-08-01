'use strict';
var UploadedFileContent = require('../entity/uploaded-file-content');

function execute(fileId, callback) {
    UploadedFileContent.find({
        fileId: fileId
    }, function (err, result) {
        if (err) {
            console.error('get-uploaded-file-content', err);
            callback({
                message: 'Failed to get uploaded file content.'
            });
        } else {
            callback(undefined, result);
        }
    });
}

module.exports = execute;
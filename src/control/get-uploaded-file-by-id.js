'use strict';
var UploadedFile = require('../entity/uploaded-file');

function execute(fileId, callback) {
    UploadedFile.findById(fileId, function (err, result) {
        if (err) {
            console.error('get-uploaded-file-by-id', err);
            callback({
                message: 'File not found for id: ' + fileId
            });
        } else {
            callback(undefined, result);
        }
    });
}

module.exports = execute;
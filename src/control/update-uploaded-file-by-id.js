'use strict';
var UploadedFile = require('../entity/uploaded-file');

function execute(fileId, data, callback) {
    UploadedFile.findOneAndUpdate({fileId: fileId}, data, function (err) {
        if (err) {
            console.error('update-uploaded-file-by-id', err);
            callback(err);
        } else {
            callback();
        }
    });
}

module.exports = execute;
'use strict';
var UploadedFileContent = require('../entity/uploaded-file-content');

function execute(fileId, callback) {
    UploadedFileContent.findOneAndRemove({fileId: fileId}, function (err) {
        if (err) {
            console.error('remove-content-file-by-id', err);
            callback({
                message: 'Failed to remove content file with id: ' + fileId
            });
        } else {
            callback();
        }
    });
}

module.exports = execute;
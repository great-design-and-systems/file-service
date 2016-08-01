'use strict';
var UploadedFileContent = require('../entity/uploaded-file-content');

function execute(fileId, content, contentSequence, callback) {
    UploadedFileContent.create({
        fileId: fileId,
        content: content,
        contentSequence: contentSequence
    }, function (err, result) {
        if (err) {
            console.error('create-uploaded-file-content', err);
            callback(err);
        } else {
            callback(undefined, result);
        }
    });
}

module.exports = execute;
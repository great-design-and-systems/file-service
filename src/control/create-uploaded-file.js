'use strict';
var UploadedFile = require('../entity/uploaded-file');

function execute(name, type, size, createdBy, callback) {
    UploadedFile.create({
        fileName: name,
        fileType: type,
        fileSize: size,
        createdBy: createdBy
    }, function (err, result) {
        if (err) {
            console.error('create-uploaded-file', err);
            callback(err);
        } else {
            callback(undefined, result);
        }
    });
}

module.exports = execute;
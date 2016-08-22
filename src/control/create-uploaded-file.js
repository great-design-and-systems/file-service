'use strict';
var UploadedFile = require('../entity/uploaded-file');
var logger = require('./get-logger');

function execute(name, type, size, createdBy, callback) {
    UploadedFile.create({
        fileName: name,
        fileType: type,
        fileSize: size,
        createdBy: createdBy
    }, function (err, result) {
        if (err) {
            logger.error('create-uploaded-file', err);
            callback(err);
        } else {
            callback(undefined, result);
        }
    });
}

module.exports = execute;
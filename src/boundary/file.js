'use strict';
var CreateUploadFile = require('../control/create-uploaded-file');
var fs = require('node-fs');
var CreateUploadedFileContent = require('../control/create-uploaded-file-content');
var GetUploadedFileById = require('../control/get-uploaded-file-by-id');
var GetUploadedFileContentById = require('../control/get-uploaded-file-content-by-id');
var UpdateContentFileById = require('../control/update-content-file-by-id');
var UpdateUploadedFileById = require('../control/update-uploaded-file-by-id');
var RemoveContentFileById = require('../control/remove-content-file-by-id');
var RemoveUploadedFileById = require('../control/remove-uploaded-file-by-id');
module.exports = {
    uploadSingleFile: uploadSingleFile,
    downloadFile: downloadFile,
    updateSingleFileContent: updateSingleFileContent,
    deleteFile: deleteFile
};

function uploadSingleFile(file, userId, callback) {
    new CreateUploadFile(file.originalname, file.mimetype, file.size, userId, function(errUploadedFile, uploadedFile) {
        if (errUploadedFile) {
            fs.unlink(file.path);
            callback({
                message: 'Error creating uploaded file ' + file.originalname
            });
        } else {
            fs.readFile(file.path, 'utf-8', function(errFilePath, fileData) {
                if (errFilePath) {
                    fs.unlink(file.path);
                    console.error('upload-single-file', errFilePath);
                    callback({
                        message: 'Failed to read file ' + file.originalname
                    });
                } else {
                    new CreateUploadedFileContent(uploadedFile._id, fileData, 0, function(errContent) {
                        if (errContent) {
                            fs.unlink(file.path);
                            callback(errContent);
                        } else {
                            fs.unlink(file.path, function(errUnlink) {
                                if (errUnlink) {
                                    console.error('upload-single-file', errUnlink);
                                    callback({
                                        message: 'Clean up error for fileId: ' + uploadedFile._id
                                    });
                                } else {
                                    callback(undefined, uploadedFile);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

function downloadFile(fileId, callback) {
    new GetUploadedFileById(fileId, function(errFile, uploadedFile) {
        if (errFile) {
            callback(errFile);
        } else {
            if (uploadedFile) {
                new GetUploadedFileContentById(fileId, function(errFileContent, fileContents) {
                    var fileName = uploadedFile.fileName;
                    var fileSize = uploadedFile.fileSize;
                    var fileType = uploadedFile.fileType;
                    if (errFileContent) {
                        callback(errFileContent);
                    } else {
                        callback(undefined, {
                            fileName: fileName,
                            fileSize: fileSize,
                            fileType: fileType,
                            contents: fileContents
                        });
                    }
                });
            } else {
                callback({
                    message: 'File not found'
                });
            }
        }
    });
}

function updateSingleFileContent(file, fileId, callback) {
    fs.readFile(file.path, function(err, newDataFile) {
        if (err) {
            fs.unlink(file.path);
            console.error('update-single-file', err);
            callback({
                message: 'Failed to read file ' + file.originalname
            });
        } else {
            new UpdateContentFileById(fileId, newDataFile, function(err) {
                if (err) {
                    fs.unlink(file.path);
                    callback(err);
                } else {
                    fs.unlink(file.path, function(errUnlink) {
                        if (errUnlink) {
                            console.error('update-single-file', errUnlink);
                            callback({
                                message: 'Clean up error for fileId: ' + fileId
                            });
                        } else {
                            new UpdateUploadedFileById(fileId, {
                                updatedOn: new Date()
                            }, function(err) {
                                if (err) {
                                    callback(err);
                                } else {
                                    callback();
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

function deleteFile(fileId, callback) {
    new RemoveContentFileById(fileId, function(err) {
        if (err) {
            callback(err);
        } else {
            new RemoveUploadedFileById(fileId, function(err) {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, {
                        message: 'Have deleted file with id: ' + fileId
                    });
                }
            });
        }
    });
}
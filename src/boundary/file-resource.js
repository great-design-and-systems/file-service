'use strict';
var API = process.env.API_NAME || '/api/file/';
var UPLOAD_DIR = process.env.UPLOAD_DIR || '/uploads';
var multer = require('multer');
var upload = multer({ dest: UPLOAD_DIR });
var File = require('./file');

function execute(app) {
    app.get('/', function(req, res) {
        res.status(200).send({
            domain: process.env.DOMAIN_NAME || 'File',
            links: {
                uploadSingleFile: {
                    method: 'POST',
                    url: 'http://' + req.headers.host + API + 'upload-single-file/:userId'
                },
                updateSingleFileContent: {
                    method: 'POST',
                    url: 'http://' + req.headers.host + API + 'update-single-file-content/:fileId'
                },
                downloadFile: {
                    method: 'GET',
                    url: 'http://' + req.headers.host + API + 'download-file/:fileId'
                },
                readFile: {
                    method: 'GET',
                    url: 'http://' + req.headers.host + API + 'read-file/:fileId'
                },
                deleteFile: {
                    method: 'DELETE',
                    url: 'http://' + req.headers.host + API + ':fileId'
                }
            }
        });
    });

    app.get('/upload-form', function(req, res) {
        res.status(200)
            .send('<html><body>' +
                '<form name="upload" method="post" action="api/file/upload-single-file/0001" enctype="multipart/form-data">' +
                '<input type="file" name="uploadFile">' +
                '<input type="submit" value="Submit">' +
                '</form></body></html>');
    });

    app.get('/update-form/:fileId', function(req, res) {
        res.status(200)
            .send('<html><body>' +
                '<form name="upload" method="post" action="' + 'http://' + req.headers.host + '/api/file/update-single-file-content/' + req.params.fileId + '" enctype="multipart/form-data">' +
                '<input type="file" name="uploadFile">' +
                '<input type="submit" value="Submit">' +
                '</form></body></html>');
    });
    app.post(API + 'upload-single-file/:userId', upload.single('uploadFile'), function(req, res) {
        File.uploadSingleFile(req.file, req.params.userId, function(err, result) {
            if (err) {
                res.status(500).send({
                    message: 'Error uploading file ' + req.file.originalName
                });
            } else {
                res.send({
                    message: 'File has been uploaded',
                    fileId: result._id,
                    links: {
                        downloadFile: 'http://' + req.headers.host + API + 'download-file/' + result._id,
                        post: { updateSingleFileContent: 'http://' + req.headers.host + API + 'update-single-file-content/' + result._id },
                        delete: {
                            deleteFile: 'http://' + req.headers.host + API + '/' + result._id
                        }
                    }
                });
            }
        });
    });
    app.get(API + 'download-file/:fileId', function(req, res) {
        File.downloadFile(req.params.fileId, function(err, result) {
            if (err) {
                res.status(404).send({
                    message: 'File not found'
                });
            } else {
                res.setHeader('Content-disposition', 'attachment; filename=' + result.fileName);
                res.setHeader('Content-type', result.fileType);
                res.status(200).send(result.contents[0].content);
            }
        });
    });
    app.get(API + 'read-file/:fileId', function(req, res) {
        File.downloadFile(req.params.fileId, function(err, result) {
            if (err) {
                res.status(404).send({
                    message: 'File not found'
                });
            } else {
                res.setHeader('Content-type', result.fileType);
                res.status(200).send(result.contents[0].content);
            }
        });
    });
    app.post(API + 'update-single-file-content/:fileId', upload.single('uploadFile'), function(req, res) {
        File.updateSingleFileContent(req.file, req.params.fileId, function(err) {
            if (err) {
                res.status(500).send({
                    message: 'Error uploading file ' + req.file.originalName
                });
            } else {
                res.send({
                    message: 'File has been updated',
                    links: {
                        downloadFile: 'http://' + req.headers.host + API + 'download-file/' + req.params.fileId
                    }
                });
            }
        });
    });
    app.delete(API + ':fileId', function(req, res) {
        File.deleteFile(req.params.fileId, function(err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(result);
            }
        });
    });
}
module.exports = execute;
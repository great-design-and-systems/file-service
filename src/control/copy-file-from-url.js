'use strict';
var unirest = require('unirest');
var SetProxy = require('./set-proxy');
var CreateUploadedFile = require('./create-uploaded-file');
var CreateUploadedFileContent = require('./create-uploaded-file-content');
var fs = require('node-fs');
var convertStream = require('convert-stream');
function CopyFileFromUrl(url, name, callback) {
    new SetProxy(unirest.head(url)).getRequest().end(function (response) {
        name = name || url;
        if (!response.error || response.error === null) {
            new CreateUploadedFile(name, response.headers['content-type'],
                response.headers['content-length'], 'SYSTEM', function (errUpload, fileUploadResult) {
                    if (errUpload) {
                        callback(errUpload);
                    } else {
                        var fileName = __dirname + '/../../uploads/' + fileUploadResult._id;
                        var writeStream = fs.createWriteStream(fileName);
                        new SetProxy(unirest.get(url)).getRequest().end().pipe(writeStream);
                        writeStream.on('finish', function () {
                            convertStream.toBuffer(fs.createReadStream(fileName)).then(function (data) {
                                new CreateUploadedFileContent(fileUploadResult._id, data, 0, function (errUploadContent) {
                                    if (errUploadContent) {
                                        callback(errUploadContent);
                                    } else {
                                        callback(null, fileUploadResult);
                                    }
                                    fs.unlink(fileName);
                                });
                            });
                        });
                    }
                });
        }
        else {
            callback(response.error);
        }
    });
}
module.exports = CopyFileFromUrl;
'use strict';
var unirest = require('unirest');
var SetProxy = require('./set-proxy');
var CreateUploadedFile = require('./create-uploaded-file');
var CreateUploadedFileContent = require('./create-uploaded-file-content');
function CopyFileFromUrl(url, name, callback) {
    new SetProxy(unirest.get(url)).getRequest().end(function (response) {
        console.log(response.headers);
        name = name || url;
        if (!response.error || response.error === null) {
            new CreateUploadedFile(name, response.headers['content-type'],
                response.headers['content-length'], 'SYSTEM', function (errUpload, fileUploadResult) {
                    if (errUpload) {
                        callback(errUpload);
                    } else {
                        new CreateUploadedFileContent(fileUploadResult._id, response.body, 0, function (errUploadContent) {
                            if (errUploadContent) {
                                callback(errUploadContent);
                            } else {
                                callback(null, {
                                    data: fileUploadResult
                                });
                            }
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
'use strict';
var mongoose = require('mongoose');
var uploadedFileContentSchema = new mongoose.Schema({
    fileId: {type: String, required: [true, 'fileId is required.']},
    content: {type: Buffer, required: [true, 'Content is required']},
    contentSequence: Number,
    createdOn: {type: Date, default: Date.now}
});

module.exports = mongoose.model('UploadedFileContent', uploadedFileContentSchema);
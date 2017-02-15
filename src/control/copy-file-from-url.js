'use strict';
var unirest = require('unirest');
var SetProxy = require('./set-proxy');
function CopyFileFromUrl(url, callback) {
    new SetProxy(unirest.get(url)).getRequest().end(function(response)  {
        console.log(response.body);
        callback(null, response.body);
    });
}
module.exports = CopyFileFromUrl;
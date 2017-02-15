'use strict';
var PROXY = process.env.PROXY;

function SetProxy(request) {
    if (PROXY) {
        request.proxy(PROXY);
    }
    return {
        getRequest: function () {
            return request;
        }
    };
}

module.exports = SetProxy;
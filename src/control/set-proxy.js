'use strict';
var PROXY = process.env.PROXY;

function setProxy(request) {
    if (PROXY) {
        request.proxy(PROXY);
    }
    return {
        getRequest: function () {
            return request;
        }
    }
}
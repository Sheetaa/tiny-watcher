/**
 * @file 过滤器
 * @author Yao Chang(yaochang@baidu.com)
 *
 */

var _ = require('lodash');
var pathToRegexp = require('path-to-regexp');

function filter(conf, filePath) {

    var includeFilters = [];
    var excludeFilters = [];

    var filters = {};

    _.extend(filters, conf.globalFilters, conf.commonFilters);

    _.each(conf.filters, function (value, key) {
        filters[key] = conf.filters[key];
    });

    _.each(filters, function (value) {
        if (value.charAt(0) === '!') {
            excludeFilters.push(value.substring(1));
        }
        else {
            includeFilters.push(value);
        }
    });

    var inFlag = _.any(includeFilters, function (value) {
        var regexp = pathToRegexp(value, null, {
            sensitive: true,
            strict: true
        });
        if (regexp.test(filePath)) {
            return true;
        }
        return false;
    });

    var exFlag = _.any(excludeFilters, function (value) {
        var regexp = pathToRegexp(value, null, {
            sensitive: true,
            strict: true
        });
        if (regexp.test(filePath)) {
            return true;
        }
        return false;
    });

    if (inFlag && !exFlag) {
        return true;
    }

    return false;
}

module.exports = filter;

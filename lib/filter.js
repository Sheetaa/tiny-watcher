/**
 * @file 过滤器
 * @author Sheeta(wuhayao@gmail.com)
 *
 */

var _ = require('lodash');
var pathToRegexp = require('path-to-regexp');

/**
 * 过滤器构造函数
 * 生成的对象包括excludeFilters和includeFilters两个数组
 *
 * @public
 * @constructor
 * @param {Object} conf watch-config配置信息的对象
 */
function Filter(conf) {
    var filters = {};

    _.extend(filters, conf.globalFilters, conf.commonFilters);

    _.each(conf.filters, function (value, key) {
        filters[key] = conf.filters[key];
    });

    this.includeFilters = [];
    this.excludeFilters = [];
    var me = this;

    _.each(filters, function (value) {
        if (value.charAt(0) === '!') {
            me.excludeFilters.push(value.substring(1));
        }
        else {
            me.includeFilters.push(value);
        }
    });
}

/**
 * 过滤器匹配函数
 *
 * @public
 * @param {Object} conf watch-config配置信息的对象
 *
 * @return {boolean} 匹配成功true，失败false
 */
Filter.prototype.match = function (filePath) {

    var inFlag = any(this.includeFilters, filePath);

    var exFlag = any(this.excludeFilters, filePath);

    if (inFlag && !exFlag) {
        return true;
    }

    return false;
}

/**
 * 判断路径是否在过滤器的过滤范围
 *
 * @private
 * @param {Object} filter 键为过滤名字，值为过滤字符串的对象
 * @param {string} path 字符串
 *
 * @return {boolean} 在过滤范围，返回true，否则为false
 */
function any(filter, path) {
    return _.any(filter, function (value) {
        var regexp = pathToRegexp(value, null, {
            sensitive: true,
            strict: true
        });

        if (regexp.test(path)) {
            return true;
        }

        return false;
    });
}

exports.Filter = Filter;

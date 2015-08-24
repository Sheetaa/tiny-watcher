/**
 * @file 文件监视器
 * @author Yao Chang(yaochang@baidu.com)
 * @date 2015-8-18
 */

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var filter = require('./filter');

function watch(dir, conf) {

    fs.watch(dir, {
        persistent: true,
        recursive: true
    }, function (event, filename) {
        var filePath = path.resolve(dir, filename);
        if (filter(conf, filePath)) {
            console.log('[' + chalk.yellow(filePath) + '] was changed!');
        }
    });
}

module.exports = watch;

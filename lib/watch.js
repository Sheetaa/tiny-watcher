/**
 * @file 文件监视器
 * @author Sheeta(wuhayao@gmail.com)
 */

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var Filter = require('./filter').Filter;

function watch(dir, conf) {

    var filter = new Filter(conf);

    fs.watch(dir, {
        persistent: true,
        recursive: true
    }, function (event, filename) {
        var filePath = path.resolve(dir, filename);
        if (filter.match(filePath)) {
            console.log('[' + chalk.yellow(filePath) + '] was changed!');
        }
    });
}

module.exports = watch;

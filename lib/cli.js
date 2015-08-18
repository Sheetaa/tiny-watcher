/**
 * @file
 * @author Yao Chang(yaochang@baidu.com)
 *
 */

var cmd = require('./cmd');
var watch = require('./watch');

exports.run = function (args) {

    var cfgPath = cmd.parse(args).cfgPath;
    var conf = require(cfgPath);
    var dir =process.cwd();

    watch(dir, conf);

}

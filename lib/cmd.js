/**
 * @file 解析命令行参数
 * @author Yao Chang(yaochang@baidu.com)
 *
 */

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

exports.parse = function (args) {
    // 第一个参数是node，第二个参数是tiny-watcher，参数从第三个开始
    args = args.slice(2);

    var dir =process.cwd();
    var arg;
    var cfgName;
    var cfgPath;

    if (args.length !== 0) {
        arg = args.shift();
        var aboutCfg = arg.match(/^--config=([\w-]+\.js)$/);
        if (!aboutCfg) {
            console.log(chalk.red('[ERROR]')
                + ' Please enter config correctly, such as --config=xxx.js.');
            process.exit(1);
        }
        cfgName = aboutCfg[1];
    }
    else {
        cfgName = 'watch-config.js';
    }

    cfgPath = path.resolve(dir, cfgName);

    if (!fs.existsSync(cfgPath)) {
        console.log(chalk.red('[ERROR]') + ' Please set a config file!');
        process.exit(1);
    }

    return {
        cfgName: cfgName,
        cfgPath: cfgPath
    };
};

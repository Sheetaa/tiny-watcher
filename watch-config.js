/**
 * @file 配置文件
 * @author Yao Chang(yaochang@baidu.com)
 *
 */

// 全局过滤器
exports.globalFilters = {
    ignoreNodeModules: '!*/node_modules/*',
    ignoreVCSFiles   : '!*.(git|svn|idea)/*',
    ignoreIDEFiles   : '!*.DS_Store',
    ignoreNodeConfig : '!*.(gitignore|md)',
    ignoreNpm: '!*/package.json'
};

// 常用过滤器
exports.commonFilters = {
    staticFiles: '*.(tpl|html|js|coffee|less|styl|css|xml)',
    mediaFiles: '*.(gif|jpg|jpeg|png|swf|fla|mp3)'
};

exports.filters = [
    '*.tpl',
    '*.src'
];

exports.fnList = [
    function () {
        console.log('execute fn 1');
    },
    function () {
        console.log('execute fn 2');
    }
];

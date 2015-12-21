'use strict'

// common path for gulp
let paths = {
    DIST: '../blog_back/public',
    // DIST: './dist',
    Entry: './src/js/index.js',
    HTML: './src/index.html',
    SASS: {
        // 页面级样式文件
        view: './src/scss', 
        // 组件级样式文件
        component: './src/js/component'
    },
    CSS: './src/css',
    IMAGE: './src/img',
    FONT: './src/font',
    // 静态资源md5后缀映射表
    MAP: './dist/map'
};

exports.paths = paths;

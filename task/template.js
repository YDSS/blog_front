'use strict'

let gulp = require('gulp');
let path = require('path');
let revReplace = require('gulp-rev-replace');
let paths = require('./config').paths;
let isDev = process.env.NODE_ENV !== 'production';
let fs = require('fs');

// 服务端有jade引擎，这里不做预编译
gulp.task('template', ['css', 'sass', 'browserify'], () => {
    if (isDev) {
        return gulp.src(paths.HTML)
            .pipe(gulp.dest(paths.DIST));
    }
    else {
        return gulp.src(paths.Template + '/*.jade')
            .pipe(gulp.dest(path.join(__dirname, '../../blog_back/views')));
    }

    // 暂时不加md5
    // if (isDev) {
    //     // return gulp.src(paths.Template + '/**')
    //     return gulp.src(paths.HTML)
    //         .pipe(gulp.dest(paths.DIST));
    // }
    // else {
    //     // 取出gulp-rev生成的静态文件资源map
    //     let manifest = gulp.src(paths.MAP + '/*.json');

    //     return gulp.src(paths.HTML)
    //         // gulp-rev-replace替换html中引用的资源为md5后缀
    //         .pipe(revReplace({manifest: manifest}))
    //         .pipe(gulp.dest(paths.DIST));
    // }
});

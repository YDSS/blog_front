'use strict'

let gulp = require('gulp');
let path = require('path');
let revReplace = require('gulp-rev-replace');
let paths = require('./config').paths;
let isDev = process.env.NODE_ENV !== 'production';
let fs = require('fs');

gulp.task('html', ['css', 'sass', 'browserify'], () => {
//gulp.task('html', ['build:js', 'build:css'], () => {
    if (isDev) {
        return gulp.src(paths.HTML)
            .pipe(gulp.dest(paths.DIST));
    }
    else {
        // 取出gulp-rev生成的静态文件资源map
        let manifest = gulp.src(paths.MAP + '/*.json');

        return gulp.src(paths.HTML)
            // gulp-rev-replace替换html中引用的资源为md5后缀
            .pipe(revReplace({manifest: manifest}))
            .pipe(gulp.dest(paths.DIST));
    }
});

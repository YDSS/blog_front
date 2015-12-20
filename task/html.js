'use strict'

let gulp = require('gulp');
let path = require('path');
let paths = require('./config').paths;
let revCollector = require('gulp-rev-collector');
let isDev = process.env.NODE_ENV !== 'production';
let fs = require('fs');

gulp.task('html', ['build:js', 'build:css'], () => {
    if (isDev) {
        gulp.src(paths.HTML)
            .pipe(gulp.dest(paths.DIST));
    }
    else {
        // @QUESTION 即使让html依赖生成map.json文件的task，
        // 依旧读不到map.json文件，可能是map.json生成比较慢，
        // 而task在他们生成好之前就执行下面的task了
        // 这里hack一下，设置1s的延迟，留待日后详查！
        setTimeout(() => {
            gulp.src([paths.MAP + '/*.json', paths.HTML])
                .pipe(revCollector({
                    // replaceReved: true
                    // dirReplacements: {
                }))
                .pipe(gulp.dest(paths.DIST));
        }, 1000);
    }
});

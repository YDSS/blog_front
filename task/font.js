'use strict'

let gulp = require('gulp');
let path = require('path');
let paths = require('./config').paths;

gulp.task('font', () => {
    gulp.src(paths.FONT + '/**')
        .pipe(gulp.dest(paths.DIST + '/font'));
});

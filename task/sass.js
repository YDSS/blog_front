'use strict'

let gulp = require('gulp');
let sass = require('gulp-sass');
let paths = require('./config').paths;
let path = require('path');

gulp.task('sass', () => {
    gulp.src(paths.SASS + '/**')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.join(paths.DIST, 'css')));
});

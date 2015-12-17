'use strict'

let gulp = require('gulp');
let sass = require('gulp-sass');
let concat = require('gulp-concat');
let sourcemap = require('gulp-sourcemaps');
let paths = require('./config').paths;
let path = require('path');

let nodeSassOption = {
    includePaths: [
        // 设置compass的路径，import时直接用compass/xxx即可
        path.join(__dirname, '../src/scss/mixin/compass'),
        path.join(__dirname, '../src/scss'),
        path.join(__dirname, '../src/js/component')
    ]
};

gulp.task('sass', () => {
    gulp.src([
        paths.SASS.view + '/**/*.scss',
        paths.SASS.component + '/**/*.scss'
    ])
        .pipe(sourcemap.init())
        .pipe(sass(nodeSassOption).on('error', sass.logError))
        .pipe(concat('bundle.css'))
        .pipe(sourcemap.write())
        .pipe(gulp.dest(path.join(paths.DIST, 'css')));
});

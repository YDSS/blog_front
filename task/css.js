'use strict'

let gulp = require('gulp');
let path = require('path');
let concat = require('gulp-concat');
let minifyCss = require('gulp-minify-css');
let sourcemap = require('gulp-sourcemaps');
let rev = require('gulp-rev');
let paths = require('./config').paths;
let isDev = process.env.NODE_ENV !== 'production';
let comboName = 'third-part.css';

gulp.task('css', () => {
    let stream = gulp.src(paths.CSS + '/**/*.css');

    if (isDev) {
        stream
            .pipe(sourcemap.init())
            .pipe(concat(comboName))
            .pipe(sourcemap.write())
            .pipe(gulp.dest(path.join(paths.DIST, 'css')));
    }
    else {
        stream
            .pipe(concat(comboName))
            .pipe(minifyCss())
            .pipe(rev())
            .pipe(gulp.dest(path.join(paths.DIST, 'css')))
            .pipe(rev.manifest('css-map.json'))
            .pipe(gulp.dest(path.join(paths.DIST, 'map')));
    }
});

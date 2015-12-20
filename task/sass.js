'use strict'

let gulp = require('gulp');
let sass = require('gulp-sass');
let concat = require('gulp-concat');
let sourcemap = require('gulp-sourcemaps');
let minifyCss = require('gulp-minify-css');
let rev = require('gulp-rev');
let paths = require('./config').paths;
let path = require('path');
let isDev = process.env.NODE_ENV !== 'production';
let comboName = 'component.css';

let nodeSassOption = {
    includePaths: [
        // 设置compass的路径，import时直接用compass/xxx即可
        path.join(__dirname, '../src/scss/mixin/compass'),
        path.join(__dirname, '../src/scss'),
        path.join(__dirname, '../src/js/component')
    ]
};

gulp.task('sass', () => {
    let sassStream = gulp.src([
        paths.SASS.view + '/**/*.scss',
        paths.SASS.component + '/**/*.scss'
    ])
        .pipe(sass(nodeSassOption).on('error', sass.logError));

    if (isDev) {
        sassStream
            .pipe(sourcemap.init())
            .pipe(concat(comboName))
            .pipe(sourcemap.write())
            .pipe(gulp.dest(path.join(paths.DIST, 'css')));
    }
    else {
        sassStream
            .pipe(concat(comboName))
            .pipe(minifyCss())
            .pipe(rev())
            .pipe(gulp.dest(path.join(paths.DIST, 'css')))
            .pipe(rev.manifest('sass-map.json'))
            .pipe(gulp.dest(path.join(paths.DIST, 'map')));
    }
});

'use strict'

let gulp = require('gulp');
let imagemin = require('gulp-imagemin');
let pngquant = require('imagemin-pngquant');
let path = require('path');
let paths = require('./config').paths;
let isDev = process.env.NODE_ENV !== 'production';

gulp.task('image', () => {
    let stream = gulp.src(paths.IMAGE + '/**');

    if (isDev) {
        stream.pipe(gulp.dest(path.join(paths.DIST, 'img')));
    }
    else {
        stream
            .pipe(imagemin({
                progressive: true,
                use: [pngquant()]
            }))
            .pipe(gulp.dest(path.join(paths.DIST, 'img')));
    }
}); 

'use strict'

let gulp = require('gulp');
let path = require('path');
let paths = require('./task/config').paths;
let requireDir = require('require-dir');

requireDir('./task');

gulp.task('default', ['build-js', 'build-css', 'copy', 'server', 'watch']);

gulp.task('build:back', ['build-js', 'build-css', 'copy', 'watch']);

gulp.task('build', ['build-js', 'build-css', 'copy']);

gulp.task('build-js', ['browserify']);

gulp.task('watch', function () {
    gulp.watch(paths.HTML, ['copy:html']);
    gulp.watch(paths.SASS + '/**', ['sass']);
    gulp.watch(paths.CSS + '/**', ['copy:css']);
    gulp.watch(paths.IMAGES + '/**', ['copy:image']);
});

gulp.task('build-css', ['sass', 'copy:css']);

gulp.task('copy', ['copy:css', 'copy:image', 'copy:html']);

gulp.task('copy:css', function () {
    gulp.src(paths.CSS + '/**')
        .pipe(gulp.dest(path.join(paths.DIST, 'css')));
});

gulp.task('copy:image', function () {
    gulp.src(paths.IMAGES + '/**')
        .pipe(gulp.dest(path.join(paths.DIST, 'img')));
}); 

gulp.task('copy:html', function () {
    gulp.src(paths.HTML)
        .pipe(gulp.dest(paths.DIST));
});

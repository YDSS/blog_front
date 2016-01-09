'use strict'

let gulp = require('gulp');
let path = require('path');
let paths = require('./task/config').paths;
let requireDir = require('require-dir');

requireDir('./task');

gulp.task('default', ['build', 'server', 'watch']);

gulp.task('build:back', ['build', 'watch']);

gulp.task('watch', function () {
    gulp.watch(paths.Template + '/*.jade', ['template']);
    gulp.watch([
        paths.SASS.view + '/**/*.scss',
        paths.SASS.component + '/**/*.scss'
    ], 
        ['sass']
    );
    gulp.watch(paths.CSS + '/**', ['css']);
    gulp.watch(paths.IMAGES + '/**', ['image']);
});

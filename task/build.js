'use strict'

let gulp = require('gulp');
let path = require('path');
let paths = require('./config').paths;

gulp.task('build', ['build:js', 'build:css', 'other']);

gulp.task('build:js', ['browserify']);

gulp.task('build:css', ['sass', 'css']);

gulp.task('other', ['font', 'image', 'html']);

'use strict'

let gulp = require('gulp');
let gutil = require('gulp-util');
let browserify = require('browserify');
let babelify = require('babelify');
let watchify = require('watchify');
let source = require('vinyl-source-stream');
let paths = require('./config').paths;

// browserfiy instance
let b = browserify({
    entries: [paths.Entry],
    debug: true,
    cache: {},
    packageCache: {},
    plugin: [watchify]
});
// transform react to plain js
b.transform('babelify', {
    // presets of babel, see http://babeljs.io/docs/plugins for more
    presets: [
        'es2015',
        'stage-1',
        'stage-2',
        'react'
    ]
})

function bundle() {
    b.bundle()
        .on('error', gutil.log.bind(gutil, 'Browerify Error'))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(paths.DIST));
}

// cause browserify has watchify as as a watcher
// gulp no need watch js file any more

// watchify event, watch bundle files to change
b.on('update', ids => {
    console.log('watchify report update');
    console.log(ids);
    bundle();
});

// watchify change log
b.on('log', msg => {
    console.log(msg);
});

gulp.task('browserify', () => {
    bundle();
});

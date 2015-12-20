'use strict'

let gulp = require('gulp');
let gutil = require('gulp-util');
let browserify = require('browserify');
let babelify = require('babelify');
let watchify = require('watchify');
let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');
let uglify = require('gulp-uglify');
let rev = require('gulp-rev');
let path = require('path');
let paths = require('./config').paths;
let isDev = process.env.NODE_ENV !== 'production';

// browserfiy instance
let b = browserify({
    entries: [paths.Entry],
    debug: isDev,
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
    let stream = b.bundle()
        .on('error', gutil.log.bind(gutil, 'Browerify Error'))
        .pipe(source('bundle.js'));

    if (isDev) {
        stream.pipe(gulp.dest(path.join(paths.DIST, 'js')));
    }
    else {
        stream
            // 先将stream转成vinyl buffer，uglify才能进行压缩
            // issue: http://stackoverflow.com/questions/24992980/how-to-uglify-output-with-browserify-in-gulp
            .pipe(buffer())
            .pipe(uglify())
            .pipe(rev())
            .pipe(gulp.dest(path.join(paths.DIST, 'js')))
            .pipe(rev.manifest('js-map.json'))
            .pipe(gulp.dest(path.join(paths.DIST, 'map')));
    }
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

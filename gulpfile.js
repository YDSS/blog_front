var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var st = require('st');
var http = require('http');
var path = require('path');

var paths = {
    DIST: './dist',
    Entry: './src/js/index.js',
    HTML: './src/index.html',
    SASS: './src/scss',
    CSS: './src/css',
    IMAGES: './src/img/**'
};

gulp.task('default', ['build-js', 'build-css', 'copy', 'server', 'watch']);

// browserfiy instance
var b = browserify({
    entries: [paths.Entry],
    debug: true,
    cache: {},
    packageCache: {},
    plugin: [watchify]
});
// transform react to plain js
b.transform('babelify', {
    presets: [
        'es2015',
        'react'
    ]
})

gulp.task('build-js', function () {
    bundle();
});

function bundle() {
    b.bundle()
        .on('error', gutil.log.bind(gutil, 'Browerify Error'))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(paths.DIST));
}

gulp.task('watch', function () {
    gulp.watch(paths.HTML, ['copy:html']);
    gulp.watch(paths.SASS + '/**', ['build-sass']);
    gulp.watch(paths.CSS + '/**', ['copy:css']);
    gulp.watch(paths.IMAGES + '/**', ['copy:image']);
    gulp.watch('./src/app.js', ['build-js']);
    // watchify event, watch bundle files to change
    b.on('update', function (ids) {
        console.log('watchify report update');
        console.log(ids);
        bundle();
    });

    // watchify change log
    b.on('log', function (msg) {
        console.log(msg);
    });
});

gulp.task('build-css', ['build-sass', 'copy:css']);

gulp.task('build-sass', function () {
    gulp.src(paths.SASS + '/**')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.join(paths.DIST, 'css')));
});

gulp.task('copy', ['copy:css', 'copy:image', 'copy:html']);

gulp.task('copy:css', function () {
    gulp.src(paths.CSS + '/**')
        .pipe(gulp.dest(path.join(paths.DIST, 'css')));
});

gulp.task('copy:image', function () {
    gulp.src(paths.IMAGES)
        .pipe(gulp.dest(path.join(paths.DIST, 'img')));
}); 

gulp.task('copy:html', function () {
    gulp.src(paths.HTML)
        .pipe(gulp.dest(paths.DIST));
});

gulp.task('server', function () {
    var port = 3000;
    http.createServer(
        st({
            path: paths.DIST,
            cache: false
        })
    ).listen(port);
    console.log('please browser http://127.0.0.1:' + port);
});

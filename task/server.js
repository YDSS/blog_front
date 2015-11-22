'use strict'

let gulp = require('gulp');
let st = require('st');
let http = require('http');
let path = require('path');
let paths = require('./config').paths;

gulp.task('server', function () {
    var port = 8888;
    http.createServer(
        st({
            path: paths.DIST,
            cache: false,
            index: 'index.html'
        })
    ).listen(port);
    console.log('please browser http://127.0.0.1:' + port);
});


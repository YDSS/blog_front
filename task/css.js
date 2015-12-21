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
        return stream
            .pipe(sourcemap.init())
            .pipe(concat(comboName))
            .pipe(sourcemap.write())
            .pipe(gulp.dest(path.join(paths.DIST, 'css')));
    }
    else {
        return stream
            .pipe(concat(comboName))
            .pipe(minifyCss())
            .pipe(rev())
            .pipe(gulp.dest(path.join(paths.DIST, 'css')))
            .pipe(rev.manifest('css-map.json'))
            .pipe(gulp.dest(paths.MAP));
    }

    // 坑：声明stream变量后，千万不要截断stream.pipe，这样stream对象
    // 就不是最后一个pipe返回的对象了，如下面的栗子：
    //     stream
    //         .pipe(sourcemap.init())
    //         .pipe(concat(comboName))
    //         .pipe(sourcemap.write())
    //         .pipe(gulp.dest(path.join(paths.DIST, 'css')));
    //
    // return stream;
    //
    // 虽然return stream只是为了提示后面的task当前task已完成，但估计
    // 返回的stream对提示完成有影响
});

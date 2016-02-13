var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var webpackConf = require('./webpack.config');
var path = require('path');
var paths = require('./conf');

gulp.task('default', ['webpack-dev-server', 'html-watch', 'template-watch']);
// build development
gulp.task('build-dev', ['webpack:build-dev'], function () {
    gulp.watch(['./src/app/**/*'], ['webpack:build-dev']);
});

// build production
gulp.task('build', ['webpack:build']);

// webpack-dev-server单独使用需要index.html
gulp.task('html', function () {
    gulp.src(paths.HTML)
        .pipe(gulp.dest(paths.DIST));
});

gulp.task('html-watch', function () {
    gulp.watch(paths.HTML, ['html']);
});

// webpack-dev-server配合backend使用需要jade模板
gulp.task('template', function () {
    gulp.src(paths.TEMPLATE + '/*.jade')
        .pipe(gulp.dest(paths.BACKEND + '/views'));
});

gulp.task('template-watch', function () {
    gulp.watch(paths.TEMPLATE + '/**', ['template']);
});

gulp.task('webpack:build', function (done) {
    var myConf = Object.create(webpackConf);

    // 编译结果直接放到blog_back中
    myConf.output.path = path.resolve(paths.BACKEND, 'public');
    // 生产环境使用的插件，不要放到webpack.conf里
    myConf.plugins = myConf.plugins.concat(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.ProgressPlugin(function handler(percentage, msg) {
            console.log((percentage * 100) + '%', msg);
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    webpack(myConf, function (err, stats) {
        if (err) {
            throw new gutil.PluginErr('webpack:build', err);
        }
        gutil.log('[webpack:build]', stats.toString({
            color: true
        }));
        // gulp异步task执行完毕
        done();
    })
});

var myDevConf = Object.create(webpackConf);

// 加上hot-replace, 只在dev环境中使用
// myDevConf.entry.app.unshift('webpack/hot/dev-server');
myDevConf.devtool = 'source-map';
myDevConf.debug = true;
myDevConf.plugins = webpackConf.plugins.concat(
    new webpack.ProgressPlugin(function handler(percentage, msg) {
        console.log((percentage * 100) + '%', msg);
    })
);

// 把webpack实例缓存下来，这样就不用每次启动build-dev都新建一个实例
var devCompiler = webpack(myDevConf);

gulp.task('webpack:build-dev', ['html'], function (done) {
    devCompiler.run(function (err, stats) {
        if (err) {
            throw new gutil.PluginErr('webpack:build-dev', err);
        }
        gutil.log('[webpack:build]', stats.toString({
            color: true
        }));
        // gulp异步task执行完毕
        done();
    });
});

gulp.task('webpack-dev-server', ['html', 'template'], function (done) {
    var myConf = Object.create(webpackConf);
    // --inline的node api写法, 也加上hot-replace, 只在dev环境中使用
    myConf.entry.app.unshift('webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server');
    myConf.devtool = 'source-map';
    myConf.debug = true;
    // 与后端服务器连接，需要full url，这里覆盖webpack.conf里的publicPath
    myConf.output.publicPath = 'http://127.0.0.1:8080/';
    myConf.plugins = webpackConf.plugins.concat(
        // 加上热替换组件
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProgressPlugin(function handler(percentage, msg) {
            console.log((percentage * 100) + '%', msg);
        })
    );

    new webpackDevServer(webpack(myConf), {
        contentBase: paths.DIST,
        publicPath: myConf.output.publicPath,
        hot: true,
        // proxy: {
        //     '/api/*': {
        //         target: 'http://127.0.0.1:3000',
        //         secure: false
        //     }
        // },
        stats: {
            color: true
        }
    }).listen(8080, 'localhost', function (err) {
        if (err) {
            throw new gutil.PluginErr('webpack:webpack-dev-server', err);
        }
        gutil.log("[webpack-dev-server]", "http://localhost:8080");
    });
});

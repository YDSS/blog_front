var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var paths = require('./conf');
// webpack编译优化，有dist的库不再用webpack编译
var node_modules = path.resolve(__dirname, 'node_modules');
// var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

var entry = paths.ENTRY;

var config = {
    entry: {
        // app: ['webpack/hot/dev-server', entry],
        app: [entry],
        // 第三方类库
        vendors: [
            'react', 
            'react-dom',  
            'redux', 
            'react-redux', 
            'redux-router',
            'react-router',
            'moment',
            'highlight.js',
            'history',
            'marked'
        ]
    },
    output: {
        path: path.resolve(__dirname, paths.DIST),
        publicPath: '/',
        filename: 'js/[name].bundle.js',
        chunkFilename: '[chunkhash].js'
    },
    module: {
        loaders: [{
            test: /(\.jsx|\.js)$/,
            // loaders: ['react-hot', 'babel'],
            loaders: ['babel'],
            exclude: [node_modules]
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css!sass')
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                // 引入方式
                'file-loader?name=img/[name].[ext]',
                // 图片优化, 详细配置在module同级的imagemin属性中
                'img?minimize'
            ]
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('css')
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('css!less')
        }, {
            // font-awesome
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
            loader: "url-loader?limit=10000&mimetype=application/font-woff&name=font/[name].[ext]" 
        }, {
            // font-awesome
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
            loader: "file-loader?name=font/[name].[ext]" 
        }]
        // noParse: [pathToReact]
    },
    sassLoader: {
        includePaths: [
            // 设置compass的路径，import时直接用compass/xxx即可
            path.resolve(__dirname, './src/scss/mixin/compass'),
            path.resolve(__dirname, './src/scss'),
            path.resolve(__dirname, './src/app/component')
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/style.css', {
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.bundle.js')
    ],
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.js'],
        alias: {
            // 防止依赖react的模块直接使用绝对路径, 必须放在所有依赖模块之前
            // issue: https://github.com/christianalfoni/react-webpack-cookbook/issues/16
            // 'react/lib': path.resolve(node_modules, 'react/lib'),
            // 'react': pathToReact
        }
    },
    // 默认情况下只在webpack是production mode时会执行优化(或者是有UglifyJsPlugin执行)
    imagemin: {
        gifsicle: { interlaced: false },
        jpegtran: {
            progressive: true,
            arithmetic: false
        },
        optipng: { optimizationLevel: 5 },
        pngquant: {
            floyd: 0.5,
            speed: 2
        },
        svgo: {
            plugins: [
                { removeTitle: true },
                { convertPathData: false }
            ]
        }
    }
}

module.exports = config;

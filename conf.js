var path = require('path');

module.exports = {
    // DIST: './dev',
    DIST: './dist',
    // DIST: './prod',
    BACKEND: path.resolve(__dirname, '../blog_back'),
    ENTRY: './src/js/index.js',
    HTML: './src/index.html',
    TEMPLATE: './src/template' 
}

const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const common = require('./webpack.common.config');

module.exports = merge(common, {
    devtool: false,
    mode: 'production',
    optimization: {
        minimize: true
    },
    plugins: [
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.html$|\.css$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]
});

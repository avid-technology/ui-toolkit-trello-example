const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const webpack = require('webpack');

const merge = require('webpack-merge');
const common = require('./webpack.common.config');

const config = require('../src/project.config.json');

let host = '';

if (config.connection.hostPort && config.connection.hostPort.length > 0) {
    host = `${config.connection.hostIp}:${config.connection.hostPort}`;
} else {
    host = config.connection.hostIp;
}

module.exports = merge(common, {
    devtool: 'cheap-eval-source-map',
    mode: 'development',

    devServer: {
        proxy: {
            '/': {
                target: `https://${host}`,
                secure: false,
                autoRewrite: true,
                xfwd: true,
            }
        }
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') +
            ' (:elapsed seconds)',
            clear: false,
        })
    ]
});

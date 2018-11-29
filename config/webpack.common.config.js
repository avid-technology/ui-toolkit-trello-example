/**
 * Copyright 2018 by Avid Technology, Inc.
 */
const paths = require('./paths');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoaderOptionsPlugin = require('webpack').LoaderOptionsPlugin;
const fs = require('fs');
const path = require('path');
const base64Img = require('base64-img');

// transform icon to base64
const icon = base64Img.base64Sync(path.resolve(__dirname, '../src/images/icon.svg'));
const iconJson = path.resolve(__dirname, '../src/images/icon.json');
fs.writeFileSync(iconJson, JSON.stringify({
    icon: icon,
}));

module.exports = {
    entry: paths.appIndexJs,
    output: {
        path: paths.appBuild,
        filename: 'index.js',
        libraryTarget: 'amd',
    },

    resolve: {
        // This allows you to set a fallback for where Webpack should look for modules.
        // We placed these paths second because we want `node_modules` to "win"
        // if there are any conflicts. This matches Node resolution mechanism.
        // https://github.com/facebookincubator/create-react-app/issues/253
        modules: [paths.appNodeModules],
        extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['eslint-loader'],
                include: paths.appSrc,
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|build)/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }, // https://github.com/webpack/webpack/issues/684
            {
                test: /\.html$/,
                use: 'html-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
                        },
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {sourceMap: true},
                    },
                    {
                        loader: 'postcss-loader',
                        options: {sourceMap: true},
                    },
                    {
                        loader: 'sass-loader',
                        options: {sourceMap: true},
                    },
                ],

            },
            {
                test: /\.svg$/,
                use: 'svg-url-loader',
            },
        ],
    },
    plugins: [
        new LoaderOptionsPlugin({
            minimize: true,
        }),
        new MiniCssExtractPlugin({filename: 'style.css', allChunks: true}),
        new CopyWebpackPlugin([
            {
                from: 'src/l10n/lang.*.json',
                to: 'resources/',
                flatten: true,
            }]),
        new CopyWebpackPlugin([
            {
                from: 'src/package.json',
                to: '.',
                flatten: true,
            }]),
    ],
};

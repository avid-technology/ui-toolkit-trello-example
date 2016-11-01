const autoprefixer = require('autoprefixer');

const path = require('path');
const fsSync = require('fs-sync');
const fs = require('fs');

function resolve(subPath) {
    return path.resolve(__dirname, subPath);
}

const distPath = './dist/';
const pluginName = 'trello-plugin-example';
const bundleFilename = 'bundle.js';

const packageJson = JSON.stringify({
        main: './' + bundleFilename,
        avid: {
            format: 'amd',
            autoload: true
        }
    }, null, 2) + '\n';

fsSync.remove(resolve(distPath));
if (fs.existsSync(resolve(distPath))) {
    throw new Error('Failed to delete ' + distPath);
}

fsSync.write(resolve(distPath + pluginName + '/' + 'package.json'), packageJson);

module.exports = {
    entry: './index.js',
    output: {
        path: resolve(distPath + pluginName),
        filename: bundleFilename,
        libraryTarget: 'amd'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style!css"},
            {test: /\.html$/, loader: "html"},
            {test: /\.js$/, exclude: /node_modules/, loader: "babel"},
            {test: /\.scss$/, loader: 'style-loader!css-loader!postcss-loader!sass-loader'}
        ]
    },
    postcss: [
        autoprefixer({
            browsers: [
                "last 2 Chrome versions",
                "last 2 Safari versions",
                "last 2 Firefox versions",
                "last 2 Edge versions"]
        })
    ]
};

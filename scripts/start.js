const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const webpackDevConfig = require('../config/webpack.dev.config');
const compiler = webpack(webpackDevConfig);
const webpackDevServerConfig = require('../config/webpackDevServer.config');
const colors = require('../config/colors');

const config = require('../src/project.config.json');

const port = config.connection.proxyPort;

const server = new WebpackDevServer(compiler, webpackDevServerConfig);

server.listen(port, "localhost", function() {
    console.log('Listening on https://localhost:' + port);
}).on('error', (err) => {
    console.error(`${colors.FgRed}ERROR: Couldn't start proxy on port ${port}.
    Is it already running?
    ${err}
    ${colors.Reset}`);
});

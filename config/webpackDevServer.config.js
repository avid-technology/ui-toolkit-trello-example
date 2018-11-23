const fs = require('fs');
const path = require('path');
const request = require('request');
const proxy = require('http-proxy-middleware');
const http2 = require('spdy');

const config = require('../src/project.config.json');
config.identity.appName = require('../src/package.json').identity.appName;
config.main = require('../src/package.json').main;
config.avid = require('../src/package.json').avid;

let host = '';

if (config.connection.hostPort && config.connection.hostPort.length > 0) {
    host = `${config.connection.hostIp}:${config.connection.hostPort}`;
} else {
    host = config.connection.hostIp;
}

function injectApp(req, res, next) {
    request({
        url: `https://${host}${req.originalUrl}`,
        strictSSL: false,
        json: true,
        method: 'GET',
        gzip: true,
        credentials: 'include',
        headers: req.headers,
    }, (err, response, body) => {
        if(err) {
            console.error(err);
            next();
        }
        else {
            body.plugins.push({
                folderName: config.identity.appName,
                main: config.main,
                avid: config.avid
            });
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(body));
            return;
        }
    });
};

const cert = fs.readFileSync(path.join(__dirname, '../config/certs/localhost.cert.pem'));
const key = fs.readFileSync(path.join(__dirname, '../config/certs/localhost.key.pem'));

module.exports = {
    // webpack-dev-server options
    publicPath: '/build/',

    hot: true,
    // Enable special support for Hot Module Replacement
    // Page is no longer updated, but a "webpackHotUpdate" message is sent to the content
    // Use "webpack/hot/dev-server" as additional module in your entry point
    // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.

    historyApiFallback: false,
    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.

    compress: true,
    // Set this if you want to enable gzip compression for assets

    proxy: {
        '/': {
            target: `https://${host}`,
            secure: false,
            autoRewrite: true,
            ws: true,
            xfwd: false,
            changeOrigin: true, // needed for virtual hosted sites
            onProxyReq(proxyReq, req, res) {
                if (req.url.startsWith('/auth/') || req.url.startsWith('/apis/')) {
                    proxyReq.setHeader('x-forwarded-host', req.headers.host);
                }
            },
            onProxyReqWs(proxyReq, req, socket, options, head) {
                proxyReq.setHeader('host', req.headers.host);
            },
        },
    },
    // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
    // Use "**" to proxy all paths to the specified server.
    // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
    // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).

    before: function (app) {
        // Here you can access the Express app object and add your own custom middleware to it.
        // For example, to define custom handlers for some paths:

        // serve local module from file system
        app.use(`/plugins/${config.identity.appName}`, (req, res, next) => {
            const url = req.originalUrl.replace(`/plugins/${config.identity.appName}`, '');
            res.redirect(`/build/${url}`)
        });
        // add local module to the list of plugins
        app.get(/\/apis\/avid\.plugins\.list;version=\d;realm=.+\/plugins/, (req, res, next) => {
            injectApp(req, res);
        });

        // force player to connect via localhost
        app.get('/api/xlb/nodes/less', (req, res, next) => {
            res.json({
                status: 'ok',
                data: {
                    xlb_service_port: '5000',
                    xlb_node_full_name: 'localhost',
                    xlb_node_active: '1',
                }
            });
        });
        const playbackProxy = proxy({
            target: `https://${host}:5000`,
            secure: false,
        });
        const server = http2.createServer({ key, cert });
        server.listen(5000);
        server.on('upgrade', playbackProxy.upgrade);
    },

    clientLogLevel: 'info',
    // Control the console log messages shown in the browser when using inline mode. Can be `error`, `warning`, `info` or `none`.

    // webpack-dev-middleware options
    quiet: false,
    noInfo: false,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
    },

    https: { cert, key },
};

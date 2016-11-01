'use strict';

const proxyFactory = require('avid-mcux').proxyFactory;
const docker = require('avid-mcux-mocha-docker-wrapper');
const dockerOptions = {
    DAEMON_HOST: '172.20.0.137',
    DAEMON_PORT: '2376',
    BUS_HOST_IP: '172.20.0.130',
    IMAGE: 'mcs-core/core-plus-mocks',
    TAG: 'dev',
    NAME: 'trello-plugin-dev',
    log: false
};

const LOCAL_HOST = process.env.LOCAL_HOST || 'localhost';
let login = require('./pageObjects/login.js');
let trello = require('./pageObjects/trello.js');
let _url = null;
let proxy = null;

describe('Trello plugin test suite', function () {
    this.timeout(60000);

    docker(dockerOptions, (url) => {
        _url = url;
    });

    before('open proxy', done => {
        proxy = proxyFactory.createProxy({
            backendUrl: _url,
            input: process.cwd(),
            port: 9000,
            debug: false
        });

        proxy.open().then(done).catch(() => {
            console.log("Proxy is not opened");
            done();
        });
    });

    before('loginAndOpenTrelloPluginPane', done => {
        login.loginAndOpenTrelloPluginPane(LOCAL_HOST, done);
    });

    it('be able to login to trello', done => {
        login.loginToTrello(done);
    });

    it('be able to open board list and come back to boards list', done => {
        trello.openBoard('Welcome Board').then(() => {
            trello.openBoardList(done);
        });
    });

    it('be able to create a new card', done => {
        trello.openBoard('Welcome Board').then(() => {
            trello.addCard('test card', done);
        });
    });

    it('be able to open card and close it', done => {
        trello.openCard('test card')
            .then(() => {
                trello.closeCard(done);
            })
    });

    it('be able to edit card', done => {
        trello.editCard('test card', 'edited test card', done);
    });

    it('be able to drag and drop file link to a card', done => {
        trello.openAssetAndTrelloPane()
            .then(() => {
                trello.dragNDropLink(done);
            });
    });

    it('be able to open internal link from a card', done => {
        trello.openLink(done);
    });

    it('be able to delete card', done => {
        trello.deleteCard('edited test card', done);
    });

    it('be able sign out from trello plugin', done => {
        trello.signOut(done);
    });

    after('close proxy', done => {
        proxy.close()
            .then(done)
            .catch(done);
    });
});

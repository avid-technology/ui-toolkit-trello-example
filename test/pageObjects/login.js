"use strict";

let waitForTimeout = 15000;

function LoginPage () {
    this.avidLogin = 'a';
    this.avidPassword = 'a';
    this.loginButton = 'span=Sign In';
    this.loginInputField = '#name';
    this.passwordInputField = '#password';
    this.licenseAgreement = '.x-btn-text';
    this.pageLoadElement = 'button=Panes';
    this.trelloPluginLayoutButton = 'a=Trello Plugin';
    this.trelloSignInButton = '.trello-plugin-button';
    this.trelloLoginButton = 'a=Log in';
    this.trelloLoginField = 'input#user';
    this.trelloPasswordField = 'input#password';
    this.trelloLogin = 'elliintegration@gmail.com';
    this.trelloPassword = '123asdQWE';
    this.trelloProceedButton = 'input#login';
    this.allowTrelloLogin = 'input.primary';
    this.trelloBoardItem = '.trello-plugin-board-list-item';
    this.progressPane = 'span[class*="background-processes"]';
    this.loginAndOpenTrelloPluginPane = function (ip, done) {
        browser
            .windowHandleMaximize(['current'])
            .url('http://' + ip + ':9000/layout/editor-file-system-layout')
            .waitForVisible(this.loginButton, waitForTimeout)
            .setValue(this.loginInputField, this.avidLogin)
            .setValue(this.passwordInputField, this.avidPassword)
            .click(this.loginButton).then(() => {
                console.log('Login page is available');
            })
            .pause(5000)
            .isExisting(this.licenseAgreement).then(result => {
                if(result) {
                    browser
                        .click(this.licenseAgreement);
                }

                browser
                    .waitForVisible(this.progressPane, waitForTimeout).then(() => {
                        console.log('Sign in works');
                    })
                    .click(this.pageLoadElement)
                    .waitForVisible(this.trelloPluginLayoutButton, waitForTimeout)
                    .click(this.trelloPluginLayoutButton)
                    .waitForVisible(this.trelloSignInButton, waitForTimeout).then(() => {
                        console.log('Trello plugin is opened');
                    }).then(() => {
                        done();
                    })
            })
    };
    this.loginToTrello = function (done) {
        browser
            .click(this.trelloSignInButton)
            .waitUntil(() => {
                return browser.windowHandles().then(windows => {
                    return windows.value.length > 1;
                })
            }, waitForTimeout)
            .windowHandles().then(windowHandles => {
                var lastWindowHandle = windowHandles.value.slice(-1);

                return browser.window(lastWindowHandle[0]);
            })
            .pause(2000)
            .waitForVisible(this.trelloLoginButton, waitForTimeout).then(() => {
                console.log('Trello login page is opened');
            })
            .pause(1000)
            .click(this.trelloLoginButton)
            .waitForVisible(this.trelloProceedButton, waitForTimeout)
            .setValue(this.trelloLoginField, this.trelloLogin)
            .setValue(this.trelloPasswordField, this.trelloPassword)
            .click(this.trelloProceedButton).then(() => {
                console.log('Proceed to allow login');
            })
            .waitForVisible(this.allowTrelloLogin, waitForTimeout)
            .click(this.allowTrelloLogin)
            .windowHandles().then(windowHandles => {
                return browser.window(windowHandles.value[0]);
            })
            .waitForVisible(this.trelloBoardItem + '=Welcome Board', waitForTimeout).then(() => {
                console.log('Boards list is opened');
                done();
            });
    }
}

module.exports = new LoginPage();

"use strict";

let waitForTimeout = 15000;
let assert = require('assert');

function TrelloPage () {
    this.trelloBoardItem = '.trello-plugin-board-list-item';
    this.trelloCardList = '.trello-plugin-list-title';
    this.trelloCardItem = '.trello-plugin-card-item';
    this.trelloBoardsButton = 'button.trello-plugin-button=Boards';
    this.trelloSignOutButton = 'button.trello-plugin-button=Sign Out';
    this.trelloSignInButton = 'button.trello-plugin-button=Sign In';
    this.trelloAddCardButton = '.trello-plugin-list-add-card';
    this.trelloTextArea = 'textarea.trello-plugin-textarea';
    this.trelloCreateCardOkButton = 'button.trello-plugin-button=OK';
    this.trelloCreateCardBackButton = 'button.trello-plugin-button=Back';
    this.trelloCreateCardDeleteButton = 'button.trello-plugin-button=Delete';
    this.assetsPane = '.tab_icon_by_view_type-av-asset-list';
    this.launchPane = '.tab_icon_by_view_type-av-locations';
    this.progressPane = '.av-background-processes';
    this.cDiskAsset = 'span=C:';
    this.dDiskAsset = 'span=D:';
    this.bootmngFile = 'span=bootmgr';
    this.trelloAllowButton = 'input[value="Allow"]';
    this.attachmentCounter = 'span=Attachments: 1';
    this.trelloTestCard = 'span=edited test card';
    this.attachmentlink = 'a*=file-system:file-system-local:file:C%5C:%5C%5Cbootmgr';

    this.openBoard = (boardName, done) => {
        return browser
            .click(this.trelloBoardItem + '=' + boardName)
            .waitForVisible(this.trelloCardList, waitForTimeout)
            .then(() => {
                console.log('Card list is visible');
            })
            .waitForVisible(this.trelloCardItem, waitForTimeout)
            .then(() => {
                console.log('Card items is visible');
            })
            .then(() => {
                console.log('Board with name ' + boardName + ' was opened');
                if(done) {
                    done();
                }
            });
    };
    this.openBoardList = (done) => {
        return browser
            .click(this.trelloBoardsButton)
            .waitForVisible(this.trelloBoardItem + '=Welcome Board')
            .then(() => {
                console.log('Board list is visible');
                if(done) {
                    done();
                }
            })

    };
    this.addCard = (cardName, done) => {
        return browser
            .click(this.trelloAddCardButton)
            .waitForVisible(this.trelloTextArea, waitForTimeout)
            .clearElement(this.trelloTextArea)
            .setValue(this.trelloTextArea, cardName)
            .click(this.trelloCreateCardOkButton)
            .waitForVisible(this.trelloCardItem + '=' + cardName, waitForTimeout)
            .then(() => {
                console.log('Card was created');
                if(done) {
                    done();
                }}
            )
    };
    this.editCard = (cardName, newCardName, done) => {
        return browser
            .click(this.trelloCardItem + '=' + cardName)
            .waitForVisible(this.trelloTextArea, waitForTimeout)
            .clearElement(this.trelloTextArea)
            .setValue(this.trelloTextArea, newCardName)
            .click(this.trelloCreateCardOkButton)
            .waitForVisible(this.trelloCardItem + '=' + newCardName, waitForTimeout)
            .then(() => {
                console.log('Card was edited');
                if(done) {
                    done();
                }
            });
    };
    this.openCard = (cardName, done) => {
        return browser
            .click(this.trelloCardItem + '=' + cardName)
            .waitForVisible(this.trelloTextArea, waitForTimeout)
            .then(() => {
                console.log('Card was opened');
                if(done) {
                    done();
                }
            })
    };
    this.closeCard = (done) => {
        return browser
            .click(this.trelloCreateCardBackButton)
            .waitForVisible(this.trelloCardList, waitForTimeout)
            .then(() => {
                console.log('Card list is visible');
            })
            .waitForVisible(this.trelloCardItem, waitForTimeout)
            .then(() => {
                console.log('Card items is visible');
            })
            .then(() => {
                console.log('Card details were closed');
                if(done) {
                    done();
                }
            });
    };
    this.deleteCard = (cardName, done) => {
        return browser
            .click(this.trelloCardItem + '=' + cardName)
            .waitForVisible(this.trelloTextArea, waitForTimeout)
            .click(this.trelloCreateCardDeleteButton)
            .waitForVisible(this.trelloCardList, waitForTimeout)
            .elements(this.attachmentCounter).then(res => {
                assert.equal(res.value.length, 0);
                console.log('Card was deleted succesfully');
                if(done) {
                    done();
                }
            });
    };
    this.openAssetAndTrelloPane = (done) => {
        return browser
            .doubleClick(this.cDiskAsset)
            .waitForVisible(this.bootmngFile, waitForTimeout)
            .element(this.assetsPane)
            .then(source => {
                return browser
                    .element(this.launchPane)
                    .then(target => {
                        return browser
                            .moveTo(source.value.ELEMENT)
                            .buttonDown('0')
                            .moveTo(target.value.ELEMENT, 150, 150)
                            .moveTo(target.value.ELEMENT, 145, 145)
                            .buttonUp('0');
                    })

            })
            .then(() => {
                console.log('Assets and Trello panes were opened');
                if(done) {
                    done();
                }
            });
    };
    this.dragNDropLink = (done) => {
        return browser
            .scroll(this.bootmngFile)
            .dragAndDrop(this.bootmngFile, this.trelloTestCard)
            .waitForVisible(this.attachmentCounter, 60000)
            .then(() => {
                console.log('Asset dnd to Trello card is succesfull');
                if(done) {
                    done();
                }
            })
    };
    this.openLink = (done) => {
        return browser
            .doubleClick(this.dDiskAsset)
            .waitForVisible(this.trelloTestCard, waitForTimeout)
            .click(this.trelloTestCard)
            .waitForVisible(this.attachmentlink, waitForTimeout)
            .click(this.attachmentlink)
            .waitForVisible(this.bootmngFile, waitForTimeout)
            .click(this.trelloCreateCardBackButton)
            .waitForVisible(this.trelloTestCard, waitForTimeout)
            .then(() => {
                console.log('trello card link is clickable and open appropriate asset');
                if(done) {
                    done();
                }
            })

    };
    this.signOut = (done) => {
        return browser
            .click(this.trelloBoardsButton)
            .waitForVisible(this.trelloSignOutButton, waitForTimeout)
            .click(this.trelloSignOutButton)
            .waitForVisible(this.trelloSignInButton, waitForTimeout)
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
            .waitForVisible(this.trelloAllowButton, waitForTimeout).then(() => {
                console.log('Trello sign in works correct');
                done();
            })

    };
}

module.exports = new TrelloPage();

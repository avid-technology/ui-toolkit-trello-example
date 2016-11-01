/*
 * Copyright 2016 by Avid Technology, Inc.
 */

import TrelloBrowser from 'trello-browser';
import EventEmitter from 'events';
import {TrelloViewMode} from './../enums.js';
import avidCommonObject from 'avid-mcux-common-object';
import avidActiveAsset from 'avid-mcux-active-asset';
import {getCurrentUrlPrefix, getCommonObjectGlobalId} from '../helpers/links.js';

const tokenLocalStorageKey = 'mcux-trello-plugin-token';
const trelloApiKey = '77a93779586328dcb93729d4751d89e9';

class TrelloModel extends EventEmitter {

    constructor(apiKey) {
        super();

        this.trello = new TrelloBrowser(apiKey);

        this.state = {
            mode: TrelloViewMode.SIGN_IN,
        };

        let token = localStorage.getItem(tokenLocalStorageKey);

        if (token) {
            this.trello.setToken(token);
            this.init();
        }
    }

    emitStateChange() {
        this.emit('stateChange', this.state);
        console.log('stateChange emitted', this.state);
    }

    init() {
        this.getBoards()
            .then(localStorage.setItem.bind(localStorage, tokenLocalStorageKey, this.trello.token));
    }

    signIn() {
        this.auth().then(this.init.bind(this));
    }

    auth() {
        return this.trello.auth({
            type: 'popup',
            name: 'Trello Example Plugin',
            scope: {
                read: true,
                write: true,
            },
            expiration: 'never',
        });
    }

    signOut() {
        this.trello.setToken('');
        localStorage.removeItem(tokenLocalStorageKey);
        this.state.mode = TrelloViewMode.SIGN_IN;
        this.emitStateChange();
    }

    getBoards() {
        return this.trello.get('/1/members/me/boards').then(this.renderBoards.bind(this));
    }

    renderBoards(boards) {
        this.state.boards = boards;
        this.state.mode = TrelloViewMode.BOARDS;
        this.emitStateChange();
    }

    getLists(boardId) {
        this.trello.get('/1/boards/' + boardId + '/lists?cards=open&card_fields=name,badges')
            .then(this.renderBoardLists.bind(this, boardId));
    }

    renderBoardLists(boardId, lists) {
        this.state.lists = lists;
        this.state.currentBoardId = boardId;
        this.state.mode = TrelloViewMode.LISTS;
        this.emitStateChange();
    }

    showCurrentBoard() {
        this.getLists(this.state.currentBoardId);
    }

    addCard(listId) {
        this.trello.post('/1/cards', {
            due: 'null',
            idList: listId,
            name: 'New card',
            urlSource: 'null',
        }).then(this.renderCard.bind(this));
    }

    getCard(cardId) {
        this.trello.get('/1/cards/' + cardId + '?attachments=true').then(this.renderCard.bind(this));
    }

    renderCard(card) {
        this.state.currentCard = card;
        this.state.mode = TrelloViewMode.CARD;
        this.emitStateChange();
    }

    editCardName(cardId, newName) {
        if (newName === '') {
            // Trello cards can't have an empty name, so probably the user just wants to delete it.
            this.deleteCard(cardId);
        } else {
            this.trello.put('/1/cards/' + cardId, {name: newName}).then(this.showCurrentBoard.bind(this));
        }
    }

    deleteCard(cardId) {
        this.trello.del('/1/cards/' + cardId).then(this.showCurrentBoard.bind(this));
    }

    onDrop(boardId, cardId, deepLink) {
        this.trello.post('/1/cards/' + cardId + '/attachments', {url: deepLink})
            .then(this.getLists.bind(this, boardId))
            .catch(console.log.bind(console));
    }

    setActiveCommonObject(event) {
        let attachmentLink = event.target.href;
        if (attachmentLink.match(getCurrentUrlPrefix())) {
            event.preventDefault();
            avidCommonObject.resolve(getCommonObjectGlobalId(attachmentLink)).then(commonObject => {
                avidActiveAsset.set({
                    commonObject,
                    locator: '',
                });
            }).catch(err => {
                console.error(err);
            });
        } else {
            event.target.target = '_blank';
        }
    }

}

export default new TrelloModel(trelloApiKey);

/*
 * Copyright 2016 by Avid Technology, Inc.
 */

import TrelloModel from '../model/TrelloModel.js';
import {createActions} from '../helpers/action.js';

const TrelloActions = createActions({

    signIn() {
        TrelloModel.signIn();
    },

    signOut() {
        TrelloModel.signOut();
    },

    showBoardsList() {
        TrelloModel.getBoards();
    },

    getLists(boardId) {
        TrelloModel.getLists(boardId);
    },

    showCurrentBoard() {
        TrelloModel.showCurrentBoard();
    },

    addCard(listId) {
        TrelloModel.addCard(listId);
    },

    showCard(cardId) {
        TrelloModel.getCard(cardId);
    },

    onDrop(boardId, listId, deepLink) {
        TrelloModel.onDrop(boardId, listId, deepLink);
    },

    editCardName(...args) {
        TrelloModel.editCardName(...args);
    },

    deleteCard(cardId) {
        TrelloModel.deleteCard(cardId);
    },

    setActiveCommonObject(event) {
        TrelloModel.setActiveCommonObject(event);
    },

});

export default TrelloActions;

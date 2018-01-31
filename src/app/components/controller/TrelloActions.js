/*
 * Copyright 2017 by Avid Technology, Inc.
 */

import TrelloModel from '../../configuration/model/TrelloModel.js';
import {createActions} from '../../configuration/helpers/action.js';

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

    onDrop(boardId, cardId, listId) {
        TrelloModel.onDrop(boardId, cardId, listId);
    },

    editCardName(...args) {
        TrelloModel.editCardName(...args);
    },

    deleteCard(cardId) {
        TrelloModel.deleteCard(cardId);
    },

});

export default TrelloActions;

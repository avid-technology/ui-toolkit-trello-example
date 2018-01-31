/*
 * Copyright 2017 by Avid Technology, Inc.
 */

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import TrelloActions from '../controller/TrelloActions.js';

import * as style from './BoardView.scss';

const BoardListItem = createReactClass({

    propTypes: {
        boardId: PropTypes.string,
        boardName: PropTypes.string,
    },

    handleClick() {
        TrelloActions.getLists(this.props.boardId);
    },

    render() {
        return (
            <div className={style['trello-plugin-board-list-item']} onClick={this.handleClick}>{this.props.boardName}</div>
        );
    },

});

export default BoardListItem;

/*
 * Copyright 2016 by Avid Technology, Inc.
 */

import React from 'react';
import TrelloActions from '../../controller/TrelloActions.js';

const BoardListItem = React.createClass({

    propTypes: {
        boardId: React.PropTypes.string,
        boardName: React.PropTypes.string,
    },

    handleClick() {
        TrelloActions.getLists(this.props.boardId);
    },

    render() {
        return (
            <div className="trello-plugin-board-list-item" onClick={this.handleClick}>{this.props.boardName}</div>
        );
    },

});

export default BoardListItem;

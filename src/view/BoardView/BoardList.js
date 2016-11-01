/*
 * Copyright 2016 by Avid Technology, Inc.
 */

import React from 'react';
import BoardListItem from './BoardListItem.js';
import ToolbarLayout from '../ToolbarLayout.js';
import TrelloActions from '../../controller/TrelloActions.js';

const BoardList = React.createClass({

    propTypes: {
        boards: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    },

    render() {
        let page;

        if (this.props.boards.length > 0) {
            page = (
                <div className="trello-plugin-board-list">
                    {this.props.boards.map((board) => {
                        return <BoardListItem key={board.id} boardId={board.id} boardName={board.name}/>;
                    })}
                </div>
            );
        } else {
            page = (
                <div className="trello-plugin-zero-items">
                    there are no boards in this account
                </div>
            );
        }

        return (
            <ToolbarLayout page={page}>
                <button className="trello-plugin-button" onClick={TrelloActions.signOut}>Sign Out</button>
            </ToolbarLayout>
        );
    },

});

export default BoardList;

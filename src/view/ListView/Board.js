/*
 * Copyright 2016 by Avid Technology, Inc.
 */

import React from 'react';
import List from './List.js';
import ToolbarLayout from '../ToolbarLayout.js';
import TrelloActions from '../../controller/TrelloActions.js';

const Board = React.createClass({

    propTypes: {
        lists: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    },

    render() {
        let page;

        if (this.props.lists.length > 0) {
            page = (
                <div className="trello-plugin-board">
                    <div className="trello-plugin-board-abs">
                        {this.props.lists.map((list) => {
                            return <List list={list} key={list.id} />;
                        })}
                    </div>
                </div>
            );
        } else {
            page = (
                <div className="trello-plugin-zero-items">
                    this board is empty
                </div>
            );
        }

        return (
            <ToolbarLayout page={page}>
                <button className="trello-plugin-button" onClick={TrelloActions.showBoardsList}>Boards</button>
                <button className="trello-plugin-button" onClick={TrelloActions.showCurrentBoard}>Refresh</button>
            </ToolbarLayout>
        );
    },

});

export default Board;

/*
 * Copyright 2017 by Avid Technology, Inc.
 */

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import List from './List.js';
import ViewContainer from '../../containers/ViewContainer';
import TrelloActions from '../controller/TrelloActions.js';

import * as commonStyles from '../common.scss';

const Board = createReactClass({

    propTypes: {
        lists: PropTypes.arrayOf(PropTypes.object).isRequired,
    },

    render() {
        let page;

        if (this.props.lists.length > 0) {
            page = (
                <div className={commonStyles['trello-plugin-board']}>
                    <div className={commonStyles['trello-plugin-board-abs']}>
                        {this.props.lists.map((list) => {
                            return <List list={list} key={list.id} />;
                        })}
                    </div>
                </div>
            );
        } else {
            page = (
                <div className={commonStyles['trello-plugin-zero-items']}>
                    this board is empty
                </div>
            );
        }

        return (
            <ViewContainer page={page}>
                <button className={commonStyles['trello-plugin-button']} onClick={TrelloActions.showBoardsList}>Boards</button>
                <button className={commonStyles['trello-plugin-button']} onClick={TrelloActions.showCurrentBoard}>Refresh</button>
            </ViewContainer>
        );
    },

});

export default Board;

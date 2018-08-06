/*
 * Copyright 2017 by Avid Technology, Inc.
 */

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import BoardListItem from './BoardListItem.js';
import ViewContainer from '../../containers/ViewContainer.js';
import TrelloActions from '../controller/TrelloActions.js';

import * as commonStyles from '../common.scss';
import * as styles from './BoardView.scss';

const BoardList = createReactClass({

    propTypes: {
        boards: PropTypes.arrayOf(PropTypes.object).isRequired,
    },

    render() {
        let page;

        if (this.props.boards.length > 0) {
            page = (
                <div className={styles['trello-plugin-board-list']}>
                    {this.props.boards.map((board) => {
                        return <BoardListItem key={board.id} boardId={board.id} boardName={board.name}/>;
                    })}
                </div>
            );
        } else {
            page = (
                <div className={commonStyles['trello-plugin-zero-items']}>
                    there are no boards in this account
                </div>
            );
        }

        return (
            <ViewContainer page={page}>
                <button className="cux-btn" onClick={TrelloActions.signOut}>Sign Out</button>
            </ViewContainer>
        );
    },

});

export default BoardList;

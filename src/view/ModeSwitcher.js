/*
 * Copyright 2016 by Avid Technology, Inc.
 */

import React from 'react';
import {TrelloViewMode} from './../enums.js';
import {objectValues} from '../helpers/enum.js';
import BoardList from './BoardView/BoardList.js';
import Board from './ListView/Board.js';
import Card from './CardView/Card.js';
import SignIn from './SignIn.js';

const ModeSwitcher = React.createClass({

    propTypes: {
        mode: React.PropTypes.oneOf(objectValues(TrelloViewMode)).isRequired,
        boards: React.PropTypes.arrayOf(React.PropTypes.object),
        lists: React.PropTypes.arrayOf(React.PropTypes.object),
        card: React.PropTypes.object,
    },

    render() {
        let page;

        if (this.props.mode == TrelloViewMode.BOARDS) {
            page = <BoardList boards={this.props.boards} />;
        } else if (this.props.mode == TrelloViewMode.LISTS) {
            page = <Board lists={this.props.lists} />;
        } else if (this.props.mode == TrelloViewMode.CARD) {
            page = <Card card={this.props.card} />;
        } else {
            page = <SignIn />;
        }

        return page;
    },

});

export default ModeSwitcher;

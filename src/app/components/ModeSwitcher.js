/*
 * Copyright 2017 by Avid Technology, Inc.
 */

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import {TrelloViewMode} from '../configuration/enums.js';
import {objectValues} from '../configuration/helpers/enum.js';
import BoardList from './BoardView/BoardList.js';
import Board from './ListView/Board.js';
import Card from './CardView/Card.js';
import SignIn from './SIgnInView/SignIn.js';

const ModeSwitcher = createReactClass({

    propTypes: {
        mode: PropTypes.oneOf(objectValues(TrelloViewMode)).isRequired,
        boards: PropTypes.arrayOf(PropTypes.object),
        lists: PropTypes.arrayOf(PropTypes.object),
        card: PropTypes.object,
    },

    render() {
        let page;

        if (this.props.mode === TrelloViewMode.BOARDS) {
            page = <BoardList boards={this.props.boards} />;
        } else if (this.props.mode === TrelloViewMode.LISTS) {
            page = <Board lists={this.props.lists} />;
        } else if (this.props.mode === TrelloViewMode.CARD) {
            page = <Card card={this.props.card} />;
        } else {
            page = <SignIn />;
        }

        return page;
    },

});

export default ModeSwitcher;

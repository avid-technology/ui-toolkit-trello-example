/*
 * Copyright 2016 by Avid Technology, Inc.
 */

import React from 'react';
import TrelloModel from '../model/TrelloModel.js';
import ModeSwitcher from './ModeSwitcher.js';

const TrelloPane = React.createClass({

    getInitialState() {
        return TrelloModel.state;
    },

    componentDidMount() {
        this.unsubscribe = TrelloModel.on('stateChange', this.setState.bind(this));
    },

    componentWillUnmount() {
        this.unsubscribe();
    },

    render() {
        return (
            <ModeSwitcher
                mode={this.state.mode}
                boards={this.state.boards}
                lists={this.state.lists}
                card={this.state.currentCard}
            />
        );
    },

});

export default TrelloPane;

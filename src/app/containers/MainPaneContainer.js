/**
 * Copyright 2017 by Avid Technology, Inc.
 */

import React from 'react';
import TrelloModel from '../configuration/model/TrelloModel.js';
import ModeSwitcher from '../components/ModeSwitcher.js';

class PaneContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = TrelloModel.state;
    }

    componentDidMount() {
        this.unsubscribe = TrelloModel.on('stateChange', this.setState.bind(this));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <ModeSwitcher
                mode={this.state.mode}
                boards={this.state.boards}
                lists={this.state.lists}
                card={this.state.currentCard}
            />
        );
    }
}

PaneContainer.propTypes = {};

export default PaneContainer;

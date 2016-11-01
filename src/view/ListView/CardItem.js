/*
 * Copyright 2016 by Avid Technology, Inc.
 */

import React from 'react';
import ReactDom from 'react-dom';
import TrelloActions from '../../controller/TrelloActions.js';
import {getDropZone} from '../../helpers/drop.js';

const CardItem = React.createClass({

    propTypes: {
        card: React.PropTypes.object.isRequired,
        boardId: React.PropTypes.string.isRequired,

    },

    handleClick() {
        TrelloActions.showCard(this.props.card.id);
    },

    componentDidMount() {
        this.dropZone = getDropZone(ReactDom.findDOMNode(this));

        this.dropZone.evs.drop.on((event) => {
            let deepLink = this.getDeepLink(event);
            TrelloActions.onDrop(this.props.boardId, this.props.card.id, deepLink);
        });
    },

    componentWillUnmount() {
        this.dropZone.destroy();
    },

    getDeepLink(event) {
        return event.commonObjects[0].deepLink();
    },

    render() {
        return (
            <div className="trello-plugin-card-item" onClick={this.handleClick}>
                <div className="trello-plugin-card-drop-target">
                    <span className="trello-plugin-card-item-text">{this.props.card.name}</span>
                    {this.props.card.badges.attachments > 0 ? <span className="trello-plugin-attachments-count">
                        {'Attachments: ' + this.props.card.badges.attachments}
                    </span> : ''}
                </div>
            </div>
        );
    },

});

export default CardItem;

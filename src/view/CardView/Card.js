/*
 * Copyright 2016 by Avid Technology, Inc.
 */

import React from 'react';
import TrelloActions from '../../controller/TrelloActions.js';
import ToolbarLayout from '../ToolbarLayout.js';
import Attachments from './Attachments.js';

const Card = React.createClass({

    propTypes: {
        card: React.PropTypes.object.isRequired,
    },

    getInitialState() {
        return {cardName: this.props.card.name};
    },

    handleChange(event) {
        this.setState({cardName: event.target.value});
    },

    handleEditClick() {
        TrelloActions.editCardName(this.props.card.id, this.state.cardName);
    },

    handleDeleteClick() {
        TrelloActions.deleteCard(this.props.card.id);
    },

    render() {
        let page = (
            <div>
                <div className="trello-plugin-text-label-bold">
                    Edit Card
                </div>
                <div>
                    <textarea className="trello-plugin-textarea" value={this.state.cardName} onChange={this.handleChange} />
                </div>
                <div className="trello-plugin-card-open-actions">
                    <button className="trello-plugin-button" onClick={this.handleEditClick} >
                        OK
                    </button>
                    <button className="trello-plugin-button" onClick={this.handleDeleteClick} >
                        Delete
                    </button>
                </div>
                { (this.props.card.badges.attachments > 0) ? <Attachments items={this.props.card.attachments} /> : null }
            </div>
        );

        return (
            <ToolbarLayout page={page}>
                <button className="trello-plugin-button" onClick={TrelloActions.showCurrentBoard}>Back</button>
            </ToolbarLayout>
        );
    },

});

export default Card;

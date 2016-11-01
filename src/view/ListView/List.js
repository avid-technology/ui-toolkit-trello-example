/*
 * Copyright 2016 by Avid Technology, Inc.
 */

import React from 'react';
import CardItem from './CardItem.js';
import TrelloActions from '../../controller/TrelloActions.js';

const List = React.createClass({

    propTypes: {
        list: React.PropTypes.object.isRequired,
    },

    handleAddCard() {
        TrelloActions.addCard(this.props.list.id);
    },

    getCards() {
        return this.props.list.cards.map((card) => {
            return <CardItem key={card.id} card={card} boardId={this.props.list.idBoard} />;
        });
    },

    render() {
        return (
            <div className="trello-plugin-list-wrapper">
                <div className="trello-plugin-list-item">
                    <div className="trello-plugin-list-title">
                        {this.props.list.name}
                    </div>
                    <div className="trello-plugin-card-list trello-plugin-scroll-bar">
                        {this.getCards()}
                    </div>
                    <div className="trello-plugin-list-add-card" onClick={this.handleAddCard}>Add a card...</div>
                </div>
            </div>
        );
    },

});

export default List;

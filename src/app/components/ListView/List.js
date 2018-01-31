/*
 * Copyright 2017 by Avid Technology, Inc.
 */

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import CardItem from './CardItem.js';
import TrelloActions from '../controller/TrelloActions.js';

import * as styles from './ListView.scss';

const List = createReactClass({

    propTypes: {
        list: PropTypes.object.isRequired,
    },

    handleAddCard() {
        TrelloActions.addCard(this.props.list.id);
    },

    getCards() {
        return this.props.list.cards.map((card) => {
            return <CardItem key={card.id} card={card} boardId={this.props.list.idBoard} />;
        });
    },

    dropCard(cardId) {
        TrelloActions.onDrop(this.props.list.idBoard, cardId, this.props.list.id);
    },

    render() {
        return (
            <div className={styles['trello-plugin-list-wrapper']}>
                <div className={styles['trello-plugin-list-item']}>
                    <div className={styles['trello-plugin-list-title']}>
                        {this.props.list.name}
                    </div>
                    <div className={`${styles['trello-plugin-card-list']} ${styles['trello-plugin-scroll-bar']}`}
                         onDragOver={(event => event.preventDefault())}
                         onDrop={(event) => {event.preventDefault(); this.dropCard(event.dataTransfer.getData('cardId'))}}
                    >
                        {this.getCards()}
                    </div>
                    <div className={styles['trello-plugin-list-add-card']} onClick={this.handleAddCard}>Add a card...</div>
                </div>
            </div>
        );
    },

});

export default List;

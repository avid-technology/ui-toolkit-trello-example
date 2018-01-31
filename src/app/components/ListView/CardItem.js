/*
 * Copyright 2017 by Avid Technology, Inc.
 */

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import TrelloActions from '../controller/TrelloActions.js';

import * as styles from './ListView.scss';
import * as cardViewStyles from '../CardView/CardView.scss';

const CardItem = createReactClass({

    propTypes: {
        card: PropTypes.object.isRequired,
        boardId: PropTypes.string.isRequired,

    },

    handleClick() {
        TrelloActions.showCard(this.props.card.id);
    },

    render() {
        return (
            <div draggable className={styles['trello-plugin-card-item']} onClick={this.handleClick}
                 onDragStart={(event) => event.dataTransfer.setData('cardId', this.props.card.id)}
            >
                <div className="trello-plugin-card-drop-target">
                    <span className={styles['trello-plugin-card-item-text']}>{this.props.card.name}</span>
                    {this.props.card.badges.attachments > 0 ?
                        <span className={cardViewStyles['trello-plugin-attachments-count']}>
                            {'Attachments: ' + this.props.card.badges.attachments}
                        </span>
                        :
                        ''
                    }
                </div>
            </div>
        );
    },

});

export default CardItem;

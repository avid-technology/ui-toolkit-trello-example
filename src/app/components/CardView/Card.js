/*
 * Copyright 2017 by Avid Technology, Inc.
 */

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import TrelloActions from '../controller/TrelloActions.js';
import ViewContainer from '../../containers/ViewContainer';
import Attachments from './Attachments.js';

import * as commonStyles from '../common.scss';
import * as styles from './CardView.scss';

const Card = createReactClass({

    propTypes: {
        card: PropTypes.object.isRequired,
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
            <div className={styles['trello-plugin-card-container']}>
                <div className={styles['trello-plugin-text-label-bold']}>
                    Edit Card
                </div>
                <div>
                    <textarea className={styles['trello-plugin-textarea']} value={this.state.cardName} onChange={this.handleChange} />
                </div>
                <div className={styles['trello-plugin-card-open-actions']}>
                    <button className={commonStyles['trello-plugin-button']} onClick={this.handleEditClick} >
                        OK
                    </button>
                    <button className={commonStyles['trello-plugin-button']} onClick={this.handleDeleteClick} >
                        Delete
                    </button>
                </div>
                {(this.props.card.badges.attachments > 0) ?
                    <Attachments items={this.props.card.attachments} />
                    :
                    null
                }
            </div>
        );

        return (
            <ViewContainer page={page}>
                <button className={commonStyles['trello-plugin-button']} onClick={TrelloActions.showCurrentBoard}>Back</button>
            </ViewContainer>
        );
    },

});

export default Card;

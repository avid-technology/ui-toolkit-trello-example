/*
 * Copyright 2017 by Avid Technology, Inc.
 */

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

import * as styles from './CardView.scss';

const Attachments = createReactClass({

    propTypes: {
        items: PropTypes.arrayOf(PropTypes.object).isRequired,
    },

    getAttachments() {
        return this.props.items.map((item)=>{
            return (
                <div key={item.id} className={styles['trello-plugin-card-view-attachments-item']}>
                    <a href={item.url} onClick={(event => { event.target.target = '_blank' })} className={styles['trello-plugin-attachments-link']}>{item.url}</a>
                </div>
            );
        });
    },

    render() {
        return (
            <div className={styles['trello-plugin-card-view-attachments-container']}>
                <div className={styles['trello-plugin-text-label-bold']}>Attachments:</div>
                {this.getAttachments()}
            </div>
        );
    },
});

export default Attachments;

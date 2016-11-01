/*
 * Copyright 2016 by Avid Technology, Inc.
 */

import React from 'react';
import TrelloActions from '../../controller/TrelloActions.js';

const Attachments = React.createClass({

    propTypes: {
        items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    },

    getAttachments() {
        return this.props.items.map((item)=>{
            return <div key={item.id} className="trello-plugin-card-view-attachments-item">
                <a href={item.url} onClick={TrelloActions.setActiveCommonObject} className="trello-plugin-attachments-link">{item.url}</a>
            </div>;
        })
    },

    render() {
        return <div className="trello-plugin-card-view-attachments-container">
            <div className="trello-plugin-text-label-bold">Attachments:</div>
            {this.getAttachments()}
        </div>
    },

});

export default Attachments;

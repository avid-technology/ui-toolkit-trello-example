/*
 * Copyright 2016 by Avid Technology, Inc.
 */

import React from 'react';

const ToolbarLayout = React.createClass({

    propTypes: {
        page: React.PropTypes.element,
    },

    render() {
        return (
            <div className="trello-plugin-container">
                <div className="trello-plugin-toolbar">
                    {this.props.children}
                </div>
                <div className="trello-plugin-page">
                    {this.props.page}
                </div>
            </div>
        );
    },

});

export default ToolbarLayout;

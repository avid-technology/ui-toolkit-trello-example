/**
 * Copyright 2017 by Avid Technology, Inc.
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as styles from './ViewContainer.scss';

class ViewContainer extends React.Component {
    render() {
        return (
            <div className={styles['trello-plugin-container']}>
                <div className={styles['trello-plugin-toolbar']}>
                    {this.props.children}
                </div>
                <div className={this.props.signIn ? styles['trello-signin-page'] : styles['trello-plugin-page']}>
                    {this.props.page}
                </div>
            </div>
        );
    }
}

ViewContainer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.element
        ),
        PropTypes.element,
    ]).isRequired,
    page: PropTypes.element,
    signIn: PropTypes.bool,
};

export default ViewContainer;

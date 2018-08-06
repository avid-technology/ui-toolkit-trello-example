/*
 * Copyright 2017 by Avid Technology, Inc.
 */

import React from 'react';
import createReactClass from 'create-react-class';
import ViewContainer from '../../containers/ViewContainer';
import TrelloActions from '../controller/TrelloActions.js';

import * as commonStyles from '../common.scss';

const SignIn = createReactClass({

    render() {
        const page = (
            <div className={commonStyles['trello-welcome-logo']}/>
        );

        return (
            <ViewContainer signIn={true} page={page}>
                <button className="cux-btn" onClick={TrelloActions.signIn}>Sign In</button>
            </ViewContainer>
        );
    },

});

export default SignIn;

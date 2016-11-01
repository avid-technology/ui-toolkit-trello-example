/*
 * Copyright 2016 by Avid Technology, Inc.
 */

import React from 'react';
import ToolbarLayout from './ToolbarLayout.js';
import TrelloActions from '../controller/TrelloActions.js';

const SignIn = React.createClass({

    render() {
        return (
            <ToolbarLayout>
                <button className="trello-plugin-button" onClick={TrelloActions.signIn}>Sign In</button>
            </ToolbarLayout>
        );
    },

});

export default SignIn;

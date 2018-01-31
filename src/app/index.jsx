/**
 * Copyright 2017 by Avid Technology, Inc.
 */

import ReactDOM from 'react-dom';
import React from 'react';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from './redux/reducers/index';
import rootSaga from './redux/saga/index';
import PaneContainer from './containers/MainPaneContainer';

// export const API_URL='http://localhost:8000/api/';

export default class ApplicationContainer {
    constructor() {
        const sagaMiddleware = createSagaMiddleware();
        const middlewares = [sagaMiddleware];

        this.store = createStore(
            rootReducer,
            composeWithDevTools(
                applyMiddleware(...middlewares)
            )
        );

        sagaMiddleware.run(rootSaga);
    }

    render(element) {
        ReactDOM.render(
            <Provider store={this.store}>
                <PaneContainer/>
            </Provider>,
            element
        );
    }
}

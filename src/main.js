/*
 * Copyright 2016 by Avid Technology, Inc.
 */

import React from 'react';
import ReactDom from 'react-dom';
import View from 'avid-mcux-view';
import TrelloPane from './view/TrelloPane.js';

export const TrelloPluginPane = {

    config: {
        'menuName': 'Trello Plugin',
        'singleton': true,
    },

    factory() {
        return View.create({

            createElement() {
                return new Promise((resolve, reject) => {
                    this._domElement = document.createElement('div');
                    this._domElement.style.height = '100%';
                    this._domElement.style.display = 'flex';
                    resolve(this._domElement);
                });
            },

            onRender() {
                ReactDom.render(<TrelloPane />, this._domElement);
            },

        });
    },

};

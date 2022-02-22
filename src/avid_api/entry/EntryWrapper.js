/**
 * Copyright 2017-2019 by Avid Technology, Inc.
 */
/* eslint-disable */
import appConfig from '../../package.json';

const viewName = `${appConfig.identity.appName}-view`;

export default class EntryApp {
    getLayoutConfig() {
        return {
            type: viewName,
            state: this.state,
        };
    }

    onInit({ dispatch }) {
        this.dispatch = dispatch;
        EntryApp.dispatch = dispatch;
    }

    onRender(headerContentEl, views) {
        this.innerView = Object.assign({}, views[viewName]);

        this.headerContentEl = headerContentEl;
    }

    onShow() {
        console.log('[ExamplePlugin] onShow');
    }

    onClose() {
        console.log('[ExamplePlugin] onClose');
        return Promise.resolve();
    }

    onHide() {
        console.log('[ExamplePlugin] onHide');
    }

    onUnrender() {
        console.log('[ExamplePlugin] onUnrender');
    }

    onBeforeUnrender() {
        console.log('[ExamplePlugin] onBeforeUnrender');
    }

    onDestroy() {
        console.log('[ExamplePlugin] onDestroy');
    }

    setContext(context) {
        console.log('[ExamplePlugin] context', context);
    }

    getTitle() {
        return this.innerView.getTitle();
    }

    get publicScope() {
        return {};
    }
}

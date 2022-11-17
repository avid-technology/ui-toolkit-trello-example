/**
 * Copyright 2022 by Avid Technology, Inc.
 */

import ReactDOM from 'react-dom';

import ApplicationContainer from '../../app/index';

// Need to be bcs it is used in main App :
export default class ViewWrapper {
    onInit(config, { dispatch }) {
        this.trigger = dispatch;
        this.state = config.state;
    }

    onRender({ domElement }) {
        this.el = document.createElement('div');
        this.el.style.height = '100%';
        this.el.style.display = 'flex';
        this.pane = new ApplicationContainer();
        this.pane.render(this.el);
        domElement.appendChild(this.el);
    }

    onDestroy() {
        ReactDOM.unmountComponentAtNode(this.el);
    }

    getState() {
        return this.pane.store.getState();
    }

    getTitle() {
        return this.pane && this.pane.getTitle();
    }

    onRevalidate(data) {}

    onFocusLost() {}

    onFocusGained(event) {}

    enqueueLoading(promise) {}

    name(newName) {return '';}

    isShown() {return true;}

    isVisible() {return true;}

    closeAllowed() {return true;}

    destroy() {}

    getMinHeight() {return 50;}

    getMinWidth() {return 50;}

    get publicScope() {
        return {
            getState: this.getState.bind(this),
            getTitle: this.getTitle.bind(this),
        };
    }
}

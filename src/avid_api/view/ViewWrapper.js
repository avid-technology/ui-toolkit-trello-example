/**
 * Copyright 2017 by Avid Technology, Inc.
 */

import ReactDOM from 'react-dom';

import ApplicationContainer from '../../app/index';

// Need to be bcs it is used in main App :
export default class ViewWrapper {
    createElement() {
        this.el = document.createElement('div');
        this.el.style.height = '100%';
        this.el.style.display = 'flex';
        return Promise.resolve(this.el);
    }

    onInit(config) {
        this.state = config.state;

        this.pane = new ApplicationContainer({
            contextCallback: function (context) {
                this.trigger('contextChange', context);
            }.bind(this),
        });
    }

    onRender() {
        this.pane.render(this.el);
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
        };
    }
}

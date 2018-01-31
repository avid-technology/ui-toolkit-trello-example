/**
 * Copyright 2017 by Avid Technology, Inc.
 */

/**
 * createActions() wraps each controller action in a function that does two things:
 * 1. Executes the action asynchronously to avoid freezing the UI thread.
 * 2. Logs the action name and its arguments.
 */
export function createActions(obj) {
    function action(name, func, ...args) {
        console.log('Controller action: ' + name, args);
        func(...args);
    }

    Object.keys(obj).forEach((prop) => {
        obj[prop] = action.bind(null, prop, obj[prop]);
    });

    return Object.freeze(obj);
}

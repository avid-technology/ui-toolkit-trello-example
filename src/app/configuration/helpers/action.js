/**
 * Copyright 2017 by Avid Technology, Inc.
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

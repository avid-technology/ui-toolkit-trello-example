/**
 * Copyright 2016 by Avid Technology, Inc.
 */

/**
 * A little Symbol polyfill for the Safari browser.
 */
let Sym = (typeof Symbol === 'function') ? Symbol : ((str) => {
    return `Symbol-${Math.random()}-${str}`;
});

/**
 * Replaces all the object's own property values with unique symbols, and freezes the object.
 */
export function createEnum(obj) {
    Object.keys(obj).forEach((prop) => {
        obj[prop] = Sym(prop);
    });

    return Object.freeze(obj);
}

/**
 * Object.values shim.
 */
export function objectValues(obj) {
    return Object.keys(obj).map(key => obj[key]);
}

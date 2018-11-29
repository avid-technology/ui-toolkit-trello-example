/**
 * Copyright 2017 by Avid Technology, Inc.
 */

const Sym = (typeof Symbol === 'function') ? Symbol : ((str) => {
    return `Symbol-${Math.random()}-${str}`;
});

export function createEnum(obj) {
    Object.keys(obj).forEach((prop) => {
        obj[prop] = Sym(prop);
    });

    return Object.freeze(obj);
}

export function objectValues(obj) {
    return Object.keys(obj).map(key => obj[key]);
}

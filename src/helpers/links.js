/*
 * Copyright 2016 by Avid Technology, Inc.
 */

export function getCurrentUrlPrefix() {
    let href = window.location.href;
    let pathName = window.location.pathname;

    return href.substring(0, href.indexOf(pathName));
}

export function getCommonObjectGlobalId(deepLink) {
    return decodeURIComponent(deepLink.substring(deepLink.lastIndexOf('/') + 1));
}

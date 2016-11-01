/*
 * Copyright 2016 by Avid Technology, Inc.
 */

export function getDropZone(context) {
    return window.AV.dnd.createDropZone({
        selector: '.trello-plugin-card-drop-target',
        context,
    });
}

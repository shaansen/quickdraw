import { registerActionAsCommand } from "./runCommand";
import { createElement, deleteElement } from "../elements";

export const Actions = {
    CREATE_ELEMENT: "CREATE_ELEMENT",
    DELETE_ELEMENT: "DELETE_ELEMENT",
    NEW_DRAWING: "NEW_DRAWING",
    DRAG_START: "DRAG_START",
    DRAG_FINISH: "DRAG_FINISH",
    SET_TOOL: "SET_TOOL",
    UNDO: "UNDO",
    REDO: "REDO"
};

let nextElementId = 0;
export const createElementAction = payload => ({
    type: Actions.CREATE_ELEMENT,
    payload: { ...payload, id: nextElementId++ }
});

export const deleteElementAction = payload => ({
    type: Actions.DELETE_ELEMENT,
    payload: { ...payload, id: nextElementId++ }
});

registerActionAsCommand(Actions.CREATE_ELEMENT, (action, elements) => {
    elements[action.payload.id] = createElement(
        action.payload.type,
        action.payload
    );
});

registerActionAsCommand(Actions.DELETE_ELEMENT, (action, elements) => {
    elements[action.payload.id] = deleteElement(
        action.payload.type,
        action.payload
    );
});

export const dragStart = payload => ({
    type: Actions.DRAG_START,
    payload
});

export const dragFinish = () => ({
    type: Actions.DRAG_FINISH
});

export const newDrawing = () => ({
    type: Actions.NEW_DRAWING
});

export const setTool = payload => ({
    type: Actions.SET_TOOL,
    payload
});

export const undo = () => ({
    type: Actions.UNDO
});

export const redo = () => ({
    type: Actions.REDO
});

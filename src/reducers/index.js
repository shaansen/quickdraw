import { combineReducers } from "redux";
import { Actions } from "../actions";
import { Elements } from "../elements";
import { nearOrOnLine, nearOrOnRectangleEdges } from "../elements/geometry";

const deleteEntity = {
    Line: nearOrOnLine,
    Rect: nearOrOnRectangleEdges,
    Delete: null
};

const getDeletedDoList = (x, currentDo) => {
    for (let i = currentDo.length - 1; i >= 0; i--) {
        const actionType = currentDo[i].type;
        const { p1, p2, type } = currentDo[i].payload;
        if (
            actionType == Actions.CREATE_ELEMENT &&
            deleteEntity[type] &&
            deleteEntity[type](x, p1, p2)
        ) {
            return i;
        }
    }
    return -1;
};

const commands = (state = { do: [], redo: [], transient: [] }, action) => {
    let currentDo = [...state.do];
    let currentRedo = [...state.redo];
    let currentTransient = [...state.transient];
    let lastAction = null;
    let mergeState = {};
    switch (action.type) {
        case Actions.CREATE_ELEMENT:
            if (action.payload.isTransient) {
                return { ...state, transient: [action] };
            }
            return {
                ...state,
                do: [...state.do, action],
                redo: [],
                transient: []
            };
        case Actions.DELETE_ELEMENT:
            const index = getDeletedDoList(action.payload.p1, currentDo);
            const updatedPayload = { ...action.payload, indexToDelete: index };
            lastAction = { ...action, payload: updatedPayload };
            if (index != -1) {
                return {
                    ...state,
                    do: [...state.do, lastAction]
                };
            }
            return state;
        case Actions.NEW_DRAWING:
            return { do: [], redo: [], transient: [] };
        case Actions.UNDO:
            if (currentTransient.length > 0) {
                lastAction = currentTransient.pop();
                currentRedo.push(lastAction);
                mergeState = {
                    do: currentDo,
                    redo: currentRedo
                };
            } else if (currentTransient.length == 0 && currentDo.length > 0) {
                lastAction = currentDo.pop();
                mergeState = {
                    do: currentDo,
                    redo: [...currentRedo, lastAction]
                };
            }
            return { ...state, ...mergeState };
        case Actions.REDO:
            if (currentTransient.length == 0 && currentRedo.length > 0) {
                lastAction = currentRedo.pop();
                mergeState = {
                    do: [...currentDo, lastAction],
                    redo: currentRedo
                };
            }
            return { ...state, ...mergeState };
        default:
    }
    return { ...state };
};

const tool = (state = Elements.Line, action) => {
    if (action.type === Actions.SET_TOOL) {
        return action.payload;
    }
    return state;
};

const interaction = (state = {}, action) => {
    if (action.type === Actions.DRAG_START) {
        return { dragFrom: action.payload };
    }
    if (action.type === Actions.DRAG_FINISH) {
        return {};
    }
    return state;
};

export default combineReducers({
    commands,
    tool,
    interaction
});

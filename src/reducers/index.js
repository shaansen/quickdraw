import { combineReducers } from "redux";
import { Actions } from "../actions";
import { Elements } from "../elements";
import { getElementToMoveIndex, performCleanup } from "./helpers";

const commands = (
    state = { do: [], redo: [], transient: [], currentElement: null },
    action
) => {
    let currentDo = [...state.do];
    let currentRedo = [...state.redo];
    let currentTransient = [...state.transient];
    let lastAction = null;
    let mergeState = {};
    let index = null;
    let updatedPayload = null;

    switch (action.type) {
        case Actions.DRAG_START:
            return {
                ...state,
                currentElement: getElementToMoveIndex(action, currentDo)
            };
        case Actions.DRAG_FINISH:
            return {
                ...state,
                do: performCleanup(currentDo),
                currentElement: null
            };
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
        case Actions.MOVE:
            index = state.currentElement;
            updatedPayload = { ...action.payload, itemIndex: index };
            lastAction = { ...action, payload: updatedPayload };
            currentDo.push(lastAction);
            if (index !== -1) {
                return {
                    ...state,
                    do: currentDo
                };
            }
            return state;
        case Actions.DELETE_ELEMENT:
            index = state.currentElement;
            updatedPayload = { ...action.payload, itemIndex: index };
            lastAction = { ...action, payload: updatedPayload };
            if (index !== -1) {
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
            } else if (currentTransient.length === 0 && currentDo.length > 0) {
                lastAction = currentDo.pop();
                mergeState = {
                    do: currentDo,
                    redo: [...currentRedo, lastAction]
                };
            }
            return { ...state, ...mergeState };
        case Actions.REDO:
            if (currentTransient.length === 0 && currentRedo.length > 0) {
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

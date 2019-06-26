import { combineReducers } from 'redux'
import { Actions } from '../actions'
import { Elements } from '../elements'

const commands = (state = {do: [], redo: [], transient: []}, action) => {
    switch (action.type) {
        case Actions.CREATE_ELEMENT:
            if (action.payload.isTransient) {
                return {...state, transient: [action]}
            }
            return {...state, do: [...state.do, action], transient: []};
        case Actions.NEW_DRAWING:
            return {do: [], redo: [], transient: []}
        default:
    }
    return {...state};
};

const tool = (state = Elements.Line, action) => {
    if (action.type === Actions.SET_TOOL) {
        return action.payload;
    }
    return state;
}

const interaction = (state = {}, action) => {
    if (action.type === Actions.DRAG_START) {
        return {dragFrom: action.payload};
    }
    if (action.type === Actions.DRAG_FINISH) {
        return {};
    }
    return state;
}

export default combineReducers({
  commands,
  tool,
  interaction
})

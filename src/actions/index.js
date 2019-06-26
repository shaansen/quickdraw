import { registerActionAsCommand } from './runCommand'
import { createElement } from '../elements'

export const Actions = {
    CREATE_ELEMENT: 'CREATE_ELEMENT',
    NEW_DRAWING: 'NEW_DRAWING',
    DRAG_START: 'DRAG_START',
    DRAG_FINISH: 'DRAG_FINISH',
    SET_TOOL: 'SET_TOOL'
}

let nextElementId = 0
export const createElementAction = payload => ({
  type: Actions.CREATE_ELEMENT,
  payload: {...payload, id: nextElementId++}
})

registerActionAsCommand(Actions.CREATE_ELEMENT, (action, elements) => {
    elements[action.payload.id] = createElement(action.payload.type, action.payload);
})

export const dragStart = payload => ({
    type: Actions.DRAG_START,
    payload
})

export const dragFinish = () => ({
    type: Actions.DRAG_FINISH
})

export const newDrawing = () => ({
    type: Actions.NEW_DRAWING
})

export const setTool = payload => ({
    type: Actions.SET_TOOL,
    payload
})
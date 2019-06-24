import { Actions } from "../actions";
import {
    nearOrOnLine,
    nearOrOnRectangleEdges,
    nearLineOrRect
} from "../elements/geometry";

const deleteEntity = {
    Line: nearOrOnLine,
    Rect: nearOrOnRectangleEdges,
    Delete: null,
    Move: nearLineOrRect
};

const deleteDeletedElements = currentDo => {
    let listOfDeletedIndexes = currentDo
        .filter((a, i) => a.type == Actions.DELETE_ELEMENT)
        .map(a => a.payload.itemIndex);

    return currentDo.map((a, i) => {
        if (listOfDeletedIndexes.includes(i)) {
            return null;
        }
        return a;
    });
};

export const getLatestLocationsWithMoves = allCommands => {
    const moveMaps = findLastMovedElements(allCommands);
    return allCommands.map((command, i) => {
        if (command && command.type != Actions.MOVE && moveMaps[i]) {
            return getNewCommands(command, allCommands[moveMaps[i]]);
        }
        return command;
    });
};

export const findLastMovedElements = dos => {
    const movedElements = {};
    for (let i = dos.length - 1; i >= 0; i--) {
        if (dos[i]) {
            const { type, itemIndex } = dos[i].payload;
            if (
                dos[i].type == Actions.MOVE &&
                movedElements[itemIndex] == undefined
            ) {
                movedElements[itemIndex] = i;
            }
        }
    }
    return movedElements;
};

export const getElementToMoveIndex = (action, currentDo) => {
    const x = action.payload;
    currentDo = getLatestLocationsWithMoves(deleteDeletedElements(currentDo));
    for (let i = currentDo.length - 1; i >= 0; i--) {
        if (currentDo[i]) {
            const actionType = currentDo[i].type;
            const { p1, p2, type } = currentDo[i].payload;
            if (
                actionType !== Actions.DELETE_ELEMENT &&
                deleteEntity[type] &&
                deleteEntity[type](x, p1, p2)
            ) {
                return i;
            }
        }
    }
    return -1;
};

export const getNewCommands = (oldCommand, newCommand) => {
    const [x1, y1] = oldCommand.payload.p1;
    const [x2, y2] = newCommand.payload.p1;
    const [x3, y3] = oldCommand.payload.p2;
    const [shift_x, shift_y] = [x2 - x1, y2 - y1];

    const [p1_x1, p1_y1] = [x1 + shift_x, y1 + shift_y];
    const [p2_x1, p2_y1] = [x3 + shift_x, y3 + shift_y];
    const updatedCommand = {
        ...oldCommand,
        payload: {
            ...oldCommand.payload,
            p1: [p1_x1, p1_y1],
            p2: [p2_x1, p2_y1]
        }
    };
    return updatedCommand;
};

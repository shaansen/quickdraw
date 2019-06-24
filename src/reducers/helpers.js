import * as R from "ramda";
import { Actions } from "../actions";
import { Elements } from "../elements";
import { nearOrOnLine, nearOrOnRectangleEdges } from "../elements/geometry";

const deleteEntity = {
    Line: nearOrOnLine,
    Rect: nearOrOnRectangleEdges,
    Delete: null,
    Move: null
};

export const getElementToMoveIndex = (action, currentDo) => {
    const x = action.payload;
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

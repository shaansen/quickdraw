import Line from "./Line";
import Rect from "./Rect";
import Delete from "./Delete";

const gConstuctors = {};
const registerConstructor = (type, cls) => {
    gConstuctors[type] = cls;
};

export const Elements = {
    Line: "Line",
    Rect: "Rect",
    Delete: "Delete"
};

export const createElement = (type, data) => {
    return new gConstuctors[type](data);
};

export const deleteElement = (type, data) => {
    return new gConstuctors[type](data);
};

registerConstructor(Elements.Line, Line);
registerConstructor(Elements.Rect, Rect);
registerConstructor(Elements.Delete, Delete);

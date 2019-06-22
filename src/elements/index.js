import Line from "./Line";
import Rect from "./Rect";

const gConstuctors = {};
const registerConstructor = (type, cls) => {
    gConstuctors[type] = cls;
};

export const Elements = {
    Line: "Line",
    Rect: "Rect"
};

export const createElement = (type, data) => {
    return new gConstuctors[type](data);
};

registerConstructor(Elements.Line, Line);
registerConstructor(Elements.Rect, Rect);

import Line from './Line'

const gConstuctors = {};
const registerConstructor = (type, cls) => {
    gConstuctors[type] = cls;
}

export const Elements = {
    Line: 'Line'
}

export const createElement = (type, data) => {
    return new gConstuctors[type](data);
}

registerConstructor(Elements.Line, Line);
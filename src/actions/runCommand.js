const gCommands = {};

export const registerActionAsCommand = (commandType, fcn) => {
    gCommands[commandType] = fcn;
}

export default (command, elements) => {
    gCommands[command.type](command, elements);
}
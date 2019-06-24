import { connect } from "react-redux";
import {
    createElementAction,
    dragStart,
    dragFinish,
    deleteElementAction,
    moveElementAction
} from "../actions";
import runCommand from "../actions/runCommand";
import Renderer from "../components/Renderer";
import { Actions } from "../actions";

const findLastMovedElements = dos => {
    const movedElements = {};
    for (let i = dos.length - 1; i >= 0; i--) {
        const { type, itemIndex } = dos[i].payload;
        if (
            dos[i].type == Actions.MOVE &&
            movedElements[itemIndex] == undefined
        ) {
            movedElements[itemIndex] = i;
        }
    }
    return movedElements;
};

const getNewCommands = (oldCommand, newCommand) => {
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

const processCommandsIntoElements = commands => {
    const elements = {};
    let allCommands = [...commands.do, ...commands.transient];
    const moveMaps = findLastMovedElements(allCommands);
    allCommands = allCommands.map((command, i) => {
        if (command.type != Actions.MOVE && moveMaps[i]) {
            return getNewCommands(command, allCommands[moveMaps[i]]);
        }
        return command;
    });

    const dosToDelete = allCommands
        .filter(a => {
            return a.type == Actions.DELETE_ELEMENT;
        })
        .map(a => a.payload.itemIndex);

    for (let i = 0; i < allCommands.length; i++) {
        let command = allCommands[i];
        if (!dosToDelete.includes(i) && command.type != Actions.MOVE) {
            runCommand(command, elements);
        }
    }
    return elements;
};

const mapStateToProps = state => {
    return {
        elements: processCommandsIntoElements(state.commands),
        tool: state.tool,
        interaction: state.interaction
    };
};

const mapDispatchToProps = {
    createElementAction,
    dragStart,
    dragFinish,
    deleteElementAction,
    moveElementAction
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Renderer);

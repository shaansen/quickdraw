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
import { getLatestLocationsWithMoves } from "../reducers/helpers";

const processCommandsIntoElements = commands => {
    const elements = {};
    let allCommands = [...commands.do, ...commands.transient];
    allCommands = getLatestLocationsWithMoves(allCommands);

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

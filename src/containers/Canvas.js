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

const processCommandsIntoElements = commands => {
    const elements = {};
    const allDos = [...commands.do, ...commands.transient];
    const dosToDelete = allDos
        .filter(a => a.type == Actions.DELETE_ELEMENT)
        .map(a => a.payload.itemIndex);
    for (let i = 0; i < allDos.length; i++) {
        if (!dosToDelete.includes(i)) {
            const command = allDos[i];
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

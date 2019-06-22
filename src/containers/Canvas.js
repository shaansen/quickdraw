import { connect } from "react-redux";
import {
    createElementAction,
    dragStart,
    dragFinish,
    deleteElementAction
} from "../actions";
import runCommand from "../actions/runCommand";
import Renderer from "../components/Renderer";

const processCommandsIntoElements = commands => {
    const elements = {};
    for (const command of [...commands.do, ...commands.transient]) {
        runCommand(command, elements);
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
    deleteElementAction
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Renderer);

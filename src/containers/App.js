import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";

import Canvas from "./Canvas";
import PaletteItem from "../components/PaletteItem";

import { setTool, newDrawing } from "../actions";
import { Elements } from "../elements";

import deleteIcon from "./img/delete.svg";
import undoIcon from "./img/undo.svg";
import redoIcon from "./img/redo.svg";
import lineIcon from "./img/line.svg";
import moveIcon from "./img/move.svg";
import rectIcon from "./img/rect.svg";
import ellipseIcon from "./img/ellipse.svg";
import newIcon from "./img/new.svg";

class App extends Component {
    actionButton({ icon, name, action, enabled = true }) {
        return (
            <PaletteItem
                enabled={enabled}
                icon={icon}
                name={name}
                tool={this.props.tool}
                clickAction={() => this.props.dispatch(action)}
            />
        );
    }

    toolButton({ icon, name, enabled = true }) {
        return this.actionButton({
            icon,
            name,
            action: setTool(name),
            enabled
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">Quickdraw!</header>
                <div className="ui-container">
                    <div className="palette">
                        {this.actionButton({
                            icon: undoIcon,
                            name: "Undo",
                            enabled: false,
                            action: () => {}
                        })}
                        {this.actionButton({
                            icon: redoIcon,
                            name: "Redo",
                            enabled: false,
                            action: () => {}
                        })}
                        {this.actionButton({
                            icon: newIcon,
                            name: "New",
                            action: newDrawing()
                        })}
                        {this.toolButton({
                            icon: deleteIcon,
                            name: "Delete",
                            enabled: false
                        })}
                        {this.toolButton({
                            icon: moveIcon,
                            name: "Move",
                            enabled: false
                        })}
                        {this.toolButton({
                            icon: lineIcon,
                            name: Elements.Line
                        })}
                        {this.toolButton({
                            icon: rectIcon,
                            name: "Rect",
                            enabled: true
                        })}
                        {this.toolButton({
                            icon: ellipseIcon,
                            name: "Ellipse",
                            enabled: false
                        })}
                    </div>
                    <Canvas />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    tool: state.tool
});

export default connect(mapStateToProps)(App);

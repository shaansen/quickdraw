import React, { Component } from "react";
import "./Renderer.css";
import { getTool } from "../tools";

export default class Renderer extends Component {
    componentDidMount() {
        const canvas = this.refs.canvas;
        this.ctx = canvas.getContext("2d");
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(
            0,
            0,
            this.refs.canvas.width,
            this.refs.canvas.height
        );
    }

    getMousePos(evt) {
        const canvas = this.refs.canvas;
        var rect = canvas.getBoundingClientRect();
        return [evt.clientX - rect.left, evt.clientY - rect.top];
    }

    draw() {
        if (this.ctx) {
            this.ctx.fillStyle = "white";
            this.ctx.fillRect(
                0,
                0,
                this.refs.canvas.width,
                this.refs.canvas.height
            );
            for (const element of Object.values(this.props.elements)) {
                element.draw(this.ctx);
            }
        }
    }

    render() {
        this.draw();
        return (
            <div>
                <canvas
                    className="Renderer"
                    width="400"
                    height="400"
                    ref="canvas"
                    onMouseDown={e => {
                        getTool(this.props.tool).handleMouseDown(
                            this.props,
                            this.getMousePos(e)
                        );
                    }}
                    onClick={e => {
                        getTool(this.props.tool).handleMouseClick(
                            this.props,
                            this.getMousePos(e)
                        );
                    }}
                    onMouseMove={e => {
                        getTool(this.props.tool).handleMouseMove(
                            this.props,
                            this.getMousePos(e)
                        );
                    }}
                    onMouseUp={e => {
                        getTool(this.props.tool).handleMouseUp(
                            this.props,
                            this.getMousePos(e)
                        );
                    }}
                />
            </div>
        );
    }
}

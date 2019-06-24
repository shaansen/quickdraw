export default class DeleteElementTool {
    handleMouseDown(props, pos) {
        props.dragStart(pos);
    }

    handleMouseClick(props, pos) {
        props.dragStart(pos);
        props.deleteElementAction({
            type: props.tool,
            p1: props.interaction.dragFrom,
            p2: pos
        });
    }

    handleMouseMove(props, pos) {
        if (props.interaction.dragFrom) {
            props.dragFinish();
        }
    }

    handleMouseUp(props, pos) {}
}

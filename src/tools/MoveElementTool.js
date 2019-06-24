export default class MoveElementTool {
    handleMouseClick(props, pos) {}

    handleMouseDown(props, pos) {
        props.dragStart(pos);
    }

    handleMouseMove(props, pos) {
        if (props.interaction.dragFrom) {
            props.moveElementAction({
                type: props.tool,
                p1: pos,
                p2: pos,
                isTransient: true
            });
        }
    }

    handleMouseUp(props, pos) {
        props.dragFinish();
    }
}

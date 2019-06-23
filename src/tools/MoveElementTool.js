export default class MoveElementTool {
    handleMouseDown(props, pos) {
        props.dragStart(pos);
    }

    handleMouseMove(props, pos) {
        if (props.interaction.dragFrom) {
            props.moveElementAction({
                type: props.tool,
                p1: props.interaction.dragFrom,
                p2: pos,
                isTransient: true
            });
        }
    }

    handleMouseUp(props, pos) {
        if (props.interaction.dragFrom) {
            props.dragFinish();
            props.moveElementAction({
                type: props.tool,
                p1: props.interaction.dragFrom,
                p2: pos
            });
        }
    }
}

export default class CreateElementTool {
    handleMouseDown(props, pos) {
        props.dragStart(pos);
    }

    handleMouseMove(props, pos) {
        if (props.interaction.dragFrom) {
            props.createElementAction({
                type: props.tool,
                p1: props.interaction.dragFrom,
                p2: pos,
                isTransient: true
            })
        }
    }

    handleMouseUp(props, pos) {
        if (props.interaction.dragFrom) {
            props.dragFinish();
            props.createElementAction({
                type: props.tool,
                p1: props.interaction.dragFrom,
                p2: pos
            })
        }
    }
}
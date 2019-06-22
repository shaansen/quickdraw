import { distToSegment } from "./geometry";

const HIT_DISTANCE = 1.5;

export default class Rect {
    constructor({ p1, p2, id }) {
        // It is necessary to copy these arrays instead of referencing them because
        // if we change them later, we don't want to be changing them in action
        // from which they were passed in.
        this.start = [...p1];
        this.end = [...p2];
        this.id = id;
    }

    draw(ctx) {
        const [s0, s1] = this.start;
        const [e0, e1] = this.end;

        ctx.beginPath();
        ctx.moveTo(s0, s1);
        ctx.lineTo(e0, s1);
        ctx.lineTo(e0, e1);
        ctx.moveTo(s0, s1);
        ctx.lineTo(s0, e1);
        ctx.lineTo(e0, e1);
        ctx.stroke();
    }

    isHit(pt) {
        return distToSegment(pt, this.start, this.end) <= HIT_DISTANCE;
    }
}

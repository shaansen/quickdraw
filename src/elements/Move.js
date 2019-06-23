import { distToSegment } from "./geometry";

const HIT_DISTANCE = 1.5;

export default class Move {
    constructor({ p1, p2, id }) {
        // It is necessary to copy these arrays instead of referencing them because
        // if we change them later, we don't want to be changing them in action
        // from which they were passed in.
        this.start = [...p1];
        this.end = [...p2];
        this.id = id;
    }

    draw(ctx) {}

    isHit(pt) {
        return distToSegment(pt, this.start, this.end) <= HIT_DISTANCE;
    }
}

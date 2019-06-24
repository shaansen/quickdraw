const sqr = x => {
    return x * x;
};

const dist2 = (v, w) => {
    return sqr(v[0] - w[0]) + sqr(v[1] - w[1]);
};

// p - point
// v - start point of segment
// w - end point of segment
const distToSegmentSquared = (p, v, w) => {
    var l2 = dist2(v, w);
    if (l2 === 0) return dist2(p, v);
    var t =
        ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
    t = Math.max(0, Math.min(1, t));
    return dist2(p, [v[0] + t * (w[0] - v[0]), v[1] + t * (w[1] - v[1])]);
};

// p - point
// v - start point of segment
// w - end point of segment
export const distToSegment = (p, v, w) => {
    return Math.sqrt(distToSegmentSquared(p, v, w));
};

export const nearOrOnRectangleEdges = (p, v, w) => {
    const [x1, y1] = v;
    const [x2, y2] = w;
    return (
        nearOrOnLine(p, [x1, y1], [x1, y2]) ||
        nearOrOnLine(p, [x1, y1], [x2, y1]) ||
        nearOrOnLine(p, [x2, y2], [x1, y2]) ||
        nearOrOnLine(p, [x2, y2], [x2, y1])
    );
};

export const nearOrOnLine = (p, v, w) => {
    return distToSegment(p, v, w) < 10;
};

export const nearLineOrRect = (p, v, w) =>
    nearOrOnRectangleEdges(p, v, w) || nearOrOnLine(p, v, w);

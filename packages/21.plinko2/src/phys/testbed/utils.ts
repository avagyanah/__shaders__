import type { RGBA, XY } from '@box2d/core';

export const nope = (): void => {
    //
};

export const colorToString = (color: RGBA, alpha = color.a): string => {
    const { r: cr, b: cb, g: cg } = color;

    return `rgba(${cr * 255},${cg * 255},${cb * 255},${alpha})`;
};

export const addVector = (v1: XY, v2: XY): XY => {
    const x = v1.x + v2.x;
    const y = v1.y + v2.y;

    return { x, y };
};

export const scaleVector = (v1: XY, ratio: number): XY => {
    const x = v1.x + ratio;
    const y = v1.y + ratio;

    return { x, y };
};

export const rotateVector = (v: XY, cos: number, sin: number): XY => {
    const x = cos * v.x + sin * v.y;
    const y = cos * v.y - sin * v.x;

    return { x, y };
};

export const rotateVector2 = (v: XY, rad: number): XY => {
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const x = cos * v.x + sin * v.y;
    const y = cos * v.y - sin * v.x;

    return { x, y };
};

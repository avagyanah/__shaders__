/* eslint-disable @typescript-eslint/member-ordering */
import type { Container } from 'pixi.js';
import { Graphics } from 'pixi.js';
import { V3 } from './vector';

export class Debug {
    private static _parent: Container;
    private static _gr = new Graphics();
    private static _grs: Graphics[] = [];

    public static BLACK = 0x000000;
    public static WHITE = 0xffffff;
    public static GRAY = 0x7c7c7c;
    public static RED = 0xc9283e;
    public static GREEN = 0x28c93d;
    public static BLUE = 0x2830c9;
    public static CYAN = 0x00f6f7;

    public static setParent = (obj: Container): void => {
        this._parent = obj;
        this._parent.addChild(Debug._gr);
    };

    public static fix = (): void => {
        Debug._grs.push(Debug._gr);
        Debug._gr = new Graphics();
        this._parent.addChild(Debug._gr);
    };

    public static clear = (): void => {
        Debug._gr.clear();
    };

    public static clearAll = (): void => {
        Debug._grs.forEach((gr) => gr.clear());
    };

    public static drawLine = (v1: IVec3, v2: IVec3, width = 2, color = Debug.WHITE): void => {
        Debug._gr.lineStyle(width, color);
        Debug._gr.moveTo(v1[0], v1[1]);
        Debug._gr.lineTo(v2[0], v2[1]);

        Debug._reset();
    };

    public static drawVector = (v1: IVec3, v2: IVec3, width = 2, color = Debug.WHITE): void => {
        Debug.drawLine(v1, v2, width, color);
        Debug._gr.beginFill(color, 1);
        Debug._gr.drawCircle(v2[0], v2[1], width * 2);
        Debug._gr.endFill();

        Debug._reset();
    };

    public static drawPoint = (v: IVec3, radius = 4, color = Debug.WHITE): void => {
        Debug._gr.beginFill(color, 1);
        Debug._gr.drawCircle(v[0], v[1], radius);
        Debug._gr.endFill();

        Debug._reset();
    };

    public static drawCircle = (v: IVec3, width = 2, radius = 100, color = Debug.WHITE): void => {
        Debug._gr.lineStyle(width, color);
        Debug._gr.drawCircle(v[0], v[1], radius);

        Debug._reset();
    };

    private static _reset = (): void => {
        Debug._gr.lineStyle(0, 0xffffff);
        Debug._gr.beginFill(0xffffff, 1);
        Debug._gr.endFill();
    };
    private static _rotate = (v: IVec3, radians: number): void => {
        const { 0: x, 1: y, 2: z } = v;
        const normal = V3.normalize(v);
        console.warn(normal);

        // const
        return v;
    };
}

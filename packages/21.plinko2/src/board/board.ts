import { b2Transform, type b2World } from '@box2d/core';
import { Container, Point, Sprite } from 'pixi.js';
import { assets } from '../assets';
import { PHYS_SCALE, alpha } from '../constants';
import { Ball } from './ball';
import { Box } from './box';
import { paths } from './paths';
import { Pin } from './pin';

const minRows = 8;
const width = 1920;
const height = 1660;

let padTop = 0;
let padBottom = 0;

let gapX = 0;
let gapY = 0;

let pinRad = 24;
let ballRad = 32;

let scale = 1;
let scaleBottom = 1;
let scaleTop = 1;

export function sample<T>(list: T[]): T | undefined {
    return list[Math.floor(Math.random() * list.length)];
}

export class Board extends Container {
    private static _risk: Risk;
    private static _multipliers: Record<number, number[]>;
    private static _world: b2World;

    private readonly _pins: Pin[];
    private readonly _balls: Ball[];
    private readonly _boxes: Box[];
    private readonly _view: BoardView;

    private _rows: number;

    public constructor() {
        super();

        this._view = this._createView();
        this._pins = [];
        this._balls = [];
        this._boxes = [];
    }

    public get gapY(): number {
        return gapY;
    }

    public get padTop(): number {
        return padTop;
    }

    public get ballRad(): number {
        return ballRad;
    }

    public get balls(): Ball[] {
        return this._balls;
    }

    public static setRisk(risk: Risk): void {
        Board._risk = risk;
    }

    public static setMultipliers(multipliers: Record<number, number[]>): void {
        Board._multipliers = multipliers;
    }

    public update(): void {
        this._balls.forEach((ball) => ball.update());
    }

    public readonly getPath = (source: Ball, indexes: number[]): Path => {
        const result: Path = [];

        const ballPos = source.view.position.clone();

        for (let i = 0; i < indexes.length; i++) {
            const index = indexes[i];
            const dest = this._pins[index];
            const destPos = dest.view.position.clone();

            const pi = Math.min(i + 1, 2);
            // const pi = 3;
            const path = paths[`path${pi}`];
            // const path = paths['path1'];

            const { offset, points } = path;

            const offX = destPos.x - ballPos.x;
            const offY = destPos.y - ballPos.y - (pinRad + pinRad);

            const fx = offX / offset.x;
            const fy = offY / offset.y;

            console.warn(fy);

            for (let i = 0; i < points.length; i += 3) {
                const x = points[i + 0] * fx + ballPos.x;
                const y = points[i + 1] * fy + ballPos.y;
                const r = 0;

                result.push([x, y, r]);
            }

            ballPos.set(destPos.x, destPos.y);
        }

        return result;
    };

    public async addBall(): Promise<void> {
        const ball = new Ball(this._balls.length, new Point(0, ballRad * 2), scale, ballRad);
        // const ball = new Ball(this._balls.length, new Point(0, 0), scale, ballRad);
        const transform = new b2Transform();
        transform.SetPositionXY(0 / PHYS_SCALE, -(padTop + gapY) / PHYS_SCALE);
        ball.body.SetTransform(transform);

        this._balls.push(ball);
        this.addChild(ball.view);

        // const path = this.getPath(ball, [0, 2, 4]);

        const path = this.getPath(ball, [0, 2, 4, 7, 12, 17, 23, 31]);
        ball.setPath(path);

        console.warn(window['dx'], window['dy']);
    }

    public initRows(rows: number): void {
        this._rows = rows;

        this._calculateScale(rows);

        this._removePins();
        this._removeBoxes();

        this._createPins();
        this._createBoxes();
    }

    private _calculateScale(rows: number): void {
        /* scale */
        const scaleFactor = Math.pow(minRows / rows, 0.75);
        scale = Math.min(1, scaleFactor);

        scaleBottom = Math.pow(scale, 0.3);
        scaleTop = Math.pow(scale, 0.4);

        /* paddings & gaps */
        padTop = 250 * scaleTop;
        padBottom = 240 * scaleBottom;

        const sf = height / (height - (padTop + padBottom));

        gapY = height / (rows - 1) / sf;
        gapX = (width - 30) / (rows - 1) / sf;

        pinRad = pinRad * scale;
        ballRad = ballRad * scale;

        // TEMP
        const dx = gapX - (pinRad + pinRad);
        const dy = gapY - (pinRad + pinRad);

        window['dx'] = dx;
        window['dy'] = dy;

        // const gr = new Graphics();
        // gr.beginFill(0xff0000);
        // gr.drawRect(-100, padTop + pinRad, 200, dy);
        // gr.endFill();
        // this.addChild(gr);
    }

    private _createView(): BoardView {
        const view = new BoardView();
        this.addChild(view);

        // TEMP
        view.alpha = alpha;

        return view;
    }

    private _removePins(): void {
        this._pins.forEach((pin) => pin.destroy());
        this._pins.length = 0;
    }

    private _removeBoxes(): void {
        this._boxes.forEach((box) => box.destroy());
        this._boxes.length = 0;
    }

    private _createPins(): void {
        for (let i = 0; i < this._rows; i++) {
            for (let j = 0; j <= i; j++) {
                const x = (j - i / 2) * gapX;
                const y = i * gapY + padTop;

                const pin = new Pin(this._pins.length, new Point(x, y), scale, pinRad);

                this._pins.push(pin);
                this.addChild(pin.view);
            }
        }
    }

    private _createBoxes(): void {
        const boxScale = Math.pow(scale, 0.55);
        const boxGapScale = Math.pow(scale, 1.4);

        for (let i = 0; i <= this._rows; i++) {
            const x = (i - this._rows / 2) * gapX;
            const y = this._rows * gapY + padTop;

            const box = new Box(
                this._boxes.length,
                new Point(x, y - 120 * boxGapScale),
                boxScale,
                Board._multipliers[this._rows][i],
                Board._risk
            );

            this._boxes.push(box);
            this.addChild(box.view);
        }
    }
}

class BoardView extends Container {
    public constructor() {
        super();

        const bg = Sprite.from(assets.images.field);
        bg.anchor.set(0.5, 0);
        bg.position.set(6, 0);

        const cs = 1.8; // coso scale

        const cosoL = Sprite.from(assets.images.coso);
        cosoL.position.set(-width / 2, height - 50);
        cosoL.scale.set(cs, cs);

        const cosoR = Sprite.from(assets.images.coso);
        cosoR.position.set(width / 2 + 10, height - 50);
        cosoR.scale.set(-cs, cs);

        this.addChild(bg, cosoL, cosoR);
    }
}

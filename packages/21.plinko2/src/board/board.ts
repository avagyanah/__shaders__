import type { b2World } from '@box2d/core';
import { Tween } from '@tweenjs/tween.js';
import { Container, Point, Sprite } from 'pixi.js';
import { assets } from '../assets';
import { alpha } from '../constants';
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

const pinRad = 28;
const ballRad = 28;

let scale = 1;
let scaleBottom = 1;
let scaleTop = 1;

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

    public addBall(): void {
        // const ball = new Ball(this._balls.length, new Point(3.3, ballRad * 2 * scale), scale, ballRad);
        const ball = new Ball(this._balls.length, new Point(0, ballRad * 2 * scale), scale, ballRad);

        this._balls.push(ball);
        this.addChild(ball.view);

        console.warn(scale);

        const dy = padTop - (pinRad - 6 + ballRad) * scale;
        const sx = dx / 250;
        const sy = dy / 250;

        const p = paths['X:250.308,X:250'];

        const xx = [];
        const yy = [];
        const rr = [];

        for (let i = 0; i < p.length; i += 3) {
            const x = p[i + 0] * sx;
            const y = p[i + 1] * sy;
            const r = p[i + 2];

            xx.push(x);
            yy.push(y);
            rr.push(r);
        }

        const speed = p.length * 5;
        const tween = new Tween(ball.view);
        tween.to(
            {
                x: xx,
                y: yy,
                rotation: rr,
            },
            speed
        );
        tween.start();
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
        gapX = (width - 20) / (rows - 1) / sf;

        // TEMP
        const dy = padTop;
        const dx = gapX;

        window['dx'] = dx;
        window['dy'] = dy;

        // const gr = new Graphics();
        // const dy = padTop - ballRad * scale;
        // gr.beginFill(0xff0000);
        // gr.drawRect(0, 0, 4, dy);
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

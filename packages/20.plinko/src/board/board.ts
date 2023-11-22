import Matter from 'matter-js';
import { Container, Point, Sprite } from 'pixi.js';
import { assets } from '../assets';
import { Ball } from './ball';
import { Pin } from './pin';

const minRows = 8;
const width = 1920;
const height = 1660;

let padTop = 0;
let padBottom = 0;

let gapX = 0;
let gapY = 0;

let diffX = 0;
let diffY = 0;

const pinRad = 28;
const ballRad = 30;

let scale = 1;
// let topFactor = 1;
// let bottomFactor = 1;

export class Board extends Container {
    private static _engine: Matter.Engine;

    private readonly _pins: Pin[];
    private readonly _balls: Ball[];

    // private readonly _pinsGroup: Container;
    // private readonly _ballsGroup: Container;

    private _rows: number;
    // private _objScl = 1;
    // private _gapScl = 1;

    public constructor() {
        super();

        this._createView();

        this._pins = [];
        this._balls = [];

        // this._pinsGroup = new Container();
        // this._ballsGroup = new Container();

        // this.addChild(this._pinsGroup, this._ballsGroup);
    }

    public static setup(engine: Matter.Engine): void {
        Board._engine = engine;
    }

    public update(): void {
        this._balls.forEach((ball) => ball.update());
    }

    public addBall(): void {
        const ball = new Ball(this._balls.length, new Point(0, 80), ballRad);
        ball.view.scale.set(scale);
        Matter.World.addBody(Board._engine.world, ball.body);

        this._balls.push(ball);
        this.addChild(ball.view);

        const dx = gapX;
        const dy = gapY;
        const rb = ballRad;
        const rp = pinRad - 8;

        ball.setPath(dx, dy, rb, rp);
    }

    public initRows(rows: number): void {
        this._rows = rows;

        this._calculateScale(rows);
        this._removePins();
        this._createPins();
    }

    private _calculateScale(rows: number): void {
        /* scale */
        const scaleFactor = Math.pow(minRows / (rows - 1), 0.85);
        scale = Math.min(1, scaleFactor);

        const scaleBottom = 1;
        const scaleTop = Math.pow(scale, 0.7);

        /* paddings & gaps */
        padTop = 280 * scaleTop;
        padBottom = 240 * scaleBottom;

        const sf = height / (height - (padTop + padBottom));

        gapY = height / (rows - 1) / sf;
        gapX = (width - 20) / (rows - 1) / sf;

        diffY = gapY - 2 * pinRad * scale;
        diffX = gapX - 2 * pinRad * scale;
    }

    private _createView(): void {
        const sprite = Sprite.from(assets.images.field_orig);
        sprite.anchor.set(0.5, 0);
        sprite.position.set(6, 0);
        this.addChild(sprite);
    }

    private _removePins(): void {
        this._pins.forEach((pin) => {
            pin.view.destroy();
            Matter.World.remove(Board._engine.world, pin.body);
        });
    }

    private _createPins(): void {
        const gx = gapX;
        const gy = gapY;

        const dx = 0;
        const dy = padTop;

        for (let i = 0; i <= this._rows - 1; i++) {
            for (let j = 0; j <= i; j++) {
                const x = (j - i / 2) * gx + dx;
                const y = i * gy + dy;

                const pin = new Pin(this._pins.length, new Point(x, y), pinRad);
                pin.view.scale.set(scale);
                Matter.World.addBody(Board._engine.world, pin.body);

                this._pins.push(pin);
                this.addChild(pin.view);
            }
        }
    }
}

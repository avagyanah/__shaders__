import Matter from 'matter-js';
import { Container, Point, Sprite } from 'pixi.js';
import { assets } from '../assets';
import { Ball } from './ball';
import { Box } from './box';
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
const ballRad = 28;

let scale = 1;

export class Board extends Container {
    private static _engine: Matter.Engine;

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

    public static setup(engine: Matter.Engine): void {
        Board._engine = engine;
    }

    public update(): void {
        this._balls.forEach((ball) => ball.update());
    }

    public addBall(): void {
        const ball = new Ball(this._balls.length, new Point(0, 0), ballRad);
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
        this._removeBoxes();

        this._createPins();
        this._createBoxes();
    }

    private _calculateScale(rows: number): void {
        /* scale */
        const scaleFactor = Math.pow(minRows / rows, 0.85);
        scale = Math.min(1, scaleFactor);

        const scaleBottom = Math.pow(scale, 0.3);
        const scaleTop = Math.pow(scale, 0.4);

        /* paddings & gaps */
        padTop = 250 * scaleTop;
        padBottom = 240 * scaleBottom;

        const sf = height / (height - (padTop + padBottom));

        gapY = height / (rows - 1) / sf;
        gapX = (width - 20) / (rows - 1) / sf;

        diffY = gapY - 2 * pinRad * scale;
        diffX = gapX - 2 * pinRad * scale;
    }

    private _createView(): BoardView {
        const view = new BoardView();
        this.addChild(view);

        return view;
    }

    private _removePins(): void {
        this._pins.forEach((pin) => {
            pin.view.destroy();
            Matter.World.remove(Board._engine.world, pin.body);
        });
    }

    private _removeBoxes(): void {
        this._boxes.forEach((box) => {
            box.view.destroy();
        });
    }

    private _createPins(): void {
        for (let i = 0; i < this._rows; i++) {
            for (let j = 0; j <= i; j++) {
                const x = (j - i / 2) * gapX;
                const y = i * gapY + padTop;

                const pin = new Pin(this._pins.length, new Point(x, y), pinRad);
                pin.view.scale.set(scale);
                Matter.World.addBody(Board._engine.world, pin.body);

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

            const box = new Box(this._pins.length, new Point(x, y - 120 * boxGapScale));
            box.view.scale.set(boxScale);

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

        const s = 1.8;

        const cosoL = Sprite.from(assets.images.coso);
        cosoL.position.set(-width / 2, height - 50);
        cosoL.scale.set(s, s);

        const cosoR = Sprite.from(assets.images.coso);
        cosoR.position.set(width / 2 + 10, height - 50);
        cosoR.scale.set(-s, s);

        this.addChild(bg, cosoL, cosoR);
    }
}

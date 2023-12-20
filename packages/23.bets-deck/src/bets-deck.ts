import { ScrollBox } from '@pixi/ui';
import { Easing, Tween } from '@tweenjs/tween.js';
import { Color, Container, Text } from 'pixi.js';

export class BetsDeck extends Container {
    private _scrollGroup!: ScrollBox;
    private _betsGroup!: Container;
    private _tween: Tween<Container>;

    public constructor() {
        super();

        this._betsGroup = new Container();
        this._tween = new Tween(this._betsGroup);

        this._scrollGroup = new ScrollBox({
            background: new Color({ r: 1, g: 1, b: 1, a: 1 }),
            width: 200,
            height: 140,
            elementsMargin: 0,
            type: 'vertical',
        });
        this.addChild(this._scrollGroup);

        const delay = 200;

        this._add(6, 0xffffff, true);

        const start = 1;

        for (let i = start; i < start + 4; i++) {
            setTimeout(() => {
                this._add(Number((Math.random() * 10).toFixed(0)), 0xffffff, false);
            }, i * delay);
        }

        this._stop();
        this._start();
    }

    private _start(): void {
        this._scrollGroup.interactiveChildren = true;
    }

    private _stop(): void {
        this._scrollGroup.interactiveChildren = false;
    }

    private _add(value: number, color: number, force: boolean): void {
        const currentY = this._betsGroup.y;
        const diffY = 40;

        const text = new Text(`${value}x`, {
            fontFamily: 'DigitalNumbers',
            fontWeight: 'bold',
            fontSize: 20,
            fill: color,
        });
        text.anchor.x = 1;
        text.x = 200;

        this._betsGroup.children.forEach((c) => {
            c.y += diffY;
        });

        this._scrollGroup.removeItems();
        this._betsGroup.addChildAt(text, 0);

        if (this._betsGroup.children.length > 5) {
            this._betsGroup.removeChildAt(this._betsGroup.children.length - 1);
        }

        if (force) {
            this._scrollGroup.addItem(this._betsGroup);

            return;
        }

        this._scrollGroup.addItem(this._betsGroup);
        this._betsGroup.y -= diffY - currentY;

        this._tween.stop();
        this._tween = new Tween(this._betsGroup).to({ y: 0 }, 300);
        this._tween.easing(Easing.Back.Out);
        this._tween.start();
    }
}

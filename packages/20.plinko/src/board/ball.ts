import { Easing, Tween } from '@tweenjs/tween.js';
import Matter from 'matter-js';
import { Container, Sprite } from 'pixi.js';
import { assets } from '../assets';

const generatePath = (dx: number, dy: number, r1: number, r2: number): { x: string[]; y: string[] } => {
    return {
        x: ['+0'],
        y: ['+0'],
    };
};

export class Ball {
    public readonly body: Matter.Body;
    public readonly view: Container;

    private readonly _id: number;
    private readonly _radius: number;
    private readonly _position: IPoint;

    public constructor(id: number, position: IPoint, radius: number) {
        this._id = id;
        this._radius = radius;
        this._position = position;

        this.body = this._createBody();
        this.view = this._createView();

        this.sync();
    }

    public setPath(dx: number, dy: number, radBall: number, radPin: number): void {
        return;
        const path = generatePath(dx, dy, radBall, radPin);

        const tween = new Tween(this.view.position);
        tween.to(
            {
                x: path.x,
                y: path.y,
            },
            600
        );
        tween.easing(Easing.Linear.None);
        // tween.easing(Easing.Cubic.In);
        tween.start();
    }

    public update(): void {
        this.sync();

        // if (this._pathComplete) {
        //     return;
        // }
        // const { 0: x, 1: y } = this._path.pop();
        // this.view.position.set(x, y);
        // if (this._path.length === 0) {
        //     this._pathComplete = true;
        // }
    }

    public sync(): void {
        const { position, angle } = this.body;

        this.view.position.set(position.x, position.y + 3);
        this.view.angle = angle;
    }

    private _createView(): Container {
        const diameter = this._radius * 2;

        const sprite = Sprite.from(assets.images.ball);
        sprite.anchor.set(0.5);
        sprite.tint = 0xffff00;

        sprite.width = diameter;
        sprite.height = diameter;

        const view = new Container();
        view.addChild(sprite);

        return view;
    }

    private _createBody(): Matter.Body {
        const body = Matter.Bodies.circle(this._position.x, this._position.y, this._radius, {
            isStatic: true,
            friction: 0,
            restitution: 0.5,
        });

        return body;
    }
}

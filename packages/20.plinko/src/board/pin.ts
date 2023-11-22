import Matter from 'matter-js';
import { Container, Sprite } from 'pixi.js';
import { assets } from '../assets';

export class Pin {
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

    public get position(): IPoint {
        return this._position;
    }

    public destroy(): void {
        this.view.destroy();
    }

    public sync(): void {
        const { position, angle } = this.body;

        this.view.position.set(position.x, position.y + 3);
        this.view.angle = angle;
    }

    private _createView(): Container {
        const sprite = Sprite.from(assets.images.pin);
        sprite.anchor.set(0.5);

        const view = new Container();
        view.addChild(sprite);

        return view;
    }

    private _createBody(): Matter.Body {
        const body = Matter.Bodies.circle(this._position.x, this._position.y, this._radius, {
            isStatic: true,
            friction: 0,
        });

        return body;
    }
}

import { b2BodyType, b2CircleShape, type b2Body, type b2BodyDef, type b2FixtureDef } from '@box2d/core';
import { Container, Sprite } from 'pixi.js';
import { assets } from '../assets';
import { PHYS_SCALE, alpha } from '../constants';
import { Phys } from '../phys/phys';

export class Ball {
    public readonly body: b2Body;
    public readonly view: Container;

    private readonly _id: number;
    private readonly _scale: number;
    private readonly _radius: number;
    private readonly _position: IPoint;

    private _path: Path;

    public constructor(id: number, position: IPoint, scale: number, radius: number) {
        this._id = id;
        this._scale = scale;
        this._radius = radius;
        this._position = position;

        this.view = this._createView();
        this.body = this._createBody();
    }

    public destroy(): void {
        this.view.destroy();
        Phys.world.DestroyBody(this.body);
    }

    public update(): void {
        // this.sync();
        // return;

        if (this._path.length === 0) {
            return;
        }

        const { 0: x, 1: y } = this._path.shift();

        this.view.position.set(x, y);
    }

    public sync(): void {
        const pos = this.body.GetPosition();
        const angle = this.body.GetAngle();

        this.view.position.set(pos.x * PHYS_SCALE, -pos.y * PHYS_SCALE);
        this.view.angle = -angle;
    }

    public setPath(path: Path): void {
        this._path = path;
    }

    private _createView(): Container {
        const { _scale: scale, _position: pos } = this;

        const diameter = this._radius * 2;

        const sprite = Sprite.from(assets.images.ball);
        sprite.anchor.set(0.5);
        sprite.tint = 0xffff00;

        const dot = Sprite.from(assets.images.ball);
        dot.width = diameter * 0.2;
        dot.height = diameter * 0.2;
        dot.y = -diameter * 0.25;
        dot.anchor.set(0.5);
        dot.tint = 0xff0000;
        dot.visible = false;

        sprite.width = diameter;
        sprite.height = diameter;

        const view = new Container();
        // view.scale.set(scale);
        view.position.set(pos.x, pos.y);
        view.addChild(sprite, dot);

        // TEMP
        view.alpha = alpha;

        return view;
    }

    private _createBody(): b2Body {
        const { _scale: scale, _position: pos } = this;

        const bodyDef: b2BodyDef = {
            type: b2BodyType.b2_dynamicBody,
            // gravityScale: 8,
            // position: { x: pos.x / PHYS_SCALE, y: -pos.y / PHYS_SCALE },
        };

        const fixtureDef: b2FixtureDef = {
            shape: new b2CircleShape(this._radius / PHYS_SCALE),
            density: 1.0,
            restitution: 0.5,
        };

        const body = Phys.world.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);

        return body;
    }
}

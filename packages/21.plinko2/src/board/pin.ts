import type { b2BodyDef, b2FixtureDef } from '@box2d/core';
import { b2BodyType, b2CircleShape, type b2Body } from '@box2d/core';
import { Container, Sprite } from 'pixi.js';
import { assets } from '../assets';
import { PHYS_SCALE, alpha } from '../constants';
import { Phys } from '../phys/phys';

export class Pin {
    public readonly body: b2Body;
    public readonly view: Container;

    private readonly _id: number;
    private readonly _scale: number;
    private readonly _radius: number;
    private readonly _position: IPoint;

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

    private _createView(): Container {
        const { _scale: scale, _position: pos } = this;

        const sprite = Sprite.from(assets.images.pin);
        sprite.anchor.set(0.5);

        const view = new Container();
        view.scale.set(scale);
        view.position.set(pos.x, pos.y + 3);
        view.addChild(sprite);

        // TEMP
        view.alpha = alpha;

        return view;
    }

    private _createBody(): b2Body {
        const { _scale: scale, _position: pos } = this;

        const bodyDef: b2BodyDef = {
            type: b2BodyType.b2_staticBody,
            position: { x: pos.x / PHYS_SCALE, y: -(pos.y * scale) / PHYS_SCALE },
        };

        const fixtureDef: b2FixtureDef = {
            shape: new b2CircleShape(((this._radius - 7) * scale) / PHYS_SCALE),
            // shape: new b2CircleShape(0.1),
            userData: { id: this._id },
        };

        const body = Phys.world.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);

        return body;
    }
}

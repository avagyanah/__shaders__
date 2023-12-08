import type { b2Body, b2BodyDef, b2FixtureDef } from '@box2d/core';
import { b2BodyType, b2CircleShape } from '@box2d/core';
import { Container, Sprite, Text } from 'pixi.js';
import { assets } from '../assets';
import { PHYS_SCALE, alpha, riskConditions } from '../constants';
import { Phys } from '../phys/phys';

export class Box {
    public readonly body: b2Body;
    public readonly view: Container;

    private readonly _id: number;
    private readonly _scale: number;
    private readonly _position: IPoint;

    public constructor(id: number, position: IPoint, scale: number, multiplier: number, risk: Risk) {
        this._id = id;
        this._scale = scale;
        this._position = position;

        this.view = this._createView(multiplier, risk);
        // this.body = this._createBody();
    }

    public get position(): IPoint {
        return this._position;
    }

    public get radius(): number {
        return 0;
    }

    public destroy(): void {
        this.view.destroy();
        Phys.world.DestroyBody(this.body);
    }

    private _createView(multiplier: number, risk: Risk): Container {
        const { _scale: scale, _position: pos } = this;

        const { texture, color } = getViewConfig(multiplier, risk);

        const sprite = Sprite.from(assets.images[texture]);
        sprite.anchor.set(0.5);

        const text = new Text(`${multiplier}`, {
            fontFamily: 'BlenderPro',
            fontSize: 44,
            fill: color,
            fontWeight: '900',
        });
        text.height *= 1.08;
        text.anchor.set(0.5);
        text.position.set(0, -4);

        const view = new Container();
        view.scale.set(scale);
        view.position.set(pos.x, pos.y - 40 * scale);
        view.addChild(sprite, text);

        // TEMP
        view.alpha = alpha;

        return view;
    }

    private _createBody(): b2Body {
        const { _scale: scale, _position: pos } = this;

        const bodyDef: b2BodyDef = {
            type: b2BodyType.b2_staticBody,
            position: { x: pos.x / PHYS_SCALE, y: -(pos.y + 60 * scale) / PHYS_SCALE },
            enabled: false,
        };

        const fixtureDef: b2FixtureDef = {
            shape: new b2CircleShape((32 * scale) / PHYS_SCALE),
        };

        const body = Phys.world.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);

        return body;
    }
}

function getViewConfig(multiplier: number, risk: Risk): { texture: string; color: number } {
    if (multiplier < 1) {
        return {
            texture: 'box3',
            color: 0x05ffd2,
        };
    }

    if (multiplier > riskConditions[risk]) {
        return {
            texture: 'box1',
            color: 0xff48d8,
        };
    }

    return {
        texture: 'box2',
        color: 0xfffa7f,
    };
}

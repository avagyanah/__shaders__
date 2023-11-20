import type { b2Body, b2Contact } from '@box2d/core';
import { b2BodyType, b2ContactListener, b2EdgeShape, b2Vec2, type b2World } from '@box2d/core';
import { Container, Sprite } from 'pixi.js';
import { assets } from '../assets';
import { PS } from '../constants';
import { Ball } from './ball';
import { Pin } from './pin';

const rows = 8;
const skip = 1;
const gapY = 71.6;
const gapX = 78.8;

const paths: any = {
    //
};

export class Board extends Container {
    private static _world: b2World;

    private readonly _pins: Pin[];
    private readonly _balls: Ball[];
    private readonly _ground: b2Body;
    private readonly _field: Sprite;

    public constructor() {
        super();

        this._pins = [];
        this._balls = [];
        // this._ground = this._createGround();
        // this._field = this._createField();
    }

    public static setup(world: b2World): void {
        Board._world = world;

        Ball.setup(Board._world);
        Pin.setup(Board._world);

        const listener = new b2ContactListener();

        const path = [];

        listener.BeginContact = function (contact: b2Contact) {
            const ball = contact.GetFixtureA().GetBody();
            const pin = contact.GetFixtureA().GetBody();

            const pinData = pin.GetUserData();
            // if (pinData.id === 3) {

            // }

            // console.warn(contact.GetFixtureA().GetBody(), contact.GetFixtureB().GetBody());
        };

        this._world.SetContactListener(listener);
    }

    public update(): void {
        this._balls.forEach((ball) => ball.update());
    }

    public createBall(): void {
        const ball = new Ball();
        ball.setTransformXY(1.7117524, -gapY, 0);

        this.addChild(ball.view);
        this._balls.push(ball);
    }

    public setRows(): void {
        this._reset();
        this._init();
    }

    private _init(): void {
        for (let i = skip; i <= rows - 1; i++) {
            for (let j = 0; j <= i; j++) {
                const x = j * gapX - (i / 2) * gapX;
                const y = (i - skip) * gapY;

                const pin = new Pin(this._pins.length);
                pin.setTransformXY(x, y, 0);

                this.addChild(pin.view);
                this._pins.push(pin);
            }
        }
    }

    private _createGround(): b2Body {
        const w = ((rows * gapX) / PS) * 3;
        const x = -w / 2;
        const y = -((rows - skip) * gapY) / PS;

        const ground = Board._world.CreateBody({
            type: b2BodyType.b2_staticBody,
            position: { x, y },
        });

        const shape = new b2EdgeShape();
        shape.SetTwoSided(new b2Vec2(0, 0), new b2Vec2(w, 0));
        ground.CreateFixture({ shape, isSensor: true });

        return ground;
    }

    private _createField(): Sprite {
        const field = Sprite.from(assets.images.field2);
        field.anchor.set(0.5);
        field.position.set(1, 179);
        this.addChild(field);

        return field;
    }

    private _reset(): void {
        //
    }
}

import type { b2World } from '@box2d/core';
import { b2BodyType, b2CircleShape, type b2Body } from '@box2d/core';
import type { Texture } from 'pixi.js';
import { Graphics, Sprite } from 'pixi.js';
import { PS } from '../constants';

const radius = 0.4;
const ballGR = new Graphics()
    .beginFill(0xffff00, 1)
    .drawCircle(0, 0, radius * PS)
    .endFill();

export class Ball {
    private static _texture: Texture;
    private static _world: b2World;

    public readonly body: b2Body;
    public readonly view: Sprite;

    public constructor() {
        this.view = this._createView();
        this.body = this._createBody();

        this.view.visible = false;
    }

    public static setup(world: b2World): void {
        Ball._world = world;
        Ball._texture = window.globals.pixiApp.renderer.generateTexture(ballGR, { height: 100, width: 100 });
    }

    public setTransformXY(x: number, y: number, rotation: number): void {
        this.body.SetTransformXY(x / PS, -y / PS, rotation);
        this.update();
    }

    public update(): void {
        const pos = this.body.GetPosition();
        const rot = this.body.GetAngle();

        this.view.position.set(pos.x * PS, -pos.y * PS);
        this.view.rotation = rot;
    }

    private _createView(): Sprite {
        const view = Sprite.from(Ball._texture);
        view.anchor.set(0.5);

        return view;
    }

    private _createBody(): b2Body {
        const body = Ball._world.CreateBody({
            type: b2BodyType.b2_dynamicBody,
            gravityScale: 2,
        });

        const shape = new b2CircleShape(radius);
        body.CreateFixture({ shape, density: 1, friction: 0.0, restitution: 0.5 });

        return body;
    }
}

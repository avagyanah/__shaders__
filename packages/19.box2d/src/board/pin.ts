import type { b2Body, b2World } from '@box2d/core';
import { b2BodyType, b2CircleShape } from '@box2d/core';
import type { Texture } from 'pixi.js';
import { Graphics, Sprite } from 'pixi.js';
import { PS } from '../constants';

const radius = 0.35;
const pinGR = new Graphics()
    .beginFill(0xffffff, 1)
    .drawCircle(0, 0, radius * PS)
    .endFill();

export class Pin {
    private static _texture: Texture;
    private static _world: b2World;

    public readonly id: number;
    public readonly body: b2Body;
    public readonly view: Sprite;

    public constructor(id: number) {
        this.id = id;
        this.view = this._createView();
        this.body = this._createBody();

        this.view.visible = false;
    }

    public static setup(world: b2World): void {
        Pin._world = world;
        Pin._texture = window.globals.pixiApp.renderer.generateTexture(pinGR, { height: 100, width: 100 });
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
        const view = Sprite.from(Pin._texture);
        view.anchor.set(0.5);

        return view;
    }

    private _createBody(): b2Body {
        const body = Pin._world.CreateBody({
            type: b2BodyType.b2_staticBody,
            userData: { id: this.id },
        });

        const shape = new b2CircleShape(radius);
        body.CreateFixture({ shape });

        return body;
    }
}

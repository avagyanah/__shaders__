import type { b2Body, b2Contact, b2StepConfig } from '@box2d/core';
import { b2ContactListener, b2World } from '@box2d/core';
import type { Graphics } from 'pixi.js';
import { PHYS_SCALE, PHYS_STEP } from '../constants';
import { Box2dDraw } from './testbed';

let ball: b2Body;
let record = false;

window['path'] = [];

export class Phys {
    public static world: b2World;
    public static draw: Box2dDraw;
    public static stepConfig: b2StepConfig;

    public constructor() {
        //
    }

    public static onBallAdded(ballBody: b2Body): void {
        ball = ballBody;
        record = true;
    }

    public static setup(gr: Graphics): void {
        Phys.world = b2World.Create({ x: 0.0, y: -10.0 });
        Phys.stepConfig = { positionIterations: 4, velocityIterations: 2 };

        Phys.draw = new Box2dDraw();
        Phys.draw.Prepare(gr, PHYS_SCALE, 2);

        const contactListener = new b2ContactListener();

        contactListener.BeginContact = (e: b2Contact) => {
            // contactListener.EndContact = (e: b2Contact) => {
            const pinFixture = e.GetFixtureA();
            const pinData = pinFixture.GetUserData();

            switch (pinData.id) {
                // case 0:
                //     record = true;
                //     break;
                case 4:
                    record = false;
                    // ball.SetLinearVelocity({ x: 0, y: 0 });
                    Phys.record(ball);
                    break;
            }
        };

        Phys.world.SetContactListener(contactListener);
    }

    public static update(): void {
        if (record) {
            Phys.record(ball);
        }

        Phys.world.Step(PHYS_STEP, Phys.stepConfig);
        Phys.world.Step(PHYS_STEP, Phys.stepConfig);
        Phys.world.Step(PHYS_STEP, Phys.stepConfig);
        Phys.draw.Update(Phys.world);
    }

    public static record(ball: b2Body): void {
        const pos = ball.GetPosition();
        const angle = ball.GetAngle();

        const x = +(pos.x * PHYS_SCALE).toFixed(1);
        const y = -(pos.y * PHYS_SCALE).toFixed(1);
        const r = -angle.toFixed(1);

        window['path'].push(x, y, r);
    }
}

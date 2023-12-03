import type { b2Body, b2Contact, b2StepConfig } from '@box2d/core';
import { b2ContactListener, b2World } from '@box2d/core';
import { type Graphics } from 'pixi.js';
import { PHYS_SCALE, PHYS_STEP } from '../constants';
import { Box2dDraw } from './testbed';

let ball: b2Body;
let record = false;
let offsetX = 0;
let offsetY = 0;
let step = PHYS_STEP * 1;
let impulsed = false;

window['path'] = [];

export class Phys {
    public static world: b2World;
    public static draw: Box2dDraw;
    public static stepConfig: b2StepConfig;

    public constructor() {
        //
    }

    public static onBallAdded(ballBody: b2Body, padY: number, padX: number): void {
        ball = ballBody;
        offsetY = padY;
        offsetX = padX;

        /* path1 */
        // record = true;
        // ball.ApplyLinearImpulseToCenter({ x: 0.925, y: 0 });
        // ball.GetFixtureList().SetRestitution(0.6);

        // step = 0;
    }

    public static setup(gr: Graphics): void {
        Phys.world = b2World.Create({ x: 0.0, y: -10 });
        Phys.stepConfig = { positionIterations: 10, velocityIterations: 10 };

        Phys.draw = new Box2dDraw();
        Phys.draw.Prepare(gr, PHYS_SCALE, 2);

        const contactListener = new b2ContactListener();

        // contactListener.EndContact = (e: b2Contact) => {
        contactListener.BeginContact = (e: b2Contact) => {
            const pinFixture = e.GetFixtureA();
            const pinData = pinFixture.GetUserData();

            switch (pinData.id) {
                case 4:
                    if (!impulsed) {
                        Phys.world.Step(step, { positionIterations: 1, velocityIterations: 0 });

                        impulsed = true;
                        record = true;

                        // CENTER => CENTER
                        {
                            /* rest: 0.5  (p_cc) */
                            // {
                            //     ball.ApplyLinearImpulseToCenter({ x: 7.34, y: -3 });
                            // }
                        }

                        // CENTER => OUT
                        {
                            /* rest: 0.5  (p_co) */
                            // {
                            //     ball.ApplyLinearImpulseToCenter({ x: 2.788, y: -1 });
                            // }
                        }

                        // CENTER => IN
                        {
                            /* rest: 0.5  (p_ci) */
                            // {
                            //     ball.ApplyLinearImpulseToCenter({ x: 6, y: -3 });
                            //     setTimeout(() => {
                            //         ball.ApplyLinearImpulseToCenter({ x: -0.8, y: 0 });
                            //     }, 180);
                            // }
                        }

                        // OUT => CENTER
                        {
                            /* rest: 0.5  (p_oc) */
                            // ball.ApplyLinearImpulseToCenter({ x: -3.47, y: -2.5 });
                        }

                        // OUT => OUT
                        {
                            /* rest: 0.5  (p_oo) */
                            // ball.ApplyLinearImpulseToCenter({ x: -5.155, y: -3 });
                        }

                        // OUT => IN
                        {
                            /* rest: 0.5  (p_oi) */
                            // ball.ApplyLinearImpulseToCenter({ x: -1.96, y: -2 });
                        }
                    }
                    break;

                case 8:
                    record = false;
                    Phys.world.Step(step, { positionIterations: 1, velocityIterations: 0 });
                    Phys.record(ball);
                    step = 0;

                    console.warn(window['path'][window['path'].length - 3]);

                    break;
            }
        };

        Phys.world.SetContactListener(contactListener);
    }

    public static update(): void {
        if (record) {
            Phys.record(ball);
        }

        Phys.world.Step(step, Phys.stepConfig);
        Phys.world.Step(step, Phys.stepConfig);
        Phys.world.Step(step, Phys.stepConfig);
        Phys.world.Step(step, Phys.stepConfig);
        Phys.draw.Update(Phys.world);
    }

    public static record(ball: b2Body): void {
        const pos = ball.GetPosition();
        const angle = ball.GetAngle();

        const x = +(pos.x * PHYS_SCALE - offsetX).toFixed(1);
        const y = -(pos.y * PHYS_SCALE + offsetY).toFixed(1);
        const r = -angle.toFixed(1);

        window['path'].push(x, y, r);
    }
}

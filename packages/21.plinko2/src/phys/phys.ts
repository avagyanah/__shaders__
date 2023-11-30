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
        ball.ApplyLinearImpulseToCenter({ x: 0.925, y: 0 });

        // step = 0;
    }

    public static setup(gr: Graphics): void {
        Phys.world = b2World.Create({ x: 0.0, y: -9.8 });
        Phys.stepConfig = { positionIterations: 10, velocityIterations: 10 };

        Phys.draw = new Box2dDraw();
        Phys.draw.Prepare(gr, PHYS_SCALE, 2);

        const contactListener = new b2ContactListener();

        // contactListener.BeginContact = (e: b2Contact) => {
        contactListener.BeginContact = (e: b2Contact) => {
            const pinFixture = e.GetFixtureA();
            const pinData = pinFixture.GetUserData();

            switch (pinData.id) {
                case 4:
                    if (!impulsed) {
                        impulsed = true;
                        record = true;

                        // CENTER => CENTER
                        {
                            /* c => c, rest: 0.5  (p_cc1) */
                            // ball.ApplyLinearImpulseToCenter({ x: 8.72, y: -4 });
                            //
                            /* c => c, rest: 0.5  (p_cc2)*/
                            // ball.ApplyLinearImpulseToCenter({ x: 0.98, y: 2 });
                        }

                        // CENTER => RIGHT
                        {
                            /* c => r, rest: 0.5  (p_cr1) */
                            // ball.ApplyLinearImpulseToCenter({ x: 2.956, y: -1 });
                            //
                            /* c => l, rest: 0.4  (p_cr2) */
                            // ball.ApplyLinearImpulseToCenter({ x: 3, y: 2 });
                        }

                        // CENTER => LEFT
                        {
                            /* c => l, rest: 0.4  (p_cl1) */
                            // ball.ApplyLinearImpulseToCenter({ x: 3, y: 2 });
                            // setTimeout(() => {
                            //     setInterval(() => {
                            //         ball.ApplyLinearImpulseToCenter({ x: -0.106, y: 0 });
                            //     });
                            // }, 200);
                            //
                            /* c => l, rest: 0.6  (p_cl2) */
                            // ball.ApplyLinearImpulseToCenter({ x: 3, y: 2 });
                            // setTimeout(() => {
                            //     setInterval(() => {
                            //         ball.ApplyLinearImpulseToCenter({ x: -0.11, y: 0 });
                            //     });
                            // }, 200);
                        }

                        // RIGHT => CENTER
                        {
                            /* r => c, rest: 0.4  (p_rc1) */
                            // ball.ApplyLinearImpulseToCenter({ x: 1.745, y: -21 });
                            //
                            /* r => c, rest: 0.5  (p_rc2)*/
                            // ball.ApplyLinearImpulseToCenter({ x: 0, y: -10.6 });
                            //
                            /* r => c, rest: 0.6  (p_rc3)*/
                            // ball.ApplyLinearImpulseToCenter({ x: 6.02, y: -4 });
                        }

                        // RIGHT => RIGHT
                        {
                            /* r => r, rest: 0.4  (p_rr1)*/
                            // ball.ApplyLinearImpulseToCenter({ x: 6, y: -7.2 });
                            //
                            /* r => r, rest: 0.6  (p_rr2)*/
                            // ball.ApplyLinearImpulseToCenter({ x: 8, y: -3.1 });
                        }

                        // RIGHT => LEFT
                        {
                            /* r => l, rest: 0.6  (p_rl1)*/
                            // ball.ApplyLinearImpulseToCenter({ x: 4, y: -6.47 });
                            //
                            /* r => l, rest: 0.6  (p_rl2)*/
                            // ball.ApplyLinearImpulseToCenter({ x: 5, y: -6.84 });
                        }
                    }
                    break;

                case 8:
                    Phys.record(ball);
                    record = false;
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

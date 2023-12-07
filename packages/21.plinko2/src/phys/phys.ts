import type { b2Body, b2Contact, b2StepConfig } from '@box2d/core';
import { b2ContactListener, b2World } from '@box2d/core';
import { type Graphics } from 'pixi.js';
import { PHYS_SCALE } from '../constants';
import { Box2dDraw } from './testbed';

let ball: b2Body;
let record = false;
let offsetX = 0;
let offsetY = 0;
// let step = PHYS_STEP * 1;
let step = 1 / 14;
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

            if (impulsed) {
                switch (pinData.id) {
                    case 4:
                        this.recordCollision({ row: { '1': -1, '-1': -1 }, col: { '1': -1, '-1': -0 } });
                        break;
                    case 5:
                        this.recordCollision({ row: { '1': -1, '-1': -1 }, col: { '1': 0, '-1': -1 } });
                        break;
                    case 8:
                        this.recordCollision({ row: { '1': 0, '-1': 0 }, col: { '1': 0, '-1': 0 } });
                        break;
                }
            }

            switch (pinData.id) {
                case 4:
                    if (!impulsed) {
                        impulsed = true;
                        record = true;
                        Phys.world.Step(0, { positionIterations: 1, velocityIterations: 0 });

                        // CENTER
                        {
                            /* C => C */
                            {
                                /* rest: 0.5  (p_cc1) */
                                // ball.ApplyLinearImpulseToCenter({ x: 1.8, y: 0.3 });
                                //
                                /* rest: 0.5  (p_cc2) */
                                // ball.ApplyLinearImpulseToCenter({ x: 0.995, y: 0.7 });
                                //
                                /* rest: 0.4  (p_cc2) */
                                // ball.ApplyLinearImpulseToCenter({ x: 9.02, y: -0.4 });
                            }

                            /* C => I */
                            {
                                /* rest: 0.5  (p_ci1) */
                                // ball.ApplyLinearImpulseToCenter({ x: 5.93, y: -1.5 });
                                //
                                /* rest: 0.4  (p_ci2) */
                                // ball.ApplyLinearImpulseToCenter({ x: 1, y: 0 });
                                // setTimeout(() => {
                                //     setInterval(() => {
                                //         ball.ApplyForceToCenter({ x: -1.3, y: 0 });
                                //     });
                                // }, 400);
                            }

                            //
                            //
                            //
                            //
                            //
                            //
                            // CC
                            /* rest: 0.5  (p_cc) */
                            {
                                // ball.ApplyLinearImpulseToCenter({ x: 5.93, y: -1.5 });
                            }

                            // CO
                            /* rest: 0.5  (p_co) */
                            {
                                // ball.ApplyLinearImpulseToCenter({ x: 2.795, y: -1.7 });
                            }

                            // CI
                            /* rest: 0.5  (p_ci) */
                            // {
                            //     ball.ApplyLinearImpulseToCenter({ x: 7, y: -2 });
                            //     setTimeout(() => {
                            //         ball.ApplyLinearImpulseToCenter({ x: -0.79, y: 0 });
                            //     }, 180);
                            // }

                            // OC
                            {
                                /* rest: 0.5  (p_oc) */
                                // ball.ApplyLinearImpulseToCenter({ x: 0, y: -2.405 });
                            }

                            // OO
                            {
                                /* rest: 0.5  (p_oo) */
                                // ball.ApplyLinearImpulseToCenter({ x: 2, y: -4.8 });
                                // setTimeout(() => {
                                //     ball.ApplyLinearImpulseToCenter({ x: 2.16, y: 0 });
                                // }, 710);
                            }

                            // OI
                            {
                                /* rest: 0.5  (p_oi) */
                                // ball.ApplyLinearImpulseToCenter({ x: 1.18, y: -2 });
                            }
                        }
                    }
                    break;

                case 5:
                    Phys.world.Step(0, { positionIterations: 1, velocityIterations: 0 });
                    break;

                case 8:
                    Phys.world.Step(0, { positionIterations: 1, velocityIterations: 0 });
                    record = false;
                    step = 0;
                    Phys.recordTransform(ball);

                    console.warn(window['path'][window['path'].length - 1][0]);

                    break;
            }
        };

        Phys.world.SetContactListener(contactListener);
    }

    public static update(): void {
        if (record) {
            Phys.recordTransform(ball);
        }

        Phys.world.Step(step, Phys.stepConfig);
        Phys.draw.Update(Phys.world);
    }

    public static recordTransform(ball: b2Body): void {
        const pos = ball.GetPosition();
        const angle = ball.GetAngle();

        const x = +(pos.x * PHYS_SCALE - offsetX).toFixed(1);
        const y = -(pos.y * PHYS_SCALE + offsetY).toFixed(1);
        const r = -angle.toFixed(1);

        window['path'].push([x, y, r]);
    }

    public static recordCollision(value: {
        row: { '1': number; '-1': number };
        col: { '1': number; '-1': number };
    }): void {
        window['path'].push(value);
    }
}

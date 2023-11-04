import TWEEN, { Tween } from '@tweenjs/tween.js';
import { Graphics } from 'pixi.js';
import { PixiApp } from '../../../shared/pixi';

window.addEventListener('load', () => {
    window.globals = { pixiApp: new App() };
    window.globals.pixiApp.init();
});

class Ball extends Graphics {
    public constructor(position: { x: number; y: number }, radius: number) {
        super();

        this.beginFill(0xffffff, 1);
        this.drawCircle(0, 0, radius);
        this.endFill();

        this.position.copyFrom(position);
    }
}

class Pin extends Graphics {
    public constructor(position: { x: number; y: number }, radius: number) {
        super();

        this.beginFill(0x00ff00, 1);
        this.drawCircle(0, 0, radius);
        this.endFill();

        this.position.copyFrom(position);
    }
}

class App extends PixiApp {
    public ball: Ball;
    public pins: Pin[] = [];

    public init(): void {
        const { innerWidth: w, innerHeight: h } = window;

        /* BALL */
        const radius = 8;
        this.ball = new Ball({ x: 0, y: 0 }, radius);
        this.stage.addChild(this.ball);

        /* PINS */
        const rows = 10;
        const cols = 19;
        const padX = 40;
        const padY = 40;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const dx = i % 2 === 0 ? 0 : padX / 2;
                const dy = 0;
                const offsetX = (w - (cols - 1) * padX) / 2 - dx;
                const offsetY = h - (rows - 1) * padY - dy;

                const x = j * padX + offsetX;
                const y = i * padY + offsetY;

                const pin = new Pin({ x, y }, radius);
                this.stage.addChild(pin);

                this.pins.push(pin);
            }
        }

        const p1 = this.pins[10].position;
        this.ball.position.set(p1.x, p1.y - 2 * radius);

        this.ticker.maxFPS = 70;

        // more about Projectile motion => https://en.m.wikipedia.org/wiki/Projectile_motion
        const freeFallTrajectoryY = (height: number, bouncePercent: number, g: number, length: number): number[] => {
            const points = [];

            const maxH = height * bouncePercent;
            const v0 = Math.sqrt(maxH * 2 * Math.abs(g));

            const t1 = Math.sqrt((2 * maxH) / g);
            const t2 = Math.sqrt((2 * (height + maxH)) / g);
            const t = t1 + t2;

            for (let i = 1; i <= length; i += 1) {
                const dt = i / length;
                const dy = v0 * (dt * t) - 0.5 * (g * Math.pow(dt * t, 2));

                points.push(-dy);
            }

            return points;
        };

        const bounce = 0.1;
        const height = padY;
        const duration = 0.4;
        const length = duration * 60; // FPS

        const pp = freeFallTrajectoryY(height, bounce, 9.8, length).map((el) => {
            return Math.sign(el) === 1 ? `+${Math.abs(el)}` : `-${Math.abs(el)}`;
        });

        const tw = new Tween(this.ball, false);
        tw.to({ y: pp, x: [`${Math.random() < 0.5 ? '+' : '-'}${padX / 2}`] }, duration * 1000);
        tw.onComplete(() => {
            setTimeout(() => {
                TWEEN.add(tw);
                tw.to({ y: pp, x: [`${Math.random() < 0.5 ? '+' : '-'}${padX / 2}`] }, duration * 1000);
                tw.start();
            }, 20);
        });

        setTimeout(() => {
            tw.start();
            TWEEN.add(tw);
        }, 600);

        /* UPDATE */
        this.ticker.add(() => {
            TWEEN.update();
        });

        /* RESIZE */
        this.renderer.on('resize', this._onResize, this);
        this._onResize();
    }

    private _onResize(): void {
        //
    }
}

// function getCubicBezierXYatT(startPt, controlPt1, controlPt2, endPt, T) {
//     var x = CubicN(T, startPt.x, controlPt1.x, controlPt2.x, endPt.x);
//     var y = CubicN(T, startPt.y, controlPt1.y, controlPt2.y, endPt.y);
//     return { x: x, y: y };
// }

// // cubic helper formula at T distance
// function CubicN(pct, a, b, c, d) {
//     var t2 = pct * pct;
//     var t3 = t2 * pct;
//     return (
//         a +
//         (-a * 3 + pct * (3 * a - a * pct)) * pct +
//         (3 * b + pct * (-6 * b + b * 3 * pct)) * pct +
//         (c * 3 - c * 3 * pct) * t2 +
//         d * t3
//     );
// }

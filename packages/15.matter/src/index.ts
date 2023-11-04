import Matter from 'matter-js';
import { PixiApp } from '../../../shared/pixi';

window.addEventListener('load', () => {
    window.globals = { pixiApp: new App() };
    window.globals.pixiApp.init();
});

class Wall {
    public body: Matter.Body;

    public constructor(position: { x: number; y: number }, dimension: { width: number; height: number }) {
        this.body = Matter.Bodies.rectangle(position.x, position.y, dimension.width, dimension.height, {
            isStatic: true,
        });
    }

    public update(): void {
        //
    }
}

class Ball {
    public body: Matter.Body;

    public constructor(position: { x: number; y: number }, radius: number) {
        this.body = Matter.Bodies.circle(position.x, position.y, radius, {
            isStatic: false,
            friction: 0,
            // frictionStatic: 0,
            restitution: 0,
            frictionAir: 0,
            angularSpeed: 0,
            angularVelocity: 0,
            // density: 1,
            // mass: 1,
            // inertia: 0,
            // slop: 0,
            // velocity: { x: 0, y: 0 },
        });
    }

    public update(): void {
        //
    }
}

class Pin {
    public body: Matter.Body;

    public constructor(position: { x: number; y: number }, radius: number) {
        this.body = Matter.Bodies.circle(position.x, position.y, radius, {
            isStatic: true,
            friction: 0,
            restitution: 0,
        });
    }

    public update(): void {
        //
    }
}

class App extends PixiApp {
    public engine!: Matter.Engine;
    public ground!: Wall;
    public ball!: Ball;
    public pins!: Pin[];

    public init(): void {
        const { innerWidth: w, innerHeight: h } = window;

        /* MATTER (engine, runner, render) */
        const runner = Matter.Runner.create();
        const engine = Matter.Engine.create({
            // gravity: { x: 0, y: 1, scale: 0.001 },
        });

        const render = Matter.Render.create({
            element: document.body,
            engine: engine,
            options: {
                width: document.body.clientWidth,
                height: document.body.clientHeight,
                // showAngleIndicator: true,
                // wireframeBackground: '#343434',
                // wireframes: true,
                // showCollisions: true,
                // showStats: true,
                // showBounds: true,
            },
        });

        Matter.Render.run(render);
        Matter.Runner.run(runner, engine);

        /* GROUND */
        this.ground = new Wall({ x: w / 2, y: h - 100 }, { width: w, height: 20 });
        Matter.World.addBody(engine.world, this.ground.body);

        /* PINS */
        this.pins = [];

        const rows = 4;
        const cols = 4;
        const padX = 70;
        const padY = 150;
        // const x = (w - cols * padX + padX) / 2;
        // const y = h - 120 - rows * padY;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                // const offsetX = i % 2 === 0 ? 0 : padX / 2;
                // const pin = new Pin({ x: j * padX + x + offsetX, y: i * padY + y }, 8);
                const dx = i % 2 === 0 ? 0 : padX / 2;
                const pin = new Pin({ x: j * padX + dx + 100, y: i * padY + 100 }, 8);
                Matter.World.addBody(engine.world, pin.body);

                this.pins.push(pin);
            }
        }

        /* BALL */
        const pos = this.pins[0].body.position;
        // this.ball = new Ball({ x: w / 2, y: 202 }, 8);
        this.ball = new Ball({ x: pos.x, y: pos.y - 16 }, 8);
        Matter.World.addBody(engine.world, this.ball.body);
        // this.ball.body.isStatic = true;

        // setTimeout(() => {
        // const vel = calculateVelocity(this.ball.body, padX / 2, padY / 2, 1);
        Matter.Body.setVelocity(this.ball.body, { x: 1.65, y: -3 });
        // }, 600);
        const y = this.ball.body.position.y;

        setInterval(() => {
            if (this.ball.body.isStatic) {
                return;
            }
            console.log(this.ball.body.position.y - y);
        }, 40);
        // this.ticker.add(() => {
        // });
        Matter.Events.on(engine, 'collisionStart', (e: any) => {
            this.ball.body.isStatic = true;
            return;
            // const vel = calculateVelocity(this.ball.body, padX / 2, padY, Math.random() < 0.5 ? 1 : -1);
            const vel = calculateVelocity(this.ball.body, padX / 2, padY / 2, 1);
            Matter.Body.setSpeed(this.ball.body, 0);
            Matter.Body.setVelocity(this.ball.body, { x: 0, y: 0 });
            Matter.Body.setVelocity(this.ball.body, { x: vel.x, y: 0 });
            // e.pairs[0].bodyA.isSensor = true;

            // Matter.Body.setVelocity(this.ball.body, { x: 0, y: 0 });
            this.ball.body.isStatic = false;
        });

        /* UPDATE */
        this.ticker.add(() => {
            this.ground.update();
            this.ball.update();
            this.pins.forEach((p) => p.update());
        });

        /* RESIZE */
        this.renderer.on('resize', this._onResize, this);
        this._onResize();
    }

    private _onResize(): void {
        //
    }
}

const calculateVelocity = (body: Matter.Body, width: number, height: number, sign: 1 | -1): any => {
    const t = Math.sqrt((2 * height) / 0.1);

    const vx = width / t;

    return { x: vx * sign, y: 0 };
};

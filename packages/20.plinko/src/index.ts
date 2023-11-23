import TWEEN from '@tweenjs/tween.js';
import Matter from 'matter-js';
import { PixiApp } from '../../../shared/pixi';
import { getElementById } from '../../../shared/utils';
import { Board } from './board/board';

window.addEventListener('load', () => {
    window.globals = { pixiApp: new App() };
    window.globals.pixiApp.init();
});

class App extends PixiApp {
    private _engine!: Matter.Engine;
    private _board!: Board;

    public init(): void {
        const runner = Matter.Runner.create();
        const engine = Matter.Engine.create({
            gravity: { x: 0, y: 1, scale: 0.001 },
        });

        const div = <HTMLCanvasElement>getElementById('game_div');
        const render = Matter.Render.create({
            element: div,
            engine: engine,
            options: {
                width: div.clientWidth,
                height: div.clientHeight,
                // showStats: true,
            },
        });

        // Matter.Render.run(render);
        // Matter.Runner.run(runner, engine);

        const { width, height } = this.screen;

        /* _____________ BOARD _____________ */
        const multipliers: Record<Risk, Record<number, number[]>> = {
            LOW: {
                8: [6, 2.1, 1.1, 0.93, 0.46, 0.93, 1.1, 2.1, 6],
                9: [7, 2, 1.6, 0.94, 0.65, 0.65, 0.94, 1.6, 2, 7],
                10: [9, 3, 1.4, 1.1, 0.92, 0.47, 0.92, 1.1, 1.4, 3, 9],
                11: [9, 3, 1.9, 1.3, 0.93, 0.66, 0.66, 0.93, 1.3, 1.9, 3, 9],
                12: [11, 3, 1.6, 1.4, 1.1, 0.92, 0.46, 0.92, 1.1, 1.4, 1.6, 3, 11],
                13: [22, 4, 3, 1.9, 1.2, 0.83, 0.65, 0.65, 0.83, 1.2, 1.9, 3, 4, 22],
                14: [22, 4, 1.9, 1.4, 1.3, 1.1, 0.91, 0.46, 0.91, 1.1, 1.3, 1.4, 1.9, 4, 22],
                15: [38, 8, 3, 2, 1.5, 1.1, 0.93, 0.65, 0.65, 0.93, 1.1, 1.5, 2, 3, 8, 38],
                16: [71, 9, 2, 1.4, 1.4, 1.2, 1.1, 0.91, 0.45, 0.91, 1.1, 1.2, 1.4, 1.4, 2, 9, 71],
            },
            MEDIUM: {
                8: [13, 3, 1.3, 0.63, 0.37, 0.63, 1.3, 3, 13],
                9: [18, 4, 1.7, 0.83, 0.46, 0.46, 0.83, 1.7, 4, 18],
                10: [23, 5, 2, 1.4, 0.53, 0.35, 0.53, 1.4, 2, 5, 23],
                11: [25, 6, 3, 1.8, 0.63, 0.46, 0.46, 0.63, 1.8, 3, 6, 25],
                12: [34, 11, 4, 2, 1.1, 0.52, 0.26, 0.52, 1.1, 2, 4, 11, 34],
                13: [53, 13, 6, 3, 1.3, 0.62, 0.36, 0.36, 0.62, 1.3, 3, 6, 13, 53],
                14: [73, 15, 7, 4, 1.9, 1, 0.41, 0.16, 0.41, 1, 1.9, 4, 7, 15, 73],
                15: [96, 18, 11, 5, 3, 1.3, 0.42, 0.26, 0.26, 0.42, 1.3, 3, 5, 11, 18, 96],
                16: [170, 41, 10, 5, 3, 1.5, 1, 0.41, 0.25, 0.41, 1, 1.5, 3, 5, 10, 41, 170],
            },
            HIGH: {
                8: [29, 4, 1.5, 0.23, 0.16, 0.23, 1.5, 4, 29],
                9: [44, 7, 2, 0.51, 0.17, 0.17, 0.51, 2, 7, 44],
                10: [77, 10, 3, 0.9, 0.22, 0.16, 0.22, 0.9, 3, 10, 77],
                11: [123, 14, 5.2, 1.4, 0.32, 0.16, 0.16, 0.32, 1.4, 5.2, 14, 123],
                12: [174, 24, 8.1, 2, 0.7, 0.13, 0.13, 0.13, 0.7, 2, 8.1, 24, 174],
                13: [274, 37, 11, 4, 1, 0.14, 0.14, 0.14, 0.14, 1, 4, 11, 37, 274],
                14: [429, 56, 18, 5, 1.9, 0.3, 0.13, 0.13, 0.13, 0.3, 1.9, 5, 18, 56, 429],
                15: [643, 83, 27, 8, 3, 0.5, 0.14, 0.14, 0.14, 0.14, 0.5, 3, 8, 27, 83, 643],
                16: [1030, 130, 26, 9, 4, 2, 0.2, 0.12, 0.14, 0.12, 0.2, 2, 4, 9, 26, 130, 1030],
            },
        };

        const risk: Risk = 'HIGH';

        Board.setupEngine(engine);
        Board.setupRisk(risk);
        Board.setupMultipliers(multipliers[risk]);

        this._board = new Board();
        this._board.position.set(width * 0.5, height * 0.04);
        this._board.initRows(8);
        this._board.initRows(12);
        this._board.initRows(16);
        this._board.scale.set(0.4);
        this.stage.addChild(this._board);

        setTimeout(() => {
            this._board.addBall();
        }, 400);

        // let vector = 1;
        // let rows = 8;
        // setInterval(() => {
        //     rows += vector;

        //     this._board.initRows(rows);

        //     if (rows === 16 || rows === 8) {
        //         vector *= -1;
        //     }
        // }, 200);
        /* ______________________________ */

        // document.onkeyup = (ev) => {
        //     switch (ev.key) {
        //         case ' ':
        //             this._board.createBall();
        //             break;
        //         default:
        //             break;
        //     }
        // };

        // document.onclick = () => {
        //     this._board.createBall();

        //     document.onclick = () => {
        //         //
        //     };
        // };

        /* UPDATE */
        // this.ticker.maxFPS = 30;
        this.ticker.add(() => {
            // Matter.Runner.tick(runner, engine, 1 / 60);
            // this._world.Step(1 / 40, {
            //     positionIterations: 1,
            //     velocityIterations: 1,
            // });

            TWEEN.update();
            this._board.update();
        });

        /* RESIZE */
        this.renderer.on('resize', this._onResize, this);
        this._onResize();
    }

    private _onResize(): void {
        //
    }
}

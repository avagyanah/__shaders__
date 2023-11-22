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
        Board.setup(engine);

        this._board = new Board();
        this._board.position.set(width * 0.5, height * 0.05);
        this._board.initRows(8);
        this._board.initRows(12);
        this._board.initRows(16);
        this._board.scale.set(0.41);
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

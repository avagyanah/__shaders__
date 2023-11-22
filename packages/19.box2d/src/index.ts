import { b2World } from '@box2d/core';
import { Graphics } from 'pixi.js';
import { PixiApp } from '../../../shared/pixi';
import { Board } from './board/board';
import { PS } from './constants';
import { Box2dDraw } from './testbed';

window.addEventListener('load', () => {
    window.globals = { pixiApp: new App() };
    window.globals.pixiApp.init();
});

class App extends PixiApp {
    private _world: b2World;
    private _debugDraw: Box2dDraw;
    private _board: Board;

    public init(): void {
        const { width, height } = this.screen;

        this._world = b2World.Create({ x: 0.0, y: -9.8 });

        /* _____________GAME_____________ */
        Board.setup(this._world);

        this._board = new Board();
        this._board.position.set(width * 0.5, height * 0.1);
        this._board.setRows();
        this._board.scale.set(0.5);

        setTimeout(() => {
            this._board.position.set(width * 0.5, height * 0.5 - this._board.height * 0.5 + 80);
        }, 30);

        this.stage.addChild(this._board);

        document.onkeyup = (ev) => {
            switch (ev.key) {
                case ' ':
                    this._board.createBall();
                    break;
                default:
                    break;
            }
        };

        // const listener = Object.assign(new JSContactListener(), {
        //     BeginContact: (contactPtr: number): void => {
        //         this._updateContactInfo(this._box2d.wrapPointer(contactPtr, this._box2d.b2Contact));

        //         physics2dEmitter.emit(Physics2dEvent.beginContact, contactInfo);
        //     },

        //     EndContact: (contactPtr: number): void => {
        //         this._updateContactInfo(this._box2d.wrapPointer(contactPtr, this._box2d.b2Contact));

        //         physics2dEmitter.emit(Physics2dEvent.endContact, contactInfo);
        //     },

        //     PreSolve: (_contactPtr: number, _oldManifold: Box2D.b2Manifold | number): void => {
        //         // this._updateContactInfo(this._box2d.wrapPointer(contactPtr, this._box2d.b2Contact));
        //         // physics2dEmitter.emit(Physics2dEvent.preSolve, contactInfo);
        //     },

        //     PostSolve: (_contactPtr: number, _impulse: Box2D.b2ContactImpulse | number): void => {
        //         // this._updateContactInfo(this._box2d.wrapPointer(contactPtr, this._box2d.b2Contact));
        //         physics2dEmitter.emit(Physics2dEvent.postSolve, contactInfo);
        //     },
        // });

        // this._world.SetContactListener(listener);

        // document.onclick = () => {
        //     this._board.createBall();

        //     document.onclick = () => {
        //         //
        //     };
        // };

        /* ______________________________ */

        const graphics = new Graphics();
        this._board.addChild(graphics);

        this._debugDraw = new Box2dDraw();
        this._debugDraw.Prepare(graphics, PS, 0.5, {
            shapes: true,
            joints: true,
            pairs: false,
            aabbs: false,
            massCenters: false,
            particles: false,
        });

        //
        //
        /* UPDATE */
        this.ticker.add(() => {
            this._world.Step(1 / 40, {
                positionIterations: 1,
                velocityIterations: 1,
            });
            // this._world.Step(1 / 60, {
            //     positionIterations: 1,
            //     velocityIterations: 1,
            // });

            this._debugDraw.Update(this._world);

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

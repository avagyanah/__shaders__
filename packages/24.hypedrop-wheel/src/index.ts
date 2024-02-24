import TWEEN from '@tweenjs/tween.js';
import { PixiApp } from '../../../shared/pixi';
import { WheelGameComponent } from '@ancientgaming/game-wheel-component';

window.addEventListener('load', async () => {
    window.globals = { pixiApp: new App() };
    await window.globals.pixiApp.init();
});

/* MATERIAL */
// const vertSrc = assets.shaders.default.vert;
// const fragSrc = assets.shaders.default.frag;

class App extends PixiApp {
    public async init(): Promise<void> {
        console.warn('mta');

        console.warn(WheelGameComponent);

        /* UPDATE */
        this.ticker.add(() => {
            TWEEN.update();
            //
        });

        /* RESIZE */
        this.renderer.on('resize', this._onResize, this);
        this._onResize();
    }

    private _onResize(): void {
        //
    }
}

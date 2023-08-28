import type { DisplayObject } from 'pixi.js';
import { Application } from 'pixi.js';
import { getElementById, getResolution } from './utils';

export abstract class PixiApp extends Application {
    public constructor() {
        super({
            sharedTicker: true,
            backgroundAlpha: 1,
            backgroundColor: 0x343434,
            resolution: getResolution(),
            view: <HTMLCanvasElement>getElementById('game_canvas'),
        });

        window.addEventListener('resize', this.resize);
        this.resize();
    }

    public resize = (): void => {
        const { innerWidth, innerHeight } = window;
        this.renderer.resize(innerWidth, innerHeight);
    };

    public abstract init(): void;
}

export function centralize(obj: DisplayObject): void {
    const { width, height } = window.globals.pixiApp.renderer.screen;

    obj.position.set(width / 2, height / 2);
}

import { Application } from 'pixi.js';
import { PixiStage } from './pixi-stage';
import { getElementById, getResolution } from './utils';

export class PixiApp extends Application {
    public declare stage: PixiStage;

    public constructor() {
        super({
            sharedTicker: true,
            backgroundAlpha: 1,
            backgroundColor: 0x343434,
            resolution: getResolution(),
            view: <HTMLCanvasElement>getElementById('game_canvas'),
        });

        this.stage = new PixiStage();

        window.addEventListener('orientationchange', this._resize);
        window.addEventListener('resize', this._resize);

        this._resize();
    }

    public init(): void {
        this.stage.init();
    }

    private _resize = (): void => {
        const { innerWidth, innerHeight } = window;

        this.renderer.resize(innerWidth, innerHeight);
    };
}

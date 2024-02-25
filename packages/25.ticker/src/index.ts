import { FPSPanel, Stats } from '@gameastic/stats';
import { Container, Graphics, Ticker, autoDetectRenderer, settings } from 'pixi.js';
import { getElementById, getResolution } from '../../../shared/utils';
import { Ticker as PhaserTicker } from './phaser/Ticker';

window.addEventListener('load', async () => {
    new App();
});

settings.PREFER_ENV = 2;

class App {
    public constructor() {
        const stats = new Stats({
            css: 'bottom:0;left:0;transform-origin:left top;cursor:pointer;opacity:0.9',
            renderStep: 500,
        });

        document.body.appendChild(stats.dom);

        stats.addPanel(new FPSPanel('FPS', '#0ff', '#002'));
        stats.dom.style.transform = `scale(${2})`;

        // stats.showPanel(0);

        const canvas = <HTMLCanvasElement>getElementById('game_canvas');

        const renderer = autoDetectRenderer({
            backgroundAlpha: 0,
            backgroundColor: 0xff0000,
            hello: true,
            antialias: true,
            view: canvas,
            resolution: getResolution(),
            clearBeforeRender: true,
        });

        const stage = new Container();

        Ticker.shared.autoStart = false;
        Ticker.shared.stop();

        Ticker.system.autoStart = false;
        Ticker.system.stop();

        const ticker = new PhaserTicker({
            target: 60,
            limit: 80,
            min: 60,
        });

        // let scaleMin = 0.2;
        // let scaleMax = 1.3;
        // let vector = -1;
        // let scale = 1;

        const view = new Graphics();
        view.beginFill(0xffffff, 1);
        view.drawRect(0, 0, 500, 500);
        stage.addChild(view);
        view.pivot.set(250, 250);
        // const view = Sprite.from(assets.images.bg);
        // view.anchor.set(0.5);
        // stage.addChild(view);

        ticker.start((elapsed, delta) => {
            view.rotation += 0.0012 * delta;

            Ticker.shared.update(elapsed);
            Ticker.system.update(elapsed);

            renderer.render(stage);

            stats.update();
        });

        const windowResize = (width, height): void => {
            renderer.resize(width, height);
            renderer.view.style.width = `${width}px`;
            renderer.view.style.height = `${height}px`;
        };

        const rendererResize = (): void => {
            const { width, height } = renderer.screen;

            view.position.set(width * 0.5, height * 0.5);
        };

        window.addEventListener('resize', () => {
            windowResize(window.innerWidth, window.innerHeight);
        });
        renderer.on('resize', rendererResize, this);

        windowResize(window.innerWidth, window.innerHeight);
    }
}

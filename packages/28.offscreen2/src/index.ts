import {
    Application,
    Color,
    Container,
    ICanvas,
    IRenderingContext,
    Renderer,
    Sprite,
    Texture,
    Ticker,
    autoDetectRenderer,
    settings,
} from 'pixi.js';
import { getElementById, getResolution } from '../../../shared/utils';
import { TimeStep } from './TimeStep';
import { FPSPanel, Stats } from '@gameastic/stats';

window.addEventListener('load', async () => {
    new App();
});

class App {
    #canvas: HTMLCanvasElement;
    #context: WebGL2RenderingContext | WebGLRenderingContext;

    public constructor() {
        const stats = new Stats({
            css: 'bottom:0;left:0;transform-origin:left top;cursor:pointer;opacity:0.9',
            renderStep: 500,
        });

        document.body.appendChild(stats.dom);

        stats.addPanel(new FPSPanel('FPS', '#0ff', '#002'));
        stats.dom.style.transform = `scale(${2})`;

        // const div = <HTMLCanvasElement>getElementById('game_div');
        const canvas = <HTMLCanvasElement>getElementById('game_canvas');

        const renderer = autoDetectRenderer<ICanvas>({
            hello: true,
            backgroundAlpha: 1,
            backgroundColor: 0x545454,
            view: canvas,
            resolution: getResolution(),
        });

        // Ticker.shared.autoStart = false;
        // Ticker.shared.stop();

        // const myWorker = new Worker(new URL('./worker.js', import.meta.url));
        // myWorker.postMessage('', []);
        // console.log('Message posted to worker');
        // console.warn(myWorker);

        // myWorker.onmessage = (e) => {
        //     const delta = e.data.delta;

        //     if (delta > 20) {
        //         console.log(delta);
        //     }

        //     // renderer.render(stage);
        //     // view.rotation += 0.0012 * delta;
        // };

        new TimeStep({
            limit: 40,
            target: 60,
            min: 30,
        }).start((elapsed, delta) => {
            view.rotation += 0.012;
            renderer.render(stage);
            stats.update();
        });
        const stage = new Container();

        // Ticker.shared.maxFPS = 70;
        // Ticker.shared.add(() => {
        //     view.rotation += 0.0012 * Ticker.shared.deltaMS;
        //     renderer.render(stage);
        // });

        const view = Sprite.from(Texture.WHITE);
        view.anchor.set(0.5);
        view.scale.set(30);
        stage.addChild(view);

        view.interactive = true;
        view.on('pointerdown', () => {
            console.warn('asd');
        });

        const windowResize = (width, height): void => {
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            renderer.resize(width, height);
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

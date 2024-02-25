import { FPSPanel, Stats } from '@gameastic/stats';
import { getElementById, getResolution } from '../../../shared/utils';
import { Assets, Container, Sprite, Texture, Ticker, autoDetectRenderer } from 'pixi.js';
import { assets } from './assets';
import { PhaserTimer } from '../PhaserTimer';

window.addEventListener('load', async () => {
    await new App().init();
});

class App {
    public constructor() {
        // const canvas = <HTMLCanvasElement>getElementById('game_canvas');
        // const renderer = autoDetectRenderer({
        //     backgroundAlpha: 0,
        //     backgroundColor: 0xff0000,
        //     hello: true,
        //     antialias: true,
        //     view: canvas,
        //     resolution: getResolution(),
        //     clearBeforeRender: true,
        // });
        // renderer.
        // const stage = new Container();
        // Ticker.shared.add(() => {
        //     // renderer.render(stage);
        // });
        // const view = Sprite.from(Texture.WHITE);
        // view.anchor.set(0.5);
        // view.scale.set(30);
        // stage.addChild(view);
        // const tweenColor = (
        //     from: number,
        //     to: number,
        //     duration: number,
        //     ease: (amount: number) => number,
        //     callback: (color: number) => void
        // ): void => {
        //     const color = new Color();
        //     const fromRGB = color.setValue(from).toRgb();
        //     const toRGB = color.setValue(to).toRgb();
        //     const tween = new Tween(fromRGB);
        //     tween.to(
        //         {
        //             r: toRGB.r,
        //             g: toRGB.g,
        //             b: toRGB.b,
        //         },
        //         duration
        //     );
        //     tween.onUpdate(({ r, g, b }) => {
        //         color.setValue({ r: r * 256, g: g * 256, b: b * 256 });
        //         callback(color.toNumber());
        //     });
        //     tween.easing(ease);
        //     tween.start();
        // };
        // tweenColor(0x00ff00, 0xff00ff, 4000, Easing.Cubic.Out, (color) => {
        //     view.tint = color;
        // });
        // const windowResize = (width, height): void => {
        //     renderer.resize(width, height);
        //     renderer.view.style.width = `${width}px`;
        //     renderer.view.style.height = `${height}px`;
        // };
        // const rendererResize = (): void => {
        //     const { width, height } = renderer.screen;
        //     view.position.set(width * 0.5, height * 0.5);
        // };
        // window.addEventListener('resize', () => {
        //     windowResize(window.innerWidth, window.innerHeight);
        // });
        // renderer.on('resize', rendererResize, this);
        // windowResize(window.innerWidth, window.innerHeight);
    }

    public async init(): Promise<void> {
        const stats = new Stats({
            css: 'bottom:0;left:0;transform-origin:left top;cursor:pointer;opacity:0.9',
            renderStep: 500,
        });

        document.body.appendChild(stats.dom);

        stats.addPanel(new FPSPanel('FPS', '#0ff', '#002'));
        stats.dom.style.transform = `scale(${2})`;

        const canvas = <HTMLCanvasElement>getElementById('game_canvas');

        const renderer = await autoDetectRenderer({
            // backgroundAlpha: 0,
            // backgroundColor: 0xff0000,
            hello: true,
            antialias: true,
            webgpu: {},
            view: canvas,
            // resolution: getResolution(),
            // clearBeforeRender: true,
        });

        const stage = new Container();

        Assets.add({ alias: 'bg', src: assets.images.bg });
        await Assets.load('bg');

        const view = Sprite.from(assets.images.bg);
        view.anchor.set(0.5);
        // view.scale.set(400);
        stage.addChild(view);

        new PhaserTimer({
            limit: 70,
        }).start(() => {
            view.rotation += 0.01;
            renderer.render(stage);
            stats.update();
        });
        // Ticker.shared.maxFPS = 70;
        // Ticker.shared.add(() => {
        //     view.rotation += 0.01;
        //     renderer.render(stage);
        //     stats.update();
        // });

        const windowResize = (width, height): void => {
            renderer.resize(width, height);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            view.position.set(width * 0.5, height * 0.5);
        };

        // const rendererResize = (): void => {
        //     const { width, height } = renderer.screen;
        //     view.position.set(width * 0.5, height * 0.5);
        // };
        // window.addEventListener('resize', () => {
        //     windowResize(window.innerWidth, window.innerHeight);
        // });
        // renderer.on('resize', rendererResize, this);
        windowResize(window.innerWidth, window.innerHeight);
    }
}

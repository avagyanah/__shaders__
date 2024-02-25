import { FPSPanel, Stats } from '@gameastic/stats';
import { Container, Sprite, Texture, Ticker, autoDetectRenderer } from 'pixi.js';
import { getElementById, getResolution } from '../../../shared/utils';
import { TimeStep } from './TimeStep';

window.addEventListener('load', async () => {
    new App();
});

class App {
    public constructor() {
        const canvasUI = <HTMLCanvasElement>getElementById('ui_canvas');

        const uiRenderer = autoDetectRenderer({
            backgroundAlpha: 0,
            backgroundColor: 0xff0000,
            hello: true,
            antialias: true,
            view: canvasUI,
            resolution: getResolution(),
            clearBeforeRender: true,
        });

        const canvasGame = <HTMLCanvasElement>getElementById('game_canvas');
        const offscreenCanvas = canvasGame.transferControlToOffscreen();

        const gameRenderer = autoDetectRenderer({
            backgroundAlpha: 0,
            backgroundColor: 0xff0000,
            hello: true,
            antialias: true,
            view: offscreenCanvas,
            resolution: getResolution(),
            clearBeforeRender: true,
        });

        const uiStats = new Stats({
            css: 'bottom:0;left:0;transform-origin:left top;cursor:pointer;opacity:0.9',
            renderStep: 500,
        });

        document.body.appendChild(uiStats.dom);

        uiStats.addPanel(new FPSPanel('FPS', '#0ff', '#002'));
        uiStats.dom.style.transform = `scale(${2})`;

        const gameStats = new Stats({
            css: 'bottom:0;right:0;transform-origin:left top;cursor:pointer;opacity:0.9',
            renderStep: 500,
        });

        document.body.appendChild(gameStats.dom);

        gameStats.addPanel(new FPSPanel('FPS', '#0ff', '#002'));
        gameStats.dom.style.transform = `scale(${2})`;

        const uiStage = new Container();
        const gameStage = new Container();

        const uiView = Sprite.from(Texture.WHITE);
        const gameView = Sprite.from(Texture.WHITE);

        uiView.tint = 0xff0000;
        gameView.tint = 0x0000ff;

        uiView.anchor.set(0.5);
        uiView.scale.set(30);

        uiView.position.set(0, 0);
        uiView.position.set(500, 500);

        gameView.anchor.set(0.5);
        gameView.scale.set(30);

        uiStage.addChild(uiView);
        gameStage.addChild(gameView);

        Ticker.shared.autoStart = false;
        Ticker.system.autoStart = false;

        Ticker.shared.stop();
        Ticker.system.stop();

        const uiTimer = new TimeStep({});
        const gameTimer = new TimeStep();

        uiTimer.start((time, delta) => {
            uiView.rotation += 0.0008 * delta;
            uiRenderer.render(uiStage);
            uiStats.update();
        });

        gameTimer.start((time, delta) => {
            gameView.rotation += 0.0008 * delta;
            gameRenderer.render(gameStage);
            gameStats.update();
        });

        // Ticker.shared.add(() => {
        //     uiRenderer.render(uiStage);
        //     gameRenderer.render(gameStage);
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

        const windowResize = (width, height): void => {
            gameRenderer.resize(width, height);
            uiRenderer.resize(width, height);

            // uiRenderer.view.style.width = `${width}px`;
            // uiRenderer.view.style.height = `${height}px`;
        };

        const rendererResize = (): void => {
            const { width, height } = uiRenderer.screen;

            // view.position.set(width * 0.5, height * 0.5);
        };

        window.addEventListener('resize', () => {
            windowResize(window.innerWidth, window.innerHeight);
        });
        uiRenderer.on('resize', rendererResize, this);

        windowResize(window.innerWidth, window.innerHeight);
    }
}

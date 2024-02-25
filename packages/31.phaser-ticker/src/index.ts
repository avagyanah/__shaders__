import { FPSPanel, Stats } from '@gameastic/stats';
import { Container, Sprite, Texture, Ticker, autoDetectRenderer } from 'pixi.js';
import { getElementById, getResolution } from '../../../shared/utils';
import { TimeStep } from './TimeStep';

window.addEventListener('load', async () => {
    new App();
});

class App {
    public constructor() {
        const gameStats = new Stats({
            css: 'bottom:0;right:0;transform-origin:left top;cursor:pointer;opacity:0.9',
            renderStep: 500,
        });

        document.body.appendChild(gameStats.dom);

        gameStats.addPanel(new FPSPanel('FPS', '#0ff', '#002'));
        gameStats.dom.style.transform = `scale(${2})`;

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

        const gameStage = new Container();
        const gameView = Sprite.from(Texture.WHITE);
        gameView.anchor.set(0.5);
        gameView.scale.set(30);
        gameStage.addChild(gameView);

        Ticker.shared.autoStart = false;
        Ticker.system.autoStart = false;

        Ticker.shared.stop();
        Ticker.system.stop();

        const gameTimer = new TimeStep({
            limit: 70,
            speed: 1,
        });

        const callback = (time, delta): void => {
            // console.log(gameTimer.elapsedMS);

            gameView.rotation += 0.0007 * delta;
            // gameView.rotation += 0.01;
            gameRenderer.render(gameStage);
            gameStats.update();
        };

        document.addEventListener('visibilitychange', () => {
            console.warn('pause/resume');

            document.hidden ? gameTimer.pause() : gameTimer.resume();
        });

        gameTimer.add(callback);
        gameTimer.start();

        const windowResize = (width, height): void => {
            gameRenderer.resize(width, height);

            canvasGame.style.width = `${width}px`;
            canvasGame.style.height = `${height}px`;
        };

        const rendererResize = (): void => {
            const { width, height } = gameRenderer.screen;

            gameView.position.set(width * 0.5, height * 0.5);
        };

        window.addEventListener('resize', () => {
            windowResize(window.innerWidth, window.innerHeight);
        });
        gameRenderer.on('resize', rendererResize, this);

        windowResize(window.innerWidth, window.innerHeight);
    }
}

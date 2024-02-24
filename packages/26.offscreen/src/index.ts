import { Color, Container, Sprite, Texture, Ticker, autoDetectRenderer } from 'pixi.js';
import { getElementById, getResolution } from '../../../shared/utils';
import TWEEN, { Tween, Easing } from '@tweenjs/tween.js';

window.addEventListener('load', async () => {
    new App();
});

class App {
    public constructor() {
        const canvas = <HTMLCanvasElement>getElementById('game_canvas');
        const offscreenCanvas = canvas.transferControlToOffscreen();

        const renderer = autoDetectRenderer({
            backgroundAlpha: 0,
            backgroundColor: 0xff0000,
            hello: true,
            antialias: true,
            view: offscreenCanvas,
            resolution: getResolution(),
            clearBeforeRender: true,
        });

        const stage = new Container();

        Ticker.shared.add(() => {
            renderer.render(stage);
            TWEEN.update();
        });

        const view = Sprite.from(Texture.WHITE);
        view.anchor.set(0.5);
        view.scale.set(30);
        stage.addChild(view);

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

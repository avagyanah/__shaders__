import { Color, Container, Sprite, Texture, Ticker, autoDetectRenderer } from 'pixi.js';
import { getElementById, getResolution } from '../../../shared/utils';
import TWEEN, { Tween, Easing } from '@tweenjs/tween.js';

window.addEventListener('load', async () => {
    new App();
});

class App {
    public constructor() {
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

        Ticker.shared.add(() => {
            renderer.render(stage);
            TWEEN.update();
        });

        const view = Sprite.from(Texture.WHITE);
        view.anchor.set(0.5);
        view.scale.set(30);
        stage.addChild(view);

        const tweenColor = (
            from: number,
            to: number,
            duration: number,
            ease: (amount: number) => number,
            callback: (color: number) => void
        ): void => {
            const color = new Color();

            const fromRGB = color.setValue(from).toRgb();
            const toRGB = color.setValue(to).toRgb();

            const tween = new Tween(fromRGB);
            tween.to(
                {
                    r: toRGB.r,
                    g: toRGB.g,
                    b: toRGB.b,
                },
                duration
            );
            tween.onUpdate(({ r, g, b }) => {
                color.setValue({ r: r * 256, g: g * 256, b: b * 256 });

                callback(color.toNumber());
            });
            tween.easing(ease);
            tween.start();
        };

        tweenColor(0x00ff00, 0xff00ff, 4000, Easing.Cubic.Out, (color) => {
            view.tint = color;
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

import { Stats, addStats } from 'pixi-stats';
import { Container, Sprite, Texture, Ticker, UPDATE_PRIORITY } from 'pixi.js';
import { PixiApp } from '../../../shared/pixi';
import { assets } from './assets';
import { Trail } from './trail';

window.addEventListener('load', () => {
    window.globals = { pixiApp: new App() };
    window.globals.pixiApp.init();
});

class App extends PixiApp {
    public init(): void {
        const container = new Container();
        this.stage.addChild(container);

        const stats: Stats = addStats(document, this);
        const ticker: Ticker = Ticker.shared;

        ticker.add(stats.update, stats, UPDATE_PRIORITY.UTILITY);

        const ballTexture = Texture.from(assets.images.ball);
        const trailTexture = Texture.from(assets.images.bg);

        let time = 0;

        ticker.add(() => {
            time += 0.01;
            this.stage.x -= 3;
        });

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 1; j++) {
                const ball = Sprite.from(ballTexture);
                ball.anchor.set(0.5);
                ball.width = 30;
                ball.height = 30;

                const x = j * 180 + 80;
                const y = i * 40 + 80;

                ball.position.set(x, y);

                const trail = new Trail(this.renderer, trailTexture, 20);
                trail.setTarget(ball);

                this.stage.addChild(trail);
                this.stage.addChild(ball);

                ticker.add(() => {
                    const x = ball.x + 4;
                    const y = i * 40 + 80 + Math.sin(time) * 40;

                    ball.position.set(x, y);
                    trail.addPoint(x, y);
                    trail.update(0);
                });
            }
        }
    }
}

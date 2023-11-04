import { Container, Sprite, Texture, Ticker } from 'pixi.js';
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
        // container.position.set(200, 0);
        container.position.set(400, 200);
        this.stage.addChild(container);

        const ticker: Ticker = Ticker.shared;

        const ballTexture = Texture.from(assets.images.ball);
        const trailTexture1 = Texture.from(assets.images.bg);
        const trailTexture2 = Texture.from(assets.images.snake);
        const trailTexture3 = Texture.WHITE;

        let time = 0;
        ticker.add(() => {
            time += 0.01;
            this.stage.x -= 8;
        });

        const balls = [];
        const trails = [];
        const ballsUpdate = [];
        const trailsUpdate = [];

        Trail.addMaterial('mat1', { texture: trailTexture1, vertSrc: '', fragSrc: '', uniforms: {} });
        Trail.addMaterial('mat2', { texture: trailTexture2, vertSrc: '', fragSrc: '', uniforms: {} });
        Trail.addMaterial('mat3', { texture: trailTexture3, vertSrc: '', fragSrc: '', uniforms: {} });

        for (let i = 0; i < 1; i++) {
            for (let j = 0; j < 0; j++) {
                const ball = Sprite.from(ballTexture);
                ball.anchor.set(0.5);
                ball.width = 30;
                ball.height = 30;

                const trail = new Trail({ material: 'mat1', width: 20, count: 40 });
                trail.setTarget(ball);

                balls.push(ball);
                trails.push(trail);

                ballsUpdate.push(() => {
                    const x = ball.x + 8;
                    const y = i * 120 + 110 + Math.sin(time * 10) * 100;

                    ball.position.set(x, y);
                });

                trailsUpdate.push(() => {
                    trail.addPoint(ball.x, ball.y);
                    trail.update();
                });

                ball.x = j * 130;
            }
        }

        trails.forEach((trail) => container.addChild(trail));
        balls.forEach((ball) => container.addChild(ball));

        const ballsUpdateCallback = (): void => {
            ballsUpdate.forEach((fn) => {
                fn();
            });
        };

        const trailsUpdateCallback = (): void => {
            trailsUpdate.forEach((fn) => {
                fn();
            });
        };

        Ticker.shared.add(ballsUpdateCallback);
        Ticker.shared.add(trailsUpdateCallback);
    }
}

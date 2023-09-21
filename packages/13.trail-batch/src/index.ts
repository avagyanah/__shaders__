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
        // const mat = new Shader(new Program(assets.shaders.default.vert, assets.shaders.default.frag), {
        //     uSampler: Texture.from(assets.images.bg),
        // });
        // const geom = new PlaneGeometry(300, 300, 2, 2);

        // const mesh1 = new Mesh(geom, mat);
        // const mesh2 = new Mesh(geom, mat);
        // const mesh3 = new Mesh(geom, mat);
        // const mesh4 = new Mesh(geom, mat);

        // this.stage.addChild(mesh1);
        // this.stage.addChild(mesh2);
        // this.stage.addChild(mesh3);
        // this.stage.addChild(mesh4);

        // mesh1.position.set(100, 100);
        // mesh2.position.set(200, 200);
        // mesh3.position.set(300, 300);
        // mesh4.position.set(400, 400);

        const container = new Container();
        container.position.set(200, 0);
        // container.position.set(400, 300);
        this.stage.addChild(container);

        const ticker: Ticker = Ticker.shared;

        const ballTexture = Texture.from(assets.images.ball);
        const trailTexture = Texture.from(assets.images.bg);

        let time = 0;

        ticker.add(() => {
            time += 0.01;
            this.stage.x -= 8;
        });

        const balls = [];
        const trails = [];

        for (let i = 0; i < 1; i++) {
            for (let j = 0; j < 0; j++) {
                // for (let i = 0; i < 16; i++) {
                //     for (let j = 0; j < 9; j++) {
                // for (let i = 0; i < 10; i++) {
                //     for (let j = 0; j < 10; j++) {
                const ball = Sprite.from(ballTexture);
                ball.anchor.set(0.5);
                ball.width = 30;
                ball.height = 30;

                const trail = new Trail({ texture: trailTexture, width: 20, lifeTime: 1000 });
                trail.setTarget(ball);

                balls.push(ball);
                trails.push(trail);

                ball.x = j * 140;
            }
        }

        trails.forEach((trail) => container.addChild(trail));
        balls.forEach((ball) => container.addChild(ball));

        const ballsUpdate = (): void => {
            balls.forEach((ball, i) => {
                const x = ball.x + 8;
                const y = (i / 9) * 100 + 110 + Math.sin(time * 10) * 100;

                ball.position.set(x, y);
            });
        };

        const trailsUpdate = (): void => {
            trails.forEach((trail, i) => {
                trail.update(Ticker.shared.deltaMS);
            });
        };

        const trailsAddPoint = (): void => {
            trails.forEach((trail, i) => {
                trail.addPoint(balls[i].x, balls[i].y);
            });
        };

        Ticker.shared.add(ballsUpdate);
        Ticker.shared.add(trailsUpdate);
        Ticker.shared.add(trailsAddPoint);

        // setTimeout(() => {
        //     Ticker.shared.remove(ballsUpdate);
        //     // Ticker.shared.remove(trailsAddPoint);
        //     // Ticker.shared.remove(trailsUpdate);
        // }, 1000);

        // setTimeout(() => {
        //     Ticker.shared.add(ballsUpdate);
        //     // Ticker.shared.add(trailsAddPoint);
        // }, 1400);
    }
}

import { Container, Filter, Sprite } from 'pixi.js';
import { PixiApp, centralize } from '../../../shared/pixi';
import { assets } from './assets';

window.addEventListener('load', () => {
    window.globals = { pixiApp: new App() };
    window.globals.pixiApp.init();
});

class App extends PixiApp {
    public init(): void {
        const container = new Container();
        this.stage.addChild(container);
        centralize(container);

        const bg1 = Sprite.from(assets.images.bg);
        bg1.anchor.set(0.5);

        container.addChild(bg1);

        // color 1
        {
            const vert = assets.shaders.default.vert;
            const frag = assets.shaders.color1.frag;
            const uniforms = { u_r: 0.0, u_g: 1.0, u_b: 1.0, u_a: 1.0 };

            let red = 0;
            setInterval(() => {
                red += 0.005;
                uniforms.u_r = Math.abs(Math.sin(red));
            });

            const filter = new Filter(vert, frag, uniforms);
            container.filters = [filter];
        }
    }
}

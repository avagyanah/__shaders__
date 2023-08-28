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

        const filters = [];

        // filter 1
        {
            const vert = assets.shaders.default.vert;
            const frag = assets.shaders.alpha1.frag;
            const uniforms = { u_alpha: 1 };

            let alpha = 1;
            setInterval(() => {
                alpha += 0.005;
                uniforms.u_alpha = Math.abs(Math.sin(alpha));
            });

            const filter = new Filter(vert, frag, uniforms);
            filters.push(filter);
        }

        container.filters = filters;
    }
}

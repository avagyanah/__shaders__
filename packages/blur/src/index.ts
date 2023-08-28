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

        // simple blur
        {
            const vert = assets.shaders.default.vert;
            const frag = assets.shaders.blur1.frag;
            const uniforms = {};

            const filter = new Filter(vert, frag, uniforms);
            filter.resolution = 0.05;
            filter.padding = 100;
            container.filters = [filter];
        }
    }
}

import { Container, Filter, Sprite } from 'pixi.js';
import { PixiApp, centralize } from '../../../shared/pixi';
import { getResolution } from '../../../shared/utils';
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
        // const bg1 = Sprite.from(Texture.WHITE);
        bg1.width = 500;
        bg1.height = 500;
        bg1.anchor.set(0.5);

        container.addChild(bg1);

        const filters = [];

        // trail 1
        {
            const vert = assets.shaders.trail1.vert;
            const frag = assets.shaders.trail1.frag;
            const uniforms = { u_alpha: 0.3 };
            const filter = new Filter(vert, frag, uniforms);
            filter.resolution = getResolution();
            filters.push(filter);
        }

        container.filters = filters;
    }
}

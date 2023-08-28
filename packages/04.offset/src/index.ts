import { Container, Filter, Sprite } from 'pixi.js';
import { PixiApp } from '../../../shared/pixi';
import { assets } from './assets';

window.addEventListener('load', () => {
    window.globals = { pixiApp: new App() };
    window.globals.pixiApp.init();
});

class App extends PixiApp {
    public init(): void {
        const container = new Container();
        this.stage.addChild(container);

        const bg1 = Sprite.from(assets.images.bg);
        // const bg1 = Sprite.from(Texture.WHITE);
        bg1.width = 500;
        bg1.height = 500;

        container.addChild(bg1);

        const filters = [];

        //
        {
            const { width, height } = this.renderer.screen;

            const vert = assets.shaders.offset1.vert;
            const frag = assets.shaders.offset1.frag;
            const uniforms = {
                u_offset: { x: width / 2, y: height / 2 },
            };

            const filter = new Filter(vert, frag, uniforms);
            filters.push(filter);
        }

        container.filters = filters;
    }
}

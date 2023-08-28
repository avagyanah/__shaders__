import { Container, Filter, Graphics, Sprite } from 'pixi.js';
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

        const gr = new Graphics();
        gr.beginFill(0xffffff, 1);
        gr.drawCircle(0, 0, 200);
        gr.endFill();

        container.addChild(bg1);
        container.addChild(gr);

        const filters = [];

        // alpha 1
        {
            const vert = assets.shaders.alpha1.vert;
            const frag = assets.shaders.alpha1.frag;
            const uniforms = { u_alpha: 0.5 };
            const filter = new Filter(vert, frag, uniforms);
            filter.resolution = getResolution();
            filters.push(filter);
        }

        // erase 1
        {
            const vert = assets.shaders.erase1.vert;
            const frag = assets.shaders.erase1.frag;
            const uniforms = {};

            let radius = 0;
            setInterval(() => {
                radius += 0.01;
                gr.clear();
                gr.beginFill(0xffffff, 1);
                gr.drawCircle(0, 0, Math.abs(Math.sin(radius) * 200));
                gr.endFill();
            }, 16);

            const filter = new Filter(vert, frag, uniforms);
            filter.resolution = getResolution();
            filters.push(filter);
        }

        container.filters = filters;
    }
}

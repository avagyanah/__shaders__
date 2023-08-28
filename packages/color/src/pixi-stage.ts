import { Container, Filter, Sprite } from 'pixi.js';
import { assets } from './assets';
import { centralize } from './utils';

export class PixiStage extends Container {
    public init(): void {
        const container = new Container();
        centralize(container);
        this.addChild(container);

        const bg1 = Sprite.from(assets.images.bg1);
        bg1.width = 400;
        bg1.height = 400;
        bg1.anchor.set(0.5);

        container.addChild(bg1);

        const vert = assets.shaders.default.vert;
        const frag4 = assets.shaders.color.frag;

        const uniforms = { u_r: 1.0, u_g: 0.0, u_b: 1.0, u_a: 1 };

        let g = 0;
        setInterval(() => {
            g += 0.005;
            uniforms.u_g = Math.abs(Math.sin(g));
        });

        const colorFilter = new Filter(vert, frag4, uniforms);
        container.filters = [colorFilter];
    }
}

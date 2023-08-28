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
        const frag = assets.shaders.alpha.frag;
        const uniforms = { u_alpha: 0.1 };

        let alpha = 1;
        setInterval(() => {
            alpha += 0.005;
            uniforms.u_alpha = Math.abs(Math.sin(alpha));
        });

        const alphaFilter = new Filter(vert, frag, uniforms);
        container.filters = [alphaFilter];
    }
}

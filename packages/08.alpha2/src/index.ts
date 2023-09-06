import { Container, Mesh, PlaneGeometry, Shader, Sprite, Texture } from 'pixi.js';
import { PixiApp, drawVertices } from '../../../shared/pixi';
import { assets } from './assets';

window.addEventListener('load', () => {
    window.globals = { pixiApp: new App() };
    window.globals.pixiApp.init();
});

class App extends PixiApp {
    public init(): void {
        const container = new Container();
        this.stage.addChild(container);

        const disp = Sprite.from(assets.images.displacement);
        disp.anchor.set(0.5);
        disp.scale.set(2);
        container.addChild(disp);
        //

        const vert = assets.shaders.alpha1.vert;
        const frag = assets.shaders.alpha1.frag;

        // UNIFORMS
        const uniforms = {
            uSampler: Texture.from(assets.images.bg),
        };

        const width = 500;
        const height = 500;
        const geometry = new PlaneGeometry(width, height, 2, 2);
        const alphaArr = [1, 0, 0, 0];
        geometry.addAttribute('aAlpha', alphaArr, 1);
        const material = Shader.from(vert, frag, uniforms);
        const mesh = new Mesh(geometry, material);
        mesh.pivot.set(mesh.width * 0.5, mesh.height * 0.5);

        const alphaBuffer = geometry.getBuffer('aAlpha');
        alphaArr[1] = 1;
        alphaBuffer.update(alphaArr);

        //
        container.addChild(mesh);
        drawVertices(mesh, mesh, false, false);
        container.position.set(window.innerWidth * 0.5, window.innerHeight * 0.5);
    }
}

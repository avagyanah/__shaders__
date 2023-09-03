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

        const vert = assets.shaders.next.vert;
        const frag = assets.shaders.next.frag;

        // UNIFORMS
        const uniforms = {
            uSampler: Texture.from(assets.images.bg),
            u_resolution: { x: window.innerWidth, y: window.innerHeight },
            u_time: performance.now(),
            u_mouse: [0, 0],
        };

        document.onmousemove = (event) => {
            uniforms.u_mouse[0] = event.pageX;
            uniforms.u_mouse[1] = event.pageY;
        };

        window.addEventListener('resize', () => {
            uniforms.u_resolution.x = this.renderer.width;
            uniforms.u_resolution.y = this.renderer.height;
        });

        setInterval(() => {
            uniforms.u_time = performance.now();
        });
        // -------------

        const width = 500;
        const height = 500;

        const geometry = new PlaneGeometry(width, height, 2, 2);
        const material = Shader.from(vert, frag, uniforms);
        const mesh = new Mesh(geometry, material);
        mesh.pivot.set(mesh.width * 0.5, mesh.height * 0.5);

        //
        container.addChild(mesh);
        drawVertices(mesh, mesh, true, true);
        container.position.set(window.innerWidth * 0.5, window.innerHeight * 0.5);
    }
}

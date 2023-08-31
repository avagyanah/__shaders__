import { Container, Mesh, PlaneGeometry, Shader, Texture } from 'pixi.js';
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
        //

        // const mat = new MeshMaterial();
        // const mesh = new Mesh(new PlaneGeometry(), new MeshMaterial(Texture.WHITE));
        const uniforms = {
            // uSampler: Texture.from(assets.images.snake),
            uSampler: Texture.from(assets.images.treadmill),
        };
        const vert = assets.shaders.mesh.vert;
        const frag = assets.shaders.mesh.frag;

        // const mesh = new Mesh(new MeshGeometry(), new MeshMaterial(Texture.WHITE, { uniforms }));
        // drawVertices(rope.geometry, container, true, true);
        const geometry = new PlaneGeometry(500, 100, 10, 2);
        // const material = new MeshMaterial(Texture.WHITE, { uniforms });
        const material = Shader.from(vert, frag, uniforms);
        const mesh = new Mesh(geometry, material);

        container.addChild(mesh);
        drawVertices(mesh, mesh, true, false);
        container.position.set((window.innerWidth - geometry.width) / 2, (window.innerHeight - geometry.height) / 2);
    }
}

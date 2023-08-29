import { Geometry, Mesh, Shader, Texture } from 'pixi.js';
import { PixiApp, drawVertices } from '../../../shared/pixi';
import { assets } from './assets';

window.addEventListener('load', () => {
    window.globals = { pixiApp: new App() };
    window.globals.pixiApp.init();
});

class App extends PixiApp {
    public init(): void {
        // const sprite = Sprite.from(assets.images.bg);
        // this.stage.addChild(sprite);

        const vert = assets.shaders.test.vert;
        const frag = assets.shaders.test.frag;

        const geometry = new Geometry();
        // geometry.addAttribute('aVertexPosition', [-256, -256, 256, -256, 256, 256, -256, 256], 2);
        geometry.addAttribute('aVertexPosition', [0, 0, 512, 0, 512, 512, 0, 512], 2);
        geometry.addAttribute('aTextureCoord', [0, 0, 1, 0, 1, 1, 0, 1], 2);
        geometry.addIndex([0, 1, 2, 0, 2, 3]);

        const uniforms = {
            uSampler: Texture.from(assets.images.bg),
            // time: 0,
        };

        const shader = Shader.from(vert, frag, uniforms);
        const quad = new Mesh(geometry, shader);
        quad.position.set(window.innerWidth / 2, window.innerHeight / 2);
        quad.position.set(50, 110);
        drawVertices(geometry, quad);
        this.stage.addChild(quad);

        // const geom = new RopeGeometry(50, [
        //     new Point(100, 0),
        //     new Point(200, 0),
        //     new Point(300, 0),
        //     new Point(400, 0),
        //     new Point(500, 0),
        // ]);
        // const geom = new PlaneGeometry(512, 512, 6, 6);
        // const plane = new Mesh(geom, shader);
        // plane.position.set(50, 400);
        // drawVertices(geom, plane, true, false);
        // this.stage.addChild(plane);

        // const material = new MeshMaterial(Texture.from(assets.images.bg));
        // const mesh = new Mesh(geometry, material);
        // mesh.position.set(window.innerWidth / 2, window.innerHeight / 2);
        // this.stage.addChild(mesh);

        // const filters = [];

        // // alpha 1
        // {
        //     const vert = assets.shaders.alpha1.vert;
        //     const frag = assets.shaders.alpha1.frag;
        //     const uniforms = { u_alpha: 1.0 };
        //     const filter = new Filter(vert, frag, uniforms);
        //     filter.resolution = getResolution();

        //     filters.push(filter);
        // }

        // // trail 1
        // {
        //     const vert = assets.shaders.trail1.vert;
        //     const frag = assets.shaders.trail1.frag;
        //     const uniforms = { mask: 0 };
        //     const filter = new Filter(vert, frag, uniforms);
        //     filter.resolution = getResolution();

        //     filters.push(filter);
        // }

        // container.filters = filters;
    }
}

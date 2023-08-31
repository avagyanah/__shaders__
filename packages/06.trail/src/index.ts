import { Container, Mesh, Point, RopeGeometry, Shader, Texture, Ticker } from 'pixi.js';
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

        const uniforms = {
            uSampler: Texture.from(assets.images.snake),
            // uSampler: Texture.WHITE,
            uTime: 0.1,
        };

        // const vert = assets.shaders.test.vert;
        // const frag = assets.shaders.test.frag;
        const vert = assets.shaders.trail1.vert;
        const frag = assets.shaders.trail1.frag;
        const shader = Shader.from(vert, frag, uniforms);

        const points = [
            new Point(0, 0),
            new Point(100, 0),
            new Point(200, 0),
            new Point(300, 0),
            new Point(400, 0),
            new Point(500, 0),
        ];
        const geom = new RopeGeometry(80, points);
        const plane = new Mesh(geom, shader);
        // const plane = new SimpleRope(Texture.from(assets.images.snake), points);
        drawVertices(plane.geometry, plane, true, true);
        container.addChild(plane);

        let count = 0;

        Ticker.shared.add(() => {
            // setInterval(() => {
            count += 0.1;

            for (let i = 0; i < points.length; i++) {
                points[i].y = Math.sin(i * 0.5 + count) * 30;
                // points[i].x = i * 120 + Math.cos(i * 0.3 + count) * 20;
            }

            geom.update();
            // }, 16.6);
        });

        // for (let i = 0; i < points.length; i++) {
        //     const pt = points[i];
        //     geom.points[i].x += 2;
        //     // pt.y += 1;
        // }

        // const debugVert = assets.shaders.debug.vert;
        // const debugFrag = assets.shaders.debug.frag;
        // const debugShader = Shader.from(debugVert, debugFrag, uniforms);
        // const debugMesh = new Mesh(geom, debugShader);
        // container.addChild(debugMesh);

        container.position.set(window.innerWidth / 2 - 315, window.innerHeight / 2 - 205);

        // // const sprite = Sprite.from(assets.images.bg);
        // // this.stage.addChild(sprite);

        // const vert = assets.shaders.test.vert;
        // const frag = assets.shaders.test.frag;

        // const rope = new Rope(500, 20, 2, vert, frag, Texture.from(assets.images.bg));
        // rope.position.set(100, 300);
        // drawVertices(rope.geometry, rope, true, true);
        // this.stage.addChild(rope);

        // // return;
        // const geometry = new Geometry();
        // geometry.addAttribute('aVertexPosition', [0, 20, 512, 0, 512, 40, 0, 20], 2);
        // // geometry.addAttribute('aVertexPosition', [0, 0, 512, 0, 512, 512, 0, 512], 2);
        // geometry.addAttribute('aTextureCoord', [0, 0, 1, 0, 1, 1, 0, 1], 2);
        // geometry.addIndex([0, 1, 2, 0, 2, 3]);

        // const uniforms = {
        //     uSampler: Texture.from(assets.images.treadmill),
        //     // time: 0,
        // };

        // const shader = Shader.from(vert, frag, uniforms);
        // // const quad = new Mesh(geometry, shader);
        // // quad.position.set(window.innerWidth / 2, window.innerHeight / 2);
        // // quad.position.set(50, 110);
        // // drawVertices(geometry, quad, true, false);
        // // this.stage.addChild(quad);

        // const geom = new RopeGeometry(500, [
        //     new Point(0, 0),
        //     new Point(0, 100),
        //     new Point(0, 200),
        //     new Point(0, 300),
        //     new Point(0, 400),
        //     new Point(0, 500),
        // ]);
        // const geom2 = new PlaneGeometry(512, 512, 9, 2);
        // const plane2 = new Mesh(geom2, shader);
        // plane.position.set(window.innerWidth / 2, window.innerHeight / 2);
        // // plane.position.set(20, 200);
        // drawVertices(geom2, plane2, true, false);
        // this.stage.addChild(plane2);

        // const material = new MeshMaterial(Texture.from(assets.images.bg));
        // const mesh = new Mesh(geometry, material);
        // mesh.position.set(window.innerWidth / 2, window.innerHeight / 2);
        // this.stage.addChild(mesh);

        // // const filters = [];

        // // // alpha 1
        // // {
        // //     const vert = assets.shaders.alpha1.vert;
        // //     const frag = assets.shaders.alpha1.frag;
        // //     const uniforms = { u_alpha: 1.0 };
        // //     const filter = new Filter(vert, frag, uniforms);
        // //     filter.resolution = getResolution();

        // //     filters.push(filter);
        // // }

        // // // trail 1
        // // {
        // //     const vert = assets.shaders.trail1.vert;
        // //     const frag = assets.shaders.trail1.frag;
        // //     const uniforms = { mask: 0 };
        // //     const filter = new Filter(vert, frag, uniforms);
        // //     filter.resolution = getResolution();

        // //     filters.push(filter);
        // // }

        // // container.filters = filters;
    }
}

import { Container, Mesh, PlaneGeometry, Shader, Sprite, Texture } from 'pixi.js';
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

        const disp = Sprite.from(assets.images.displacement);
        disp.anchor.set(0.5);
        disp.scale.set(2);
        container.addChild(disp);
        //

        const vert = assets.shaders.glow1.vert;
        const frag = assets.shaders.glow1.frag;

        // UNIFORMS
        const uniforms = {
            // uSampler: Texture.from(assets.images.displacement),
            // u_resolution: { x: window.innerWidth, y: window.innerHeight },
            // u_time: performance.now(),
            // u_mouse: [0, 0],
            u_intensity: 1,
            // u_gap: 0.4,
            // u_count: 2,
            u_color: [1, 0, 0, 1],
        };

        // document.onmousemove = (event) => {
        //     uniforms.u_mouse[0] = event.pageX;
        //     uniforms.u_mouse[1] = event.pageY;
        // };

        // window.addEventListener('resize', () => {
        //     uniforms.u_resolution.x = this.renderer.width;
        //     uniforms.u_resolution.y = this.renderer.height;
        // });

        // setInterval(() => {
        //     uniforms.u_time = performance.now();
        //     mesh.rotation += 0.001;
        // });
        // -------------

        const width = 500;
        const height = 500;

        const geometry = new PlaneGeometry(width, height, 2, 2);
        const material = Shader.from(vert, frag, uniforms);
        const mesh = new Mesh(geometry, material);
        mesh.pivot.set(mesh.width * 0.5, mesh.height * 0.5);

        //
        container.addChild(mesh);

        // drawVertices(mesh, mesh, false, false);
        container.position.set(window.innerWidth * 0.5, window.innerHeight * 0.5);

        // const vertexes = geometry.getBuffer('aVertexPosition').data;
        // console.warn(vertexes);

        // const uniforms = {
        //     uSampler: Texture.from(assets.images.treadmill),
        // };
        // const vert = assets.shaders.mesh.vert;
        // const frag = assets.shaders.mesh.frag;

        // const geometry = new PlaneGeometry(500, 100, 4, 2);
        // const material = Shader.from(vert, frag, uniforms);
        // const mesh = new Mesh(geometry, material);

        // container.addChild(mesh);
        // drawVertices(mesh, mesh, true, true);
        // container.position.set((window.innerWidth - geometry.width) / 2, (window.innerHeight - geometry.height) / 2);

        // const uniforms = {
        //     uSampler: Texture.from(assets.images.treadmill),
        // };

        // const vert = assets.shaders.rope.vert;
        // const frag = assets.shaders.rope.frag;

        // const rope = new Rope(10, Texture.from(assets.images.bg));
        // container.addChild(rope);
        // const material = Shader.from(vert, frag, uniforms);
        // const mesh = new Mesh(geometry, material);

        // container.addChild(mesh);
        // drawVertices(rope, rope, true, false);
        // container.position.set(window.innerWidth / 2, window.innerHeight / 2);

        // setInterval(() => {
        //     rope.update(Ticker.shared.deltaMS);
        // }, 16.6);
    }
}

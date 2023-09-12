import { Container, Mesh, Point, RopeGeometry, Shader, Texture } from 'pixi.js';
import { PixiApp, drawVertices } from '../../../shared/pixi';
import { assets } from './assets';
import { Trail } from './trail';

window.addEventListener('load', () => {
    window.globals = { pixiApp: new App() };
    window.globals.pixiApp.init();
});

class App extends PixiApp {
    public init(): void {
        const container = new Container();
        this.stage.addChild(container);

        //
        //
        //

        // const trail = new Trail(Texture.from(assets.images.bg), 50);
        const trail = new Trail(Texture.WHITE, 50);

        // trail.setOrigin(50, 200);
        trail.setOrigin(0, 0);
        // trail.setOrigin(-100, 50);
        // trail.addPoint(0, 0);
        trail.addPoint(50, 0);
        trail.addPoint(150, -100);
        trail.addPoint(250, -110);
        trail.addPoint(300, -90);
        // trail.addPoint(300, 100);
        // trail.addPoint(100, 120);
        // trail.addPoint(100, 60);

        //
        //
        //

        const vertSrc = assets.shaders.rope.vert;
        const fragSrc = assets.shaders.rope.frag;
        const geom = new RopeGeometry(50, [
            //
            // new Point(-100, 50),
            new Point(0, 0),
            new Point(50, 0),
            new Point(150, -100),
            new Point(250, -110),
            new Point(300, -90),
            // new Point(300, 100),
            // new Point(100, 120),
            // new Point(100, 60),
        ]);
        // const mesh = new Mesh(geom, Shader.from(vertSrc, fragSrc, { uSampler: Texture.from(assets.images.bg) }));
        const rope = new Mesh(geom, Shader.from(vertSrc, fragSrc, { uSampler: Texture.WHITE }));

        //
        //
        //

        drawVertices(trail, trail, true, false);
        drawVertices(rope, rope, true, false);

        trail.position.set(-150, -100);
        rope.position.set(-150, 200);

        container.addChild(trail);
        container.addChild(rope);

        container.position.set(window.innerWidth * 0.5, window.innerHeight * 0.5);

        //
        //
        //

        {
            // console.warn(mesh.geometry.getBuffer('aVertexPosition').data);
            // console.warn(trail.geometry.getBuffer('aVertexPosition').data);
            // console.warn(mesh.geometry.getBuffer('aTextureCoord').data);
            // console.warn(trail.geometry.getBuffer('aTextureCoord').data);
            // console.warn(trail.geometry.getIndex().data);
            // console.warn(mesh.geometry.getIndex().data);
            // console.warn(trail.geometry.getBuffer('aVertexNeighbors').data);
        }
    }
}

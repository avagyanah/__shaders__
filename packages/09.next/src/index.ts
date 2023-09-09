import { Container, Graphics, Mesh, Point, RopeGeometry, Shader, Texture } from 'pixi.js';
import { PixiApp, drawVertices } from '../../../shared/pixi';
import { assets } from './assets';
import { Trail } from './trail';
import { V3 } from './vector';

// GeometrySystem.prototype.checkCompatibility = function () {};

window.addEventListener('load', () => {
    window.globals = { pixiApp: new App() };
    window.globals.pixiApp.init();
});

class App extends PixiApp {
    public init(): void {
        const gr = new Graphics();
        this.stage.addChild(gr);
        // console.warn(Vec3.normalize([1, 1, 0]));

        const down: IVec3 = [window.innerWidth * 0.5, window.innerHeight * 0.3, 0];
        const move: IVec3 = [0, 0, 0];

        document.onmousemove = (event) => {
            move[0] = event.pageX;
            move[1] = event.pageY;

            gr.clear();
            {
                gr.beginFill(0x00ff00);
                gr.drawCircle(down[0], down[1], 4);
                gr.endFill();
            }

            const v1: IVec3 = V3.sub([move[0], move[1], 0], [down[0], down[1], 0]);
            const vn1 = V3.normalize(v1);

            const v2: IVec3 = V3.sub([move[0] + 100, move[1] - 0, 0], [move[0], move[1], 0]);
            const vn2 = V3.normalize(v2);

            const dot = V3.dot(vn1, vn2);

            const mag = 100;

            {
                gr.moveTo(move[0], move[1]);
                gr.lineStyle(2, 0xff0000);
                gr.lineTo(move[0] - vn1[0] * mag, move[1] - vn1[1] * mag);

                gr.lineStyle(2, 0xffffff);
                gr.moveTo(move[0], move[1]);
                gr.lineTo(move[0] - v2[0] * dot, move[1] - v2[1] * dot);
            }

            if (false) {
                // gr.lineTo(diff[0], diff[1]);
                gr.lineTo(move[0], move[1]);

                const v: IVec3 = V3.sub(move, down);
                const vn: IVec3 = V3.normalize(v);

                const dt = V3.distance(move, down) * 1;
                const result = V3.add(down, [vn[0] * dt, vn[1] * dt, 0]);

                //
                const angle1 = 0;
                // const dn = V3.normalize(down);
                // const mn = V3.normalize(V3.sub(move, down));
                const dn = V3.normalize(V3.sub(down, V3.zero));
                const mn = V3.normalize(V3.sub(move, down));
                const dot = V3.dot(dn, mn);
                console.log(dot);

                const angle2 = Math.atan2(move[1] - down[1], move[0] - down[0]);
                // console.log((angle2 * 180) / Math.PI);

                {
                    gr.moveTo(down[0], down[1]);
                    gr.lineStyle(1, 0x00ff00);
                    gr.lineTo(0, 0);

                    gr.moveTo(down[0], down[1]);
                    gr.lineStyle(4, 0xff0000);
                    gr.lineTo(result[0], result[1]);

                    gr.moveTo(down[0], down[1]);
                    gr.lineStyle(2, 0xffffff);
                    gr.drawCircle(down[0], down[1], 2);
                }
            }
        };
        //
        //
        //
        //
        const container = new Container();
        this.stage.addChild(container);

        const vertSrc = assets.shaders.next1.vert;
        const fragSrc = assets.shaders.next1.frag;
        const geom = new RopeGeometry(50, [
            //
            new Point(0, 0),
            new Point(50, 0),
            new Point(150, -100),
            new Point(250, -110),
            new Point(300, -90),
        ]);
        // const mesh = new Mesh(geom, Shader.from(vertSrc, fragSrc, { uSampler: Texture.from(assets.images.bg) }));
        const mesh = new Mesh(geom, Shader.from(vertSrc, fragSrc, { uSampler: Texture.WHITE }));
        mesh.position.set(200, 700);
        drawVertices(mesh, mesh, true, false);
        container.addChild(mesh);

        //
        // const trail = new Trail(Texture.from(assets.images.bg), 50);
        const trail = new Trail(Texture.WHITE, 50);
        drawVertices(trail, trail, true, false);
        trail.position.set(200, 600);
        container.addChild(trail);
        drawVertices(trail, trail, true, false);

        trail.setOrigin(0, 0);
        trail.addPoint(50, 0);
        trail.addPoint(150, -100);
        trail.addPoint(250, -110);
        trail.addPoint(300, -90);

        // let moved = false;
        // document.onmousemove = (event) => {
        //     if (!moved) {
        //         trail.setOrigin(event.pageX, event.pageY);
        //     } else {
        //         trail.addPoint(event.pageX, event.pageY);
        //     }
        //     moved = true;
        // };

        // setInterval(() => {
        //     trail.removePoint();
        // }, 10);

        {
            // console.warn(mesh.geometry.getBuffer('aVertexPosition').data);
            // console.warn(trail.geometry.getBuffer('aVertexPosition').data);
            // console.warn(mesh.geometry.getBuffer('aTextureCoord').data);
            // console.warn(trail.geometry.getBuffer('aTextureCoord').data);
            // console.warn(trail.geometry.getIndex().data);
            // console.warn(mesh.geometry.getIndex().data);
            // console.warn(trail.geometry.getBuffer('aVertexNeighbors').data);
        }

        // container.position.set(window.innerWidth * 0.5, window.innerHeight * 0.5);
    }
}

import { Container, Mesh, Point, RopeGeometry, Shader, Texture } from 'pixi.js';
import { PixiApp, drawVertices } from '../../../shared/pixi';
import { assets } from './assets';
import { Debug } from './debug';
import { Trail } from './trail';
import { V3 } from './vector';

// GeometrySystem.prototype.checkCompatibility = function () {};

const TAU = Math.PI * 2;

window.addEventListener('load', () => {
    window.globals = { pixiApp: new App() };
    window.globals.pixiApp.init();
});

const angleToDirection = (radians: number): IVec2 => {
    return [Math.cos(radians), Math.sin(radians)];
};

class App extends PixiApp {
    public init(): void {
        Debug.setParent(this.stage);

        const down: IVec3 = [window.innerWidth * 0.5, window.innerHeight * 0.3, 0];
        const move: IVec3 = [0, 0, 0];

        const radius = 200;
        const axisL = radius * 1.25;
        const center: IVec3 = [window.innerWidth * 0.5, window.innerHeight * 0.5, 0];

        // coordinate system
        {
            Debug.drawCircle(center, 1, radius, Debug.GRAY);
            Debug.drawVector([center[0] - axisL, center[1], 0], [center[0] + axisL, center[1], 0], 1, Debug.RED);
            Debug.drawVector([center[0], center[1] + axisL, 0], [center[0], center[1] - axisL, 0], 1, Debug.GREEN);
        }

        {
            const count = 360 / 10;
            for (let i = 0; i < count; i++) {
                const t = i / count;
                const angRad = t * TAU;
                const pt: IVec2 = angleToDirection(angRad);

                // Debug.drawPoint([center[0] + pt[0], center[1] + y, 0], 2, Debug.GRAY);
                Debug.drawPoint(V3.add(center, V3.multiply([...pt, 0], radius)), 2, Debug.GRAY);
            }
        }

        Debug.fix();

        document.onmousemove = (event) => {
            move[0] = event.pageX;
            move[1] = event.pageY;

            const mv = V3.sub(move, center);
            const mvn = V3.normalize(mv);

            const mag = Math.min(V3.mag(mv), radius);
            // const mag = radius;

            const dv = V3.multiply(mvn, mag);
            const dvn = V3.normalize(dv);

            Debug.clear();
            Debug.drawVector(center, V3.add(center, dv), 2, Debug.CYAN);

            const dotX = V3.dot(dvn, V3.right);
            const dotY = V3.dot(dvn, V3.up);

            const vpx: IVec3 = [dotX * mag, 0, 0];
            const vpy: IVec3 = [0, dotY * mag, 0];

            Debug.drawPoint(V3.add(center, vpx), 4, Debug.RED);
            Debug.drawPoint(V3.add(center, vpy), 4, Debug.GREEN);

            Debug.drawLine(V3.add(center, dv), V3.add(center, vpx), 1, Debug.RED);
            Debug.drawLine(V3.add(center, dv), V3.add(center, vpy), 1, Debug.GREEN);
        };

        return;
        document.onmousemove = (event) => {
            move[0] = event.pageX;
            move[1] = event.pageY;

            const v1: IVec3 = V3.sub(move, down);
            const vn1 = V3.normalize(v1);

            const v2: IVec3 = V3.sub(V3.add(move, [100, 0, 0]), move);
            const vn2 = V3.normalize(v2);

            const dot = V3.dot(vn1, vn2);
            const mag = 100;

            {
                Debug.clear();
                Debug.drawPoint(down, 4, Debug.WHITE);
                Debug.drawLine(move, V3.sub(move, V3.multiply(vn1, mag)), 2, Debug.RED);
                Debug.drawLine(move, V3.sub(move, V3.multiply(v2, dot)), 2, Debug.CYAN);
            }

            // if (false) {
            //     // gr.lineTo(diff[0], diff[1]);
            //     gr.lineTo(move[0], move[1]);

            //     const v: IVec3 = V3.sub(move, down);
            //     const vn: IVec3 = V3.normalize(v);

            //     const dt = V3.distance(move, down) * 1;
            //     const result = V3.add(down, [vn[0] * dt, vn[1] * dt, 0]);

            //     //
            //     const angle1 = 0;
            //     // const dn = V3.normalize(down);
            //     // const mn = V3.normalize(V3.sub(move, down));
            //     const dn = V3.normalize(V3.sub(down, V3.zero));
            //     const mn = V3.normalize(V3.sub(move, down));
            //     const dot = V3.dot(dn, mn);
            //     console.log(dot);

            //     const angle2 = Math.atan2(move[1] - down[1], move[0] - down[0]);
            //     // console.log((angle2 * 180) / Math.PI);

            //     {
            //         gr.moveTo(down[0], down[1]);
            //         gr.lineStyle(1, 0x00ff00);
            //         gr.lineTo(0, 0);

            //         gr.moveTo(down[0], down[1]);
            //         gr.lineStyle(4, 0xff0000);
            //         gr.lineTo(result[0], result[1]);

            //         gr.moveTo(down[0], down[1]);
            //         gr.lineStyle(2, 0xffffff);
            //         gr.drawCircle(down[0], down[1], 2);
            //     }
            // }
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

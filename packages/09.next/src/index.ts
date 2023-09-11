import { Container, Mesh, Point, RopeGeometry, Shader, Texture } from 'pixi.js';
import { PixiApp, drawVertices } from '../../../shared/pixi';
import { assets } from './assets';
import { Debug } from './debug';
import { Trail } from './trail';
import { V2 } from './vector2';

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

        const radius = 200;
        const axisL = radius * 1.25;
        const center: IVec2 = [window.innerWidth * 0.5, window.innerHeight * 0.5];
        const move: IVec2 = [0, 0];

        // coordinate system
        {
            Debug.drawCircle(center, 1, radius, Debug.GRAY);
            Debug.drawVector([center[0] - axisL, center[1]], [center[0] + axisL, center[1]], 1, Debug.RED);
            Debug.drawVector([center[0], center[1] + axisL], [center[0], center[1] - axisL], 1, Debug.GREEN);
        }

        {
            const count = 360 / 10;
            for (let i = 0; i < count; i++) {
                const t = i / count;
                const angRad = t * TAU;
                const pt: IVec2 = angleToDirection(angRad);

                // Debug.drawPoint([center[0] + pt[0], center[1] + y, 0], 2, Debug.GRAY);
                Debug.drawPoint(V2.add(center, V2.multiply(pt, radius)), 2, Debug.GRAY);
            }
        }

        Debug.fix();

        document.onmousemove = (event) => {
            move[0] = event.pageX;
            move[1] = event.pageY;

            const mv = V2.sub(move, center);
            const mvn = V2.normalize(mv);

            const mag = Math.min(V2.mag(mv), radius);
            // const mag = radius;

            const dv = V2.multiply(mvn, mag);
            const dvn = V2.normalize(dv);

            Debug.clear();
            Debug.drawVector(center, V2.add(center, dv), 2, Debug.CYAN);

            const dotX = V2.dot(dvn, V2.right);
            const dotY = V2.dot(dvn, V2.up);

            const vpx: IVec2 = [dotX * mag, 0];
            const vpy: IVec2 = [0, dotY * mag];

            Debug.drawPoint(V2.add(center, vpx), 4, Debug.RED);
            Debug.drawPoint(V2.add(center, vpy), 4, Debug.GREEN);

            Debug.drawLine(V2.add(center, dv), V2.add(center, vpx), 1, Debug.RED);
            Debug.drawLine(V2.add(center, dv), V2.add(center, vpy), 1, Debug.GREEN);
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

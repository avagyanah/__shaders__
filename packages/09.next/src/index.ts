import { Container, Mesh, Point, RopeGeometry, Shader, Texture } from 'pixi.js';
import { PixiApp, drawVertices } from '../../../shared/pixi';
import { assets } from './assets';
import { Trail } from './trail';

// GeometrySystem.prototype.checkCompatibility = function () {};

window.addEventListener('load', () => {
    window.globals = { pixiApp: new App() };
    window.globals.pixiApp.init();
});

class App extends PixiApp {
    public init(): void {
        const container = new Container();
        this.stage.addChild(container);

        const vertSrc = assets.shaders.next1.vert;
        const fragSrc = assets.shaders.next1.frag;
        const geom = new RopeGeometry(50, [
            //
            // new Point(100, 100),
            // new Point(300, 300),
            // new Point(400, 100),
            // new Point(-100, 0),
            // trail.addPoint(300, 100);
            // trail.addPoint(0, 200);
            // trail.addPoint(-100, 100);

            new Point(0, 0),
            new Point(50, 0),
            new Point(100, 0),
            new Point(150, -100),
            new Point(250, -110),
            new Point(300, -90),

            // new Point(150, 0),
            // new Point(200, 0),
            // new Point(250, 0),
            // new Point(300, 0),
            // new Point(350, 0),
            // new Point(400, 0),
        ]);
        // const mesh = new Mesh(geom, Shader.from(vertSrc, fragSrc, { uSampler: Texture.from(assets.images.bg) }));
        const mesh = new Mesh(geom, Shader.from(vertSrc, fragSrc, { uSampler: Texture.WHITE }));
        mesh.position.set(200, 600);
        drawVertices(mesh, mesh, true, false);
        container.addChild(mesh);

        // let moved = false;
        // document.onmousemove = (event) => {
        //     const pt = new Point(event.pageX, event.pageY);
        //     if (!moved) {
        //         geom.points = [pt];
        //     } else {
        //         geom.points.push(pt);
        //     }
        //     moved = true;
        //     // @ts-expect-error asdf
        //     geom.build();
        // };

        // setInterval(() => {
        //     geom.points.shift();
        //     // @ts-expect-error asdf
        //     geom.build();
        // }, 10);
        // setTimeout(() => {
        //     // geom.points.push(new Point(125, 0), new Point(150, 0), new Point(175, 0), new Point(200, 0));
        //     geom.points.push(
        //         //
        //         new Point(125, 0),
        //         new Point(150, 0),
        //         new Point(175, 0),
        //         new Point(200, 0)
        //     );
        //     // mesh.geometry.dispose();
        //     // @ts-expect-error asdf
        //     geom.build();
        //     console.warn(geom);
        // }, 400);

        //
        const trail = new Trail(Texture.from(assets.images.bg), 50);
        // const trail = new Trail(Texture.WHITE, 50);
        drawVertices(trail, trail, true, false);

        trail.position.set(200, 300);

        // trail.pivot.set(trail.width * 0.5, trail.height * 0.5);
        container.addChild(trail);
        // drawVertices(trail, trail, true, false);

        trail.setOrigin(0, 0);
        trail.addPoint(50, 0);
        trail.addPoint(100, 0);
        trail.addPoint(150, 0);
        trail.addPoint(200, 0);
        // trail.addPoint(150, -100);
        // trail.addPoint(250, -110);
        // trail.addPoint(300, -90);

        // trail.addPoint(300, 100);
        // trail.addPoint(0, 200);
        // trail.addPoint(-100, 100);

        // trail.addPoint(100, 0);
        // trail.addPoint(200, 100);
        // trail.addPoint(0, 200);
        // trail.addPoint(-100, 100);

        // trail.addPoint(50, 0);
        // trail.addPoint(100, 0);
        // trail.addPoint(150, 0);
        // trail.addPoint(200, 0);
        // trail.addPoint(250, 0);
        // trail.addPoint(300, 0);
        // trail.addPoint(350, 0);
        // trail.addPoint(400, 0);

        // const buffer = trail.geometry.getBuffer('aVertexPosition');
        // const verts = trail.geometry.getBuffer('aVertexPosition').data;
        // const newVerts = Float32Array.from(verts);

        // newVerts[8] = verts[8] + 25;
        // newVerts[9] = verts[9] + 25;

        // newVerts[10] = verts[10] + 25;
        // newVerts[11] = verts[11] + 25;

        // buffer.update(newVerts);
        // trail.addPoint(150, 0);
        // trail.addPoint(200, 0);
        // trail.addPoint(250, 0);
        // trail.addPoint(300, 0);
        // trail.addPoint(350, 0);
        // trail.addPoint(400, 0);

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

            console.warn(trail.geometry.getBuffer('aVertexNeighbors').data);
        }

        // let moved = false;
        // document.onmousemove = (event) => {
        //     if (!moved) {
        //         trail.setOrigin(event.pageX, event.pageY);
        //     } else {
        //         trail.addPoint(event.pageX, event.pageY);
        //     }
        //     moved = true;
        // };

        // container.position.set(window.innerWidth * 0.5, window.innerHeight * 0.5);

        // const gr = new Graphics();
        // container.addChild(gr);

        // const radius = 100;
        // const pt = { x: 0, y: 0 };
        // let angle = 0;

        // setInterval(() => {
        //     angle += 0.05;
        //     pt.x += 4;
        //     pt.y = radius * Math.sin(angle);
        //     // gr.clear();
        //     gr.beginFill(0xff0000, 1);
        //     gr.drawCircle(pt.x, pt.y, 10);
        //     gr.endFill();
        //     // mesh.addPoint()

        //     if (angle > 2 * Math.PI) {
        //         angle = 0;
        //         pt.x = 0;
        //         gr.clear();
        //     }
        // }, 0);

        // // UNIFORMS
        // const uniforms = {
        //     uSampler: Texture.from(assets.images.bg),
        //     u_resolution: { x: window.innerWidth, y: window.innerHeight },
        //     u_time: performance.now(),
        //     u_mouse: [0, 0],
        //     u_width: 300,
        // };

        // let point = { x: 0, y: 0 };
        // const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        // document.onmousemove = (event) => {
        //     point.x = event.pageX;
        //     point.y = event.pageY;
        //     uniforms.u_mouse[0] = event.pageX;
        //     uniforms.u_mouse[1] = event.pageY;
        // };

        // window.addEventListener('resize', () => {
        //     uniforms.u_resolution.x = this.renderer.width;
        //     uniforms.u_resolution.y = this.renderer.height;
        // });

        // setInterval(() => {
        //     uniforms.u_time = performance.now();

        //     arr[30] = point.x;
        //     arr[31] = point.y;
        //     arr[14] = point.x;
        //     arr[15] = point.y;

        //     const aMouseBuffer = geometry.getBuffer('aMousePosition');
        //     aMouseBuffer.update(arr);

        //     arr.push(point.x);
        //     arr.push(point.y);
        //     arr.shift();
        //     arr.shift();
        // }, 16);
        // //

        // const width = 0;
        // const height = 40;
        // const geometry = new PlaneGeometry(width, height, 8, 2);
        // // geometry.addAttribute(
        // //     //
        // //     'aVertexIndex',
        // //     [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7],
        // //     1,
        // //     false,
        // //     TYPES.INT
        // // );
        // geometry.addAttribute(
        //     //
        //     'aMousePosition',
        //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //     2,
        //     false,
        //     TYPES.FLOAT
        // );

        // // const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        // // // arr[31] = 10;
        // // // arr[15] = 10;
        // // // arr[1] = 10;
        // // const aMouseBuffer = geometry.getBuffer('aMousePosition');
        // // aMouseBuffer.update(arr);

        // {
        //     const vert = assets.shaders.next1.vert;
        //     const frag = assets.shaders.next1.frag;
        //     const material = Shader.from(vert, frag, uniforms);

        //     const mesh = new Mesh(geometry, material);
        //     // mesh.position.set(100, 100);
        //     // mesh.pivot.set(mesh.width * 0.5, mesh.height * 0.5);

        //     //
        //     container.addChild(mesh);
        //     drawVertices(mesh, mesh, true, false);
        // }
        // {
        //     const vert = assets.shaders.next2.vert;
        //     const frag = assets.shaders.next2.frag;
        //     const material = Shader.from(vert, frag, uniforms);
        //     const mesh = new Mesh(geometry, material);
        //     mesh.position.set(200, 100);

        //     setTimeout(() => {
        //         // const vertexBuffer = geometry.getBuffer('aVertexPosition');
        //     }, 400);
        //     // mesh.pivot.set(mesh.width * 0.5, mesh.height * 0.5);

        //     //
        //     container.addChild(mesh);
        //     drawVertices(mesh, mesh, true, false);
        // }

        // container.position.set(window.innerWidth * 0.5, window.innerHeight * 0.5);
    }
}

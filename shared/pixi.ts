import type { Container, DisplayObject, Mesh, MeshMaterial, Shader } from 'pixi.js';
import { Application, Graphics, Ticker, UPDATE_PRIORITY } from 'pixi.js';
import { getElementById, getResolution } from './utils';
import { DrawCallsPanel, FPSPanel, MemoryPanel, Stats } from '@gameastic/stats';

export abstract class PixiApp extends Application {
    public constructor() {
        super({
            sharedTicker: true,
            backgroundAlpha: 1,
            backgroundColor: 0x343434,
            hello: true,
            resolution: getResolution(),
            view: getElementById<HTMLCanvasElement>('game_canvas'),
        });

        window.addEventListener('resize', this.resize);
        this.resize();

        const stats = new Stats({
            css: 'bottom:0;left:0;transform-origin:left top;cursor:pointer;opacity:0.9',
            renderStep: 500,
        });

        document.body.appendChild(stats.dom);

        const gl = WebGL2RenderingContext.prototype ?? WebGLRenderingContext.prototype;

        stats.addPanel(new FPSPanel('FPS', '#0ff', '#002'));
        stats.addPanel(new MemoryPanel('MB', '#f08', '#201'));
        stats.addPanel(new DrawCallsPanel('DC', '#f60', '#300', gl));
        stats.dom.style.transform = `scale(${2})`;

        stats.showPanel(0);

        Ticker.shared.add(stats.update, stats, UPDATE_PRIORITY.UTILITY);
    }

    public resize = (): void => {
        const { innerWidth, innerHeight } = window;
        this.renderer.resize(innerWidth, innerHeight);
    };

    public abstract init(): Promise<void>;
}

export function centralize(obj: DisplayObject): void {
    const { width, height } = window.globals.pixiApp.renderer.screen;

    obj.position.set(width / 2, height / 2);
}

export function drawVertices(
    mesh: Mesh<Shader | MeshMaterial>,
    obj: Container,
    drawVertices = true,
    drawFaces = true,
    byteLength = 2
): void {
    const gr = new Graphics();
    obj.addChild(gr);

    let verts: Float32Array;
    let indeces: Uint16Array;

    mesh.on('destroyed', () => {
        Ticker.shared.remove(loop);
        gr.destroy();
    });

    const loop = (): void => {
        const geom = mesh.geometry;

        gr.clear();

        verts = geom.getBuffer('aVertexPosition').data as Float32Array;
        indeces = geom.indexBuffer.data as Uint16Array;

        drawFacesFn();
        drawVerticesFn();
    };

    Ticker.shared.add(loop);

    const drawFacesFn = (): void => {
        // faces
        if (drawFaces) {
            gr.lineStyle(2, 0x01ff01, 1);
            for (let i = 0; i < indeces.length; i += 3) {
                const i1 = indeces[i];
                const i2 = indeces[i + 1];
                const i3 = indeces[i + 2];

                const v1 = i1 * byteLength;
                const v2 = i2 * byteLength;
                const v3 = i3 * byteLength;

                const vx1 = verts[v1];
                const vy1 = verts[v1 + 1];

                const vx2 = verts[v2];
                const vy2 = verts[v2 + 1];

                const vx3 = verts[v3];
                const vy3 = verts[v3 + 1];

                gr.moveTo(vx1, vy1);
                gr.lineTo(vx2, vy2);
                gr.lineTo(vx3, vy3);
                gr.lineTo(vx1, vy1);
            }
        }
    };

    const drawVerticesFn = (): void => {
        // vertices
        if (drawVertices) {
            gr.lineStyle(2, 0x01ff01, 1);
            for (let i = 0; i < verts.length; i += 2) {
                const vx = verts[i];
                const vy = verts[i + 1];

                if (i === 0) {
                    gr.moveTo(vx, vy);
                }
                gr.beginFill(0xff0101, 1);
                gr.drawCircle(vx, vy, 5);
            }
            gr.endFill();
        }
    };
}

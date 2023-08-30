import type { Container, DisplayObject, Geometry } from 'pixi.js';
import { Application, Graphics, Ticker } from 'pixi.js';
import { getElementById, getResolution } from './utils';

export abstract class PixiApp extends Application {
    public constructor() {
        super({
            sharedTicker: true,
            backgroundAlpha: 1,
            backgroundColor: 0x343434,
            resolution: getResolution(),
            view: <HTMLCanvasElement>getElementById('game_canvas'),
        });

        window.addEventListener('resize', this.resize);
        this.resize();
    }

    public resize = (): void => {
        const { innerWidth, innerHeight } = window;
        this.renderer.resize(innerWidth, innerHeight);
    };

    public abstract init(): void;
}

export function centralize(obj: DisplayObject): void {
    const { width, height } = window.globals.pixiApp.renderer.screen;

    obj.position.set(width / 2, height / 2);
}

export function drawVertices(
    geom: Geometry,
    obj: Container,
    drawVertices = true,
    drawFaces = true,
    byteLength = 2
): void {
    const gr = new Graphics();
    obj.addChild(gr);

    const verts = geom.getBuffer('aVertexPosition').data as Float32Array;
    const indeces = geom.indexBuffer.data as Uint16Array;

    Ticker.shared.add(() => {
        gr.clear();
        drawFacesFn();
        drawVerticesFn();
    });

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

    drawFacesFn();
    drawVerticesFn();
}

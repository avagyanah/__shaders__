import type { IPoint, Texture } from 'pixi.js';
import { Mesh, Point, RopeGeometry, Shader } from 'pixi.js';
import { assets } from './assets';

const vertSrc = assets.shaders.rope.vert;
const fragSrc = assets.shaders.rope.frag;

export class Rope extends Mesh<Shader> {
    private _count = 0;
    public constructor(count: number, texture: Texture) {
        const uniforms = { uSampler: texture };
        const geometry = getRopeGeom(count);
        const material = getRopeMaterial(vertSrc, fragSrc, uniforms);

        super(geometry, material);

        // setTimeout(() => {
        //     const geom = this.geometry as RopeGeometry;
        //     const points = geom.points;

        //     for (let i = 0; i < points.length; i++) {
        //         points[i].x = i * 10;
        //     }

        //     // geom.points = [new Point(10, 10), new Point(40, 10), new Point(100, 10)];
        //     // geom._width = 10;

        //     const verts = geom.getBuffer('aVertexPosition').data;

        //     console.warn({ verts });

        //     // geom.points.push(new Point(10, 10));
        //     geom.updateVertices();
        //     geom.update();
        // }, 1000);
        // this._count = 0;
    }

    public update(dt: number): void {
        // this._count += 0.1;
        const geom = this.geometry as RopeGeometry;
        const points = geom.points;

        // points[0].x += 1;
        // points[1].x += 0.5;
        for (let i = 0; i < points.length; i++) {
            //     // points[i].y = Math.sin(i * 0.5 + this._count) * 4;
            // points[i].x += i * 0.1;
        }

        // geom.updateVertices();
    }
}

const getRopeGeom = (count: number): RopeGeometry => {
    const points: IPoint[] = [];

    for (let i = 0; i < count; i++) {
        points.push(new Point());
    }

    if (count === 0) {
        points.push(new Point());
    }

    return new RopeGeometry(44, points);
};

const getRopeMaterial = (vert: string, frag: string, uniforms: Record<string, any>): Shader => {
    const shader = Shader.from(vert, frag, uniforms);

    return shader;
};

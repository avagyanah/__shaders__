import type { IPoint, Texture } from 'pixi.js';
import { Mesh, Point, RopeGeometry, Shader } from 'pixi.js';

export class Rope extends Mesh<Shader> {
    public constructor(
        width: number,
        height: number,
        count: number,
        vertSrc: string,
        fragSrc: string,
        texture: Texture
    ) {
        const geom = getRopeGeometry(width, height, count);
        const uniforms = { uSampler: texture };
        const shader = getRopeShader(vertSrc, fragSrc, uniforms);

        super(geom, shader);
    }
}

const getRopeGeometry = (width: number, height: number, count: number): RopeGeometry => {
    const points: IPoint[] = [];

    for (let i = 0; i < count; i++) {
        const pt = new Point();
        pt.x = i * (width / count);
        pt.y = 0;

        points.push(pt);
    }

    const geom = new RopeGeometry(width, points);

    return geom;
};

const getRopeShader = (vert: string, frag: string, uniforms: Record<string, any>): Shader => {
    const shader = Shader.from(vert, frag, uniforms);

    return shader;
};

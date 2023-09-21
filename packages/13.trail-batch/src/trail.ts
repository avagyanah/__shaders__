import type { Texture } from 'pixi.js';
import { Mesh, MeshGeometry, Program, Shader, TYPES } from 'pixi.js';
import { assets } from './assets';

interface ITrailUniforms extends Record<string, any> {
    uSampler: Texture;
    uWidth: number;
    uNodes: number;
}

export class Trail extends Mesh<Shader> {
    protected $uniforms: ITrailUniforms;
    protected $geom!: TrailGeometry;
    protected $mat!: TrailMaterial;

    public constructor(texture: Texture, width: number) {
        const uniforms: ITrailUniforms = { uSampler: texture, uWidth: width, uNodes: 0 };

        super(new TrailGeometry(width, uniforms), new TrailMaterial(uniforms));

        this.$uniforms = uniforms;
        this.$geom = this.geometry as TrailGeometry;
        this.$mat = this.material as TrailMaterial;
    }

    public setOrigin(x: number, y: number): void {
        this.$geom.setOrigin(x, y);
    }

    public addPoint(x: number, y: number): void {
        this.$geom.addPoint(x, y);
    }

    public removePoint(): void {
        this.$geom.removePoint();
    }

    public update(dt: number): void {
        //
    }
}

class TrailGeometry extends MeshGeometry {
    private _points: number[] = [0, 0];

    public constructor(private readonly _width: number, private readonly _uniforms: ITrailUniforms) {
        super(new Float32Array(0), new Float32Array(0), new Uint16Array(0));

        this.addAttribute('aVertexIndex', new Uint32Array(0), 1, false, TYPES.FLOAT);
        this.addAttribute('aVertexNeighbors', new Float32Array(0), 4, false, TYPES.FLOAT);
    }

    public setOrigin(x: number, y: number): void {
        this._points = [x, y];
        this._uniforms.uNodes = 1;
    }

    public removePoint(): void {
        if (this._points.length < 2) {
            return;
        }

        this._points.splice(0, 2);

        this._update();
    }

    public addPoint(x: number, y: number): void {
        this._points.push(x, y);

        this._update();
    }

    private _update(): void {
        const pp = this._points;

        const l = pp.length;
        if (l < 4) {
            return;
        }

        this._uniforms.uNodes = l / 2;

        const vertexNeighborsBuffer = this.getBuffer('aVertexNeighbors');
        const vn = new Float32Array(l * 2 * 2);

        const vertexPositionBuffer = this.getBuffer('aVertexPosition');
        const vp = new Float32Array(l * 2);

        const vertexIndexBuffer = this.getBuffer('aVertexIndex');
        const vi = new Float32Array(l);

        const uvsBuffer = this.getBuffer('aTextureCoord');
        const uvs = new Float32Array(l * 2);

        const indexBuffer = this.getIndex();
        const faces = new Uint16Array((l - 2) * 3);

        /* uvs */
        for (let i = 0; i < uvs.length / 2; i += 2) {
            const uv = i / (l - 2);
            uvs[i * 2 + 0] = uv;
            uvs[i * 2 + 1] = 0;
            uvs[i * 2 + 2] = uv;
            uvs[i * 2 + 3] = 1;
        }

        /* indices */
        for (let i = 0; i < faces.length; i += 3) {
            const index = i / 3;

            faces[i + 0] = index + 0;
            faces[i + 1] = index + 1;
            faces[i + 2] = index + 2;
        }

        /* vertex index */
        for (let i = 0; i < vi.length; i += 2) {
            vi[i + 0] = i + 0;
            vi[i + 1] = i + 1;
        }

        /* vertex position */
        for (let i = 0; i < vp.length / 2; i += 2) {
            const x = pp[i + 0];
            const y = pp[i + 1];

            // vertex 1
            vp[i * 2 + 0] = x;
            vp[i * 2 + 1] = y;
            // vertex 2
            vp[i * 2 + 2] = x;
            vp[i * 2 + 3] = y;

            // const currX = pp[i + 0];
            // const currY = pp[i + 1];

            // const prevX = pp[i - 2];
            // const prevY = pp[i - 1];

            // const nextX = pp[i + 2];
            // const nextY = pp[i + 3];

            // const curr: IVec2 = [currX, currY];
            // const prev: IVec2 = prevY != null ? [prevX, prevY] : [currX, currY];
            // const next: IVec2 = nextY != null ? [nextX, nextY] : [currX, currY];

            // const angle = Math.atan2(next[1] - prev[1], next[0] - prev[0]);

            // const v1 = V2.rotateAround(curr, [currX, currY - 25], -angle);
            // const v2 = V2.rotateAround(curr, [currX, currY + 25], -angle);

            // // vertex 1
            // vp[i * 2 + 0] = v1[0];
            // vp[i * 2 + 1] = v1[1];
            // // vertex 2
            // vp[i * 2 + 2] = v2[0];
            // vp[i * 2 + 3] = v2[1];

            // console.log(radToDeg(angle));
        }
        console.warn('___________________________');

        /* vertex neighbors */
        const vnl = vn.length;

        vn[0] = vn[4] = pp[0];
        vn[1] = vn[5] = pp[1];
        vn[2] = vn[6] = pp[2];
        vn[3] = vn[7] = pp[3];

        vn[vnl - 4] = vn[vnl - 8] = pp[l - 4];
        vn[vnl - 3] = vn[vnl - 7] = pp[l - 3];
        vn[vnl - 2] = vn[vnl - 6] = pp[l - 2];
        vn[vnl - 1] = vn[vnl - 5] = pp[l - 1];

        for (let i = 2; i < vn.length / 4 - 2; i += 2) {
            vn[i * 4 + 0] = vn[i * 4 + 4] = pp[i - 2];
            vn[i * 4 + 1] = vn[i * 4 + 5] = pp[i - 1];
            vn[i * 4 + 2] = vn[i * 4 + 6] = pp[i + 2];
            vn[i * 4 + 3] = vn[i * 4 + 7] = pp[i + 3];
        }

        // #update
        vertexNeighborsBuffer.update(vn);
        vertexPositionBuffer.update(vp);
        vertexIndexBuffer.update(vi);
        indexBuffer.update(faces);
        uvsBuffer.update(uvs);
    }
}

const vertSrc = assets.shaders.trail.vert;
const fragSrc = assets.shaders.trail.frag;

class TrailMaterial extends Shader {
    public constructor(private readonly _uniforms: ITrailUniforms) {
        super(new Program(vertSrc, fragSrc), _uniforms);
    }
}

// class TrailMaterial extends MeshMaterial {
//     public constructor(private readonly _uniforms: ITrailUniforms) {
//         super(Texture.WHITE, {
//             program: new Program(vertSrc, fragSrc),
//             uniforms: _uniforms,
//         });
//     }
// }

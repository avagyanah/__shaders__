import type { Texture } from 'pixi.js';
import { Mesh, MeshGeometry, Program, Shader, TYPES } from 'pixi.js';
import { Vector3 } from 'three';
import { assets } from './assets';

interface ITrailUniforms extends Record<string, any> {
    uSampler: Texture;
    uWidth: number;
    uNodes: number;
}

type IVec2 = [number, number];
type IVec3 = [number, number, number];

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

        /* vertex position */
        for (let i = 0; i < vp.length / 2; i += 2) {
            const x = pp[i];
            const y = pp[i + 1];

            vp[i * 2 + 0] = x;
            vp[i * 2 + 1] = y - 25;
            vp[i * 2 + 2] = x;
            vp[i * 2 + 3] = y + 25;

            const currX = pp[i];
            const currY = pp[i + 1];

            const prevX = pp[i - 2] ?? currX;
            const prevY = pp[i - 1] ?? currY;

            const nextX = pp[i + 2] ?? currX;
            const nextY = pp[i + 3] ?? currY;

            const curr = { x: currX, y: currY };
            const prev = { x: prevX, y: prevY };
            const next = { x: nextX, y: nextY };

            // const v1: IVec3 = [currX - prevX, currY - prevY, 0];
            // const v2: IVec3 = [nextX - currX, nextY - currY, 0];

            const v1 = new Vector3(prevX, prevY, 0);
            const v2 = new Vector3(currX, currY, 0);
            const v3 = new Vector3(nextX, nextY, 0);
            // const v1 = new Vector3(currX - prevX, currY - prevY, 0);
            // const v2 = new Vector3(nextX - currX, nextY - currY, 0);
            // const angle = v1.normalize().reflect(v2.normalize()).reflect(v3.normalize());
            // const angle = v2.reflect(v1).reflect(v3).normalize();
            const angle1 = v2.normalize().dot(v1.normalize());
            const angle2 = v2.normalize().dot(v3.normalize());

            const dx = (angle1 + angle2) * 25;
            const dy = (angle1 + angle2) * 25;

            // const angle = Math.atan2(currY - prevY, currX - prevX);

            // const dx = angle.x * 25;
            // console.warn(angle, dx);

            // const dy = Math.sin(angle.y) * 25;
            // const dx = angle.x;
            // console.warn(dx);

            // const dy = angle.y * 25;

            // vp[i * 2 + 0] = x + dx;
            // vp[i * 2 + 1] = y - dy;
            // vp[i * 2 + 2] = x + dx;
            // vp[i * 2 + 3] = y + dy;

            // console.log(dx);

            // vp[i * 2 + 1] = y + dx * 25;
            // vp[i * 2 + 3] = y + dy * 25;
        }
        // console.warn('---------------------');

        /* vertex index */
        for (let i = 0; i < vi.length; i += 2) {
            vi[i + 0] = i + 0;
            vi[i + 1] = i + 1;
        }

        /* vertex rotate */
        for (let i = 0; i < vp.length / 2; i += 2) {
            // const currX = vp[i * 2 + 0];
            // const currY = vp[i * 2 + 1];
            // const prevX = vp[i * 2 - 4] ?? currX;
            // const prevY = vp[i * 2 - 3] ?? currY;
            // const nextX = vp[i * 2 + 4] ?? currX;
            // const nextY = vp[i * 2 + 5] ?? currY;
            // const curr = { x: currX, y: currY };
            // const prev = { x: prevX, y: prevY };
            // const next = { x: nextX, y: nextY };
            // const angle = Math.atan2(currY - prevY, currX - prevX);
            // const sign = (i * 2) % 2 === 0 ? -1 : 1;
            // console.log(curr, prev, next);
            // const dx = Math.cos(angle) * 25 * sign;
            // const dy = Math.sin(angle) * 25 * sign;
            // console.log(angle, Math.cos(angle));
            // vp[i * 2 + 0] += dx;
            // vp[i * 2 + 1] += dy;
            // const x = pp[i];
            // const y = pp[i + 1];
            // vp[i * 2 + 0] = x;
            // vp[i * 2 + 1] = y - 25;
            // vp[i * 2 + 2] = x;
            // vp[i * 2 + 3] = y + 25;
        }

        // console.warn('');

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

const vertSrc = assets.shaders.next2.vert;
const fragSrc = assets.shaders.next2.frag;

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

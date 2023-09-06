import type { Texture } from 'pixi.js';
import { Mesh, MeshGeometry, Program, Shader, TYPES } from 'pixi.js';
import { assets } from './assets';

interface ITrailUniforms extends Record<string, any> {
    uSampler: Texture;
}

export class Trail extends Mesh<Shader> {
    protected $uniforms: ITrailUniforms;
    protected $geom!: TrailGeometry;
    protected $mat!: TrailMaterial;

    public constructor(texture: Texture, width: number) {
        const uniforms: ITrailUniforms = { uSampler: texture };

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

        this.addAttribute('aVertexNeighbors', new Float32Array(0), 4, false, TYPES.FLOAT);
    }

    public setOrigin(x: number, y: number): void {
        this._points = [x, y];
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
        const l = this._points.length / 2;
        if (l < 2) {
            return;
        }

        const vertexNeighborsBuffer = this.getBuffer('aVertexNeighbors');
        const vertexPositionBuffer = this.getBuffer('aVertexPosition');
        const uvsBuffer = this.getBuffer('aTextureCoord');
        const indexBuffer = this.getIndex();

        const vertexNeighbors = new Float32Array(l * 2 * 2 * 2).fill(1);
        const vertexPosition = new Float32Array(l * 2 * 2);
        const indices = new Uint16Array((l - 1) * 2 * 3);
        const uvs = new Float32Array(l * 2 * 2);

        // #vertices
        {
            const vl = vertexPosition.length / 2;
            for (let i = 0; i < vl; i += 2) {
                const index = i * 2;

                const x = this._points[i];
                const y = this._points[i + 1];

                vertexPosition[index + 0] = x;
                vertexPosition[index + 1] = y - 25;
                vertexPosition[index + 2] = x;
                vertexPosition[index + 3] = y + 25;
            }
        }

        // const nl = vertexNeighbors.length / 2;
        // for (let i = 0; i < nl; i += 2) {
        //     //
        // }
        // console.warn(l, vl, nl);

        // #uvs
        {
            const ul = uvs.length / 2;
            for (let i = 0; i < ul; i += 2) {
                const index = i * 2;
                const uv = i / (ul - 2);

                uvs[index + 0] = uv;
                uvs[index + 1] = 0;
                uvs[index + 2] = uv;
                uvs[index + 3] = 1;
            }
        }

        // #indices
        {
            const il = indices.length;
            for (let i = 0; i < il; i += 3) {
                const index = i / 3;

                indices[i + 0] = index + 0;
                indices[i + 1] = index + 1;
                indices[i + 2] = index + 2;
            }
        }

        // #update
        vertexNeighborsBuffer.update(vertexNeighbors);
        vertexPositionBuffer.update(vertexPosition);
        indexBuffer.update(indices);
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

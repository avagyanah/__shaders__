import type { Texture } from 'pixi.js';
import { Mesh, MeshGeometry, Program, Shader, TYPES } from 'pixi.js';
import { assets } from './assets';

const vertSrc = assets.shaders.next2.vert;
const fragSrc = assets.shaders.next2.frag;

interface ITrailUniforms {
    uSampler: Texture;
    uDeltaTime: number;
}

export class Trail extends Mesh<Shader> {
    protected $uniforms: ITrailUniforms;
    protected $geom!: TrailGeometry;
    protected $mat!: TrailMaterial;

    public constructor(texture: Texture, width: number) {
        super(new TrailGeometry(width), new TrailMaterial({ uSampler: texture, uDeltaTime: 0 }));

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
        this.$uniforms.uDeltaTime = dt;
    }
}

class TrailGeometry extends MeshGeometry {
    private _points: number[] = [];

    public constructor(private readonly _width: number) {
        super(
            //
            new Float32Array(0),
            new Float32Array(0),
            new Uint16Array(0)
        );

        this.addAttribute('aVertexAngle', new Float32Array(), 1, false, TYPES.FLOAT);
    }

    public setOrigin(x: number, y: number): void {
        this._points.push(x, y);
    }

    public removePoint(): void {
        if (this._points.length < 2) {
            return;
        }

        this._points.shift();
        this._points.shift();

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

        const vertexBuffer = this.getBuffer('aVertexPosition');
        const uvsBuffer = this.getBuffer('aTextureCoord');
        const indexBuffer = this.getIndex();

        const vertices = new Float32Array(l * 2 * 2);
        const uvs = new Float32Array(l * 2 * 2);
        const indices = new Uint16Array((l - 1) * 2 * 3);

        // #vertices
        const vl = vertices.length / 2;
        for (let i = 0; i < vl; i += 2) {
            const x = this._points[i];
            const y = this._points[i + 1];

            vertices[i * 2 + 0] = x;
            vertices[i * 2 + 1] = y - 10;
            vertices[i * 2 + 2] = x;
            vertices[i * 2 + 3] = y + 10;
        }

        // #uvs
        const ul = uvs.length / 2;
        for (let i = 0; i < ul; i += 2) {
            const uv = i / (ul - 2);
            uvs[i * 2 + 0] = uv;
            uvs[i * 2 + 1] = 0;
            uvs[i * 2 + 2] = uv;
            uvs[i * 2 + 3] = 1;
        }

        // #indices
        const il = indices.length;
        for (let i = 0; i < il; i += 3) {
            indices[i + 0] = i / 3 + 0;
            indices[i + 1] = i / 3 + 1;
            indices[i + 2] = i / 3 + 2;
        }

        vertexBuffer.update(vertices);
        indexBuffer.update(indices);
        uvsBuffer.update(uvs);
    }
}

class TrailMaterial extends Shader {
    public constructor(uniforms: ITrailUniforms) {
        super(new Program(vertSrc, fragSrc), uniforms);
    }
}

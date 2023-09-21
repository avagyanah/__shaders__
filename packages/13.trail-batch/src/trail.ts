import type { Container, Texture } from 'pixi.js';
import { Mesh, MeshGeometry, Program, Shader, TYPES } from 'pixi.js';
import { assets } from './assets';

interface ITrailConfig {
    texture: Texture;
    width: number;
    lifeTime: number;
}

interface ITrailUniforms extends Record<string, any> {
    uSampler: Texture;
    uWidth: number;
}

export class Trail extends Mesh<Shader> {
    protected $uniforms: ITrailUniforms;
    protected $geom!: TrailGeometry;
    protected $mat!: TrailMaterial;
    protected $target!: Container;
    private _elapsed = 0;

    public constructor(private readonly _config: ITrailConfig) {
        const uniforms: ITrailUniforms = { uSampler: _config.texture, uWidth: _config.width };

        super(new TrailGeometry(uniforms), new TrailMaterial(uniforms));

        this.$uniforms = uniforms;
        this.$geom = this.geometry as TrailGeometry;
        this.$mat = this.material as TrailMaterial;
    }

    public setTarget(target: Container): void {
        this.$target = target;
        this.$geom.points = [];
    }

    public addPoint(x: number, y: number): void {
        this.$geom.addPoint(x, y);
    }

    // public removePoint(): void {
    //     this.$geom.removePoint();
    // }

    public update(dt: number): void {
        const rmc = Math.floor(this._elapsed / this._config.lifeTime);

        if (rmc > 0) {
            // console.log('mta');

            // console.log(this.$geom.points.length);

            // this._elapsed -= dt;
            this.$geom.points = this.$geom.points.slice(rmc * 2);
        } else {
            this._elapsed += dt;
            //
        }

        console.log(this._elapsed);

        this.$geom.update();
    }
}

class TrailGeometry extends MeshGeometry {
    private _points: number[] = [];

    public constructor(private readonly _uniforms: ITrailUniforms) {
        super(new Float32Array(0), new Float32Array(0), new Uint16Array(0));

        this.addAttribute('aVertexIndex', new Uint32Array(0), 1, false, TYPES.FLOAT);
        this.addAttribute('aVertexNeighbors', new Float32Array(0), 4, false, TYPES.FLOAT);
    }

    public get points(): number[] {
        return this._points;
    }

    public set points(value: number[]) {
        this._points = value;
    }

    // public removePoint(): void {
    //     if (this._points.length < 2) {
    //         return;
    //     }

    //     this._points = this._points.slice(2);

    //     // this._points.splice(0, 2);
    // }

    public addPoint(x: number, y: number): void {
        this._points.push(x, y);
    }

    public update(): void {
        const pp = this._points;

        const l = pp.length;
        if (l < 4) {
            return;
        }

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
        }

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

class TrailMaterial extends Shader {
    public constructor(private readonly _uniforms: ITrailUniforms) {
        super(new Program(assets.shaders.trail.vert, assets.shaders.trail.frag), _uniforms);
    }
}

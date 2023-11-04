import type { Container } from 'pixi.js';
import { Mesh, MeshGeometry, Program, Shader, TYPES, Texture } from 'pixi.js';
import { assets } from './assets';

interface IMaterialConfig {
    texture?: Texture;
    vertSrc?: string;
    fragSrc?: string;
    uniforms?: Record<string, any>;
}

interface ITrailConfig {
    material?: string;
    width?: number;
    count?: number;
}

// interface ITrailUniforms extends Record<string, any> {
//     uSampler: Texture;
//     uWidth: number;
// }

// const defaultMaterialConfig: IMaterialConfig = {
//     texture: Texture.WHITE,
//     fragSrc: assets.shaders.trail.frag,
//     uniforms: {},
// };

const vertSrc = assets.shaders.trail.vert;

// const defaultMaterial: Shader = materialFromConfig();
// const geom = new TrailGeometry(_config, uniforms)
// const config = { texture: trailTexture, width: 20, count: 100 };
// const uniforms = { uSampler: config.texture, uWidth: config.width };
// const defaultMaterial = new TrailMaterial(config, uniforms);

// class LinkedList<T> {
//     public head: ListNode<T>;

//     public constructor(head: ListNode<T> = null) {
//         this.head = head;
//     }
// }

// class ListNode<T> {
//     public data: T;
//     public next: ListNode<T>;

//     public constructor(data: T) {
//         this.data = data;
//         this.next = null;
//     }
// }

export class Trail extends Mesh<Shader> {
    private static _materials: Record<string, Shader> = {};

    // protected $uniforms: ITrailUniforms;
    protected $geom!: TrailGeometry;
    protected $mat!: TrailMaterial;
    protected $target!: Container;

    public constructor(config: ITrailConfig) {
        // const uniforms: ITrailUniforms = { uSampler: config?., uWidth: _config.width }

        super(new TrailGeometry(config.count), Trail._materials[config.material ?? 'default']);

        // this.$uniforms = uniforms;
        this.$geom = this.geometry as TrailGeometry;
        this.$mat = this.material as TrailMaterial;
    }

    public static addMaterial(name: string, config: IMaterialConfig): void {
        Trail._materials[name] = Shader.from(vertSrc, config.fragSrc, config.uniforms);
    }

    // public static mergeConfig(config: ITrai, config: IMaterialConfig): void {
    //     Trail._materials[name] = Shader.from(vertSrc, config.fragSrc, config.uniforms);
    // }

    public setTarget(target: Container): void {
        this.$target = target;
    }

    public addPoint(x: number, y: number): void {
        this.$geom.addPoint(x, y);
    }

    public removePoint(): void {
        this.$geom.removePoint();
    }

    public update(): void {
        this.$geom.update();
        // this.$mat.update();
    }

    // protected _render(renderer: Renderer): void {
    //     // super._renderDefault(renderer);
    //     this._renderToBatch(renderer);
    // }
}

class TrailGeometry extends MeshGeometry {
    private _points: number[] = [];
    private _vn: Float32Array;
    private _vp: Float32Array;
    private _vi: Float32Array;
    private _uvs: Float32Array;
    private _faces: Uint16Array;

    public constructor(private readonly _pointsCount: number) {
        super(new Float32Array(0), new Float32Array(0), new Uint16Array(0));

        this.addAttribute('aVertexIndex', new Uint32Array(0), 1, false, TYPES.FLOAT);
        this.addAttribute('aVertexNeighbors', new Float32Array(0), 4, false, TYPES.FLOAT);

        const l = _pointsCount;

        this._vn = new Float32Array(l * 2 * 2);
        this._vp = new Float32Array(l * 2);
        this._vi = new Float32Array(l);
        this._uvs = new Float32Array(l * 2);
        this._faces = new Uint16Array((l - 2) * 3);
    }

    public removePoint(): void {
        this._points.splice(0, 2);
    }

    public addPoint(x: number, y: number): void {
        this._points.push(x, y);

        if (this._points.length === this._pointsCount) {
            this.removePoint();
        }
    }

    public update(): void {
        const pp = this._points;
        const l = pp.length;

        if (l < 4) {
            return;
        }

        const vertexNeighborsBuffer = this.getBuffer('aVertexNeighbors');
        const vertexPositionBuffer = this.getBuffer('aVertexPosition');
        const vertexIndexBuffer = this.getBuffer('aVertexIndex');
        const uvsBuffer = this.getBuffer('aTextureCoord');
        const indexBuffer = this.getIndex();

        const vn = this._vn;
        const vp = this._vp;
        const vi = this._vi;
        const uvs = this._uvs;
        const faces = this._faces;

        // const vn = new Float32Array(l * 2 * 2);
        // const vp = new Float32Array(l * 2);
        // const vi = new Float32Array(l);
        // const uvs = new Float32Array(l * 2);
        // const faces = new Uint16Array((l - 2) * 3);

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
    public constructor(private readonly _config: ITrailConfig, private readonly _uniforms: ITrailUniforms) {
        super(new Program(assets.shaders.trail.vert, assets.shaders.trail.frag), _uniforms);
    }
}

// class TrailMaterial extends MeshMaterial {
//     public constructor(private readonly _config: ITrailConfig, private readonly _uniforms: ITrailUniforms) {
//         super(Texture.WHITE, {
//             program: Program.from(assets.shaders.trail.vert, assets.shaders.trail.frag),
//             uniforms: _uniforms,
//             pluginName: 'batch',
//             alpha: 1,
//             tint: 0xffffff,
//         });
//     }
// }

Trail.addMaterial('default', defaultMaterialConfig);

import {
    DisplayObject,
    Mesh,
    MeshGeometry,
    MeshMaterial,
    Program,
    Renderer,
    RopeGeometry,
    Shader,
    TYPES,
    Texture,
} from 'pixi.js';
import { assets } from './assets';

interface ITrailUniforms extends Record<string, any> {
    uSampler: Texture;
    uWidth: number;
}

export class Trail extends Mesh<Shader> {
    protected $uniforms: ITrailUniforms;
    protected $target!: DisplayObject;
    protected $renderer!: Renderer;

    public constructor(renderer: Renderer, texture: Texture, width: number) {
        const uniforms: ITrailUniforms = { uSampler: texture, uWidth: width };

        super(new TrailGeometry(), new TrailMaterial(uniforms));

        this.$uniforms = uniforms;
        this.$renderer = renderer;
        this.geometry as RopeGeometry;
        this.material as MeshMaterial;
    }

    // public set geometry(value: Geometry) {
    //     if (this._geometry === value) {
    //         return;
    //     }

    //     if (this._geometry) {
    //         this._geometry.refCount--;

    //         if (this._geometry.refCount === 0) {
    //             this._geometry.dispose();
    //         }
    //     }

    //     this._geometry = value;

    //     if (this._geometry) {
    //         this._geometry.refCount++;
    //     }

    //     this.vertexDirty = -1;
    // }

    public setTarget(target: DisplayObject): void {
        this.$target = target;
        this.geometry.points = [target.x, target.y];
    }

    public addPoint(x: number, y: number): void {
        const points = [];

        for (let i = 0; i < this.geometry.points.length; i++) {
            const pt = this.geometry.points[i];
            points.push(pt);
        }

        points.push(x, y);

        // this._geometry.dispose();
        // this._geometry.destroy();
        // this.geometry.refCount -= 1;

        // // this.geometry.buffers = [];
        // // this.geometry.indexBuffer = null;
        // // this.geometry.attributes = {};

        // // this.geometry.glVertexArrayObjects = {};

        // this.geometry.destroy();
        this.geometry = new TrailGeometry();
        this.geometry.instanced = true;
        this.geometry.points = points;

        // this.geometry.refCount = 1;
        // this.geometry.vertexDirty = -1;

        // this.geometry.id--;
        // this.geometry.instanceCount = 0;
    }

    public removePoint(): void {
        // const points = [...this.geometry.points, new Point(x, y)];
        // this.geometry.dispose();
        // this.geometry.destroy();
        // this.geometry = new RopeGeometry(20, points);
    }

    public update(dt: number): void {
        // this.geometry.update();
        // this.material.uv
        // this.shader.uvMatrix.update();
        // this.calculateUvs();
        // this.$renderer.batch.setObjectRenderer(this.$renderer.plugins['batch']);
        this.$renderer.render(this);
    }

    // /**
    //  * Standard renderer draw.
    //  * @param renderer - Instance to renderer.
    //  */
    // protected _render(renderer: Renderer): void {
    //     //         // eslint-disable-next-line @typescript-eslint/naming-convention
    //     // protected _render(renderer: Renderer): void {
    //     //     const geometry: TrailGeometry = <TrailGeometry>this.geometry;
    //     //     this.autoUpdate && geometry.update();
    //     //     super._render(renderer);
    //     // }
    //     // this.geometry.update();
    //     // super._render(renderer);
    //     // this._renderToBatch(renderer);
    // }

    // protected _renderToBatch(renderer: Renderer): void {
    //     const geometry = this.geometry;
    //     const shader = this.shader as unknown as MeshMaterial;

    //     if (shader.uvMatrix) {
    //         shader.uvMatrix.update();
    //         this.calculateUvs();
    //     }

    //     // set properties for batching..
    //     this.calculateVertices();
    //     this.indices = geometry.indexBuffer.data as Uint16Array;
    //     this._tintRGB = shader._tintRGB;
    //     this._texture = shader.texture;

    //     const pluginName = (this.material as unknown as MeshMaterial).pluginName;

    //     renderer.batch.setObjectRenderer(renderer.plugins['batch']);
    //     renderer.plugins['batch'].render(this);
    // }
}

/*  GEOMETRY */
class TrailGeometry extends MeshGeometry {
    private _points: number[] = [0, 0];

    public constructor() {
        super(new Float32Array(0), new Float32Array(0), new Uint16Array(0));

        this.addAttribute('aVertexIndex', new Uint32Array(0), 1, false, TYPES.FLOAT);
        this.addAttribute('aVertexNeighbors', new Float32Array(0), 4, false, TYPES.FLOAT);
    }

    public get points(): number[] {
        return this._points;
    }

    public set points(points: number[]) {
        this._points = points;
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

/* MATERIAL */
const vertSrc = assets.shaders.trail.vert;
const fragSrc = assets.shaders.trail.frag;

class TrailMaterial extends MeshMaterial {
    public constructor(_uniforms: ITrailUniforms) {
        super(null, {
            program: Program.from(vertSrc, fragSrc, 'pixi-trail'),
            uniforms: _uniforms,
        });
    }
}

import { Mesh, MeshMaterial, PlaneGeometry, Program, Texture, WRAP_MODES } from 'pixi.js';
import { PixiApp } from '../../../shared/pixi';
import { assets } from './assets';

window.addEventListener('load', async () => {
    window.globals = { pixiApp: new App() };
    await window.globals.pixiApp.init();
});

/* MATERIAL */
// const vertSrc = assets.shaders.default.vert;
// const fragSrc = assets.shaders.default.frag;
const vertSrc = assets.shaders.water.vert;
const fragSrc = assets.shaders.water.frag;

class CloudMaterial extends MeshMaterial {
    public constructor(uniforms: { uTime: number }) {
        super(null, {
            program: Program.from(vertSrc, fragSrc, 'pixi-clouds'),
            uniforms: uniforms,
        });
    }
}

class App extends PixiApp {
    public async init(): Promise<void> {
        const texture = Texture.from(assets.images.clouds);
        texture.baseTexture.wrapMode = WRAP_MODES.REPEAT;

        // new ShaderMaterial({
        //     vertexShader: shaders.water.vert,
        //     fragmentShader: shaders.water.frag,
        //     transparent: true,
        //     uniforms: {
        //         uTime: { value: 0.0 },
        //         uTexture: { value: waterTexture },
        //         uNoiseTexture: { value: noiseTexture },
        //         uRepeat: { value: 50.0 },
        //         uNoiseRepeat: { value: 25.0 },
        //         uColor: { value: new Color('#4cf9ff') },
        //         uOpacity: { value: 0.75 },
        //     },
        // })

        const uniforms = { uTime: 0, uSampler: texture };

        const geom = new PlaneGeometry(500, 500, 2, 2);
        const mat = new CloudMaterial(uniforms);
        const mesh = new Mesh(geom, mat);
        this.stage.addChild(mesh);

        /* UPDATE */
        this.ticker.add(() => {
            //
        });

        /* RESIZE */
        this.renderer.on('resize', this._onResize, this);
        this._onResize();
    }

    private _onResize(): void {
        //
    }
}

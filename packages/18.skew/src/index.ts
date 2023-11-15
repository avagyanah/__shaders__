import TWEEN from '@tweenjs/tween.js';
import { PixiApp, drawVertices } from '../../../shared/pixi';
import { Mesh, MeshMaterial, PlaneGeometry, Shader, Texture } from 'pixi.js';
import { assets } from './assets';

window.addEventListener('load', () => {
    window.globals = { pixiApp: new App() };
    window.globals.pixiApp.init();
});

class App extends PixiApp {
    public init(): void {
        const rows = 6;
        const columns = 20;
        const factor = rows / columns;
        const width = 600;
        const height = 54;

        const vert = assets.shaders.default.vert;
        const frag = assets.shaders.default.frag;

        const texture = Texture.from(assets.images.floor2);
        const geom = new PlaneGeometry(width, height, 2, 2);
        geom.addAttribute(
            'aVertexPosition',
            [
                //
                20,
                0,
                //
                width - 20,
                0,
                //
                0,
                height,
                //
                width,
                height,
            ],
            2
        );

        const mat = Shader.from(vert, frag, {
            uSampler: texture,
            uWidth: width,
            uHeight: height,
            uRows: 1,
            uColumns: 6,
            uGap: 2,
        });

        const mesh = new Mesh(geom, mat);
        mesh.position.set(this.screen.width / 2, this.screen.height / 2);
        mesh.pivot.set(mesh.width / 2, mesh.height / 2);
        // mesh.scale.set(0.3);
        this.stage.addChild(mesh);

        drawVertices(mesh, mesh, true, false, 2);
        //
        //
        //
        //
        /* UPDATE */
        this.ticker.add(() => {
            TWEEN.update();
        });

        /* RESIZE */
        this.renderer.on('resize', this._onResize, this);
        this._onResize();
    }

    private _onResize(): void {
        //
    }
}

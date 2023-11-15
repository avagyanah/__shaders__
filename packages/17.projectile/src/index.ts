import TWEEN from '@tweenjs/tween.js';
import { PixiApp } from '../../../shared/pixi';
import {
    Container3d,
    SimpleMesh3d2d,
    Camera3d,
    AFFINE,
    ProjectionSurface,
    Projection3d,
    Sprite3d,
    Sprite2d,
    Sprite2s,
} from 'pixi-projection';
import {
    Container,
    Geometry,
    Graphics,
    Mesh,
    MeshMaterial,
    PlaneGeometry,
    Program,
    Rectangle,
    Shader,
    Sprite,
    Texture,
    TextureUvs,
    Transform,
} from 'pixi.js';
import { assets } from './assets';

window.addEventListener('load', () => {
    window.globals = { pixiApp: new App() };
    window.globals.pixiApp.init();
});

class App extends PixiApp {
    public init(): void {
        setTimeout(() => {
            const colors1 = [0xf535e8, 0x9839fd, 0xff7c84, 0xff0d74, 0xffc300, 0x005ffb, 0x00a9ff, 0xd9d9d9];
            const colors2 = [0xb5cef3, 0x8eb5ed, 0x5992e4, 0x3f81e0, 0x246fdb];

            const cont3d = new Container3d();
            const camera3d = new Camera3d();
            camera3d.x = this.screen.width / 2;
            camera3d.y = this.screen.height;
            camera3d.setPlanes(this.screen.height, 0, 0, false);

            for (let r = 0; r < 6; r++) {
                for (let c = 0; c < 20; c++) {
                    //         const sprite = new Sprite3d(Texture.WHITE);
                    //         sprite.width = 100;
                    //         sprite.height = 100;
                    //         sprite.x = c * (100 + 5);
                    //         sprite.y = r * (100 + 5);
                    //         cont3d.addChild(sprite);
                }
            }

            const texture = Texture.from(assets.images.floor);
            const floor = new Sprite3d(texture);
            floor.width = this.screen.width;
            cont3d.euler.set(-1.2, 0, 0);
            // cont3d.position.y = -600;

            floor.anchor.set(0.5, 1);
            cont3d.addChild(floor);

            camera3d.addChild(cont3d);
            this.stage.addChild(camera3d);
        }, 200);

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

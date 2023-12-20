import TWEEN from '@tweenjs/tween.js';
import { Camera3d, Container3d, Sprite3d } from 'pixi-projection';
import { Filter, Texture } from 'pixi.js';
import { PixiApp } from '../../../shared/pixi';
import { assets } from './assets';

window.addEventListener('load', () => {
    window.globals = { pixiApp: new App() };
    window.globals.pixiApp.init();
});

class App extends PixiApp {
    public init(): void {
        const colors1 = [0xf535e8, 0x9839fd, 0xff7c84, 0xff0d74, 0xffc300, 0x005ffb, 0x00a9ff, 0xd9d9d9];
        const colors2 = [0xb5cef3, 0x8eb5ed, 0x5992e4, 0x3f81e0, 0x246fdb];
        const theme = colors1;

        // const camera = new Camera3d();
        // camera.x = this.screen.width / 2;
        // camera.y = this.screen.height;
        // camera.setPlanes(this.screen.height, 0, 0, false);

        // const gr = new Graphics();

        // const getTexture = (colors: number[], dim: number, rows: number, cols: number, gap: number): Texture => {
        //     const w = dim + gap;
        //     const h = dim + gap;

        //     gr.beginFill(0xffffff, 1);

        //     for (let r = 0; r < rows; r++) {
        //         for (let c = 0; c < cols; c++) {
        //             const x = c * w;
        //             const y = r * h;

        //             const color = colors[Math.floor(Math.random() * colors.length)];
        //             gr.fill.color = color;
        //             gr.drawRect(x, y, dim, dim);
        //         }
        //     }

        //     gr.endFill();

        //     return this.renderer.generateTexture(gr);
        // };

        // const vert = assets.shaders.default.vert;
        // const frat = assets.shaders.default.frag;
        // const sprite = new Sprite3d(getTexture(theme, 50, 6, 20, 4));
        // sprite.filters = [new Filter(vert, frat, {})];
        // sprite.width = this.screen.width;
        // sprite.anchor.set(0.5, 1);
        // sprite.euler.set(-1, 0, 0);

        // setInterval(() => {
        //     sprite.texture.destroy(true);
        //     sprite.texture = getTexture(theme, 50, 6, 20, 4);
        // }, 0);

        // camera.addChild(sprite);
        // this.stage.addChild(camera);

        const camera = new Camera3d();
        camera.x = this.screen.width / 2;
        camera.y = this.screen.height;
        camera.euler.set(1, 0, 0);
        camera.setPlanes(this.screen.height, 0, 0, false);

        const scene = new Container3d();
        const vert = assets.shaders.default.vert;
        const frag = assets.shaders.default.frag;
        const filter = new Filter(vert, frag);
        filter.resolution = window.devicePixelRatio;
        scene.filters = [filter];

        const cells: Sprite3d[] = [];
        for (let r = 0; r < 6; r++) {
            for (let c = 0; c < 20; c++) {
                const cell = new Sprite3d(Texture.WHITE);
                cell.width = 50;
                cell.height = 50;
                cell.x = c * (50 + 5);
                cell.y = r * (50 + 5);

                cells.push(cell);
                scene.addChild(cell);
            }
        }

        scene.pivot.x = scene.width / 2;
        scene.pivot.y = scene.height;
        scene.width = this.screen.width;

        const applyTheme = (): void => {
            cells.forEach((cell) => {
                const color = theme[Math.floor(Math.random() * theme.length)];
                cell.tint = color;
            });
        };

        applyTheme();

        setInterval(() => {
            applyTheme();
        }, 600);

        camera.addChild(scene);
        this.stage.addChild(camera);

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

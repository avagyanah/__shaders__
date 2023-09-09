import { Container, DisplayObject, Matrix, Sprite } from 'pixi.js';
import { PixiApp } from '../../../shared/pixi';
import { assets } from './assets';

window.addEventListener('load', () => {
    window.globals = { pixiApp: new App() };
    window.globals.pixiApp.init();
});

class App extends PixiApp {
    public init(): void {
        const c1 = new Container();
        const c2 = new Container();

        c1.position.set(100, 100);
        c2.position.set(300, 300);

        this.ticker.autoStart = true;
        this.ticker.maxFPS = 60;

        const s1 = Sprite.from(assets.images.bg);
        const s2 = Sprite.from(assets.images.bg);

        s1.position.set(100, 100);
        s2.position.set(100, 100);

        s1.scale.set(0.5);
        s2.scale.set(0.4);

        s1.tint = 0xff0000;
        s2.tint = 0x00ff00;

        // s1.anchor.set(0.5);
        // s2.anchor.set(0.5);

        c1.scale.set(0.6);
        c2.scale.set(0.5);

        c1.addChild(s1);
        c2.addChild(s2);

        this.stage.addChild(c1);
        this.stage.addChild(c2);
        //

        worldTranslate(c1, c2);
        worldTranslate(s1, s2);
    }
}

// * @param a - x scale
// * @param b - y skew
// * @param c - x skew
// * @param d - y scale
// * @param tx - x translation
// * @param ty - y translation
const worldTranslate = (obj1: DisplayObject, obj2: DisplayObject): void => {
    obj1.getBounds();
    obj2.getBounds();

    const t1 = obj1.transform;
    const t2 = obj2.transform;

    const w1 = t1.worldTransform;
    const w2 = t2.worldTransform;

    const l1 = t1.localTransform;
    const l2 = t2.localTransform;

    {
        const sx = w2.a / l2.a;
        const sy = w2.d / l2.d;

        const x = t2.position.x - (w2.tx - w1.tx) / sx;
        const y = t2.position.y - (w2.ty - w1.ty) / sy;

        const m = new Matrix(l2.a, l2.b, l2.c, l2.d, x, y);
        t2.setFromMatrix(m);
    }
};

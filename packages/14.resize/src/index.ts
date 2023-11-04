import { Layout } from '@pixi/layout';
import { Container, Sprite } from 'pixi.js';
import { PixiApp } from '../../../shared/pixi';
import { assets } from './assets';

window.addEventListener('load', () => {
    window.globals = { pixiApp: new App() };
    window.globals.pixiApp.init();
});

class App extends PixiApp {
    private _ex1: LayoutStory;

    public init(): void {
        this._ex1 = new LayoutStory();
        this.stage.addChild(this._ex1.view);

        this.renderer.on('resize', this._onResize, this);
        this._onResize();
    }

    private _onResize(): void {
        const { width, height } = this.renderer.screen;
        this._ex1.resize(width, height);
    }
}

class LayoutStory {
    public layout: Layout;
    public view = new Container();
    public w: number;
    public h: number;

    public constructor() {
        this.createLayout();
    }

    public createLayout(): void {
        const image = Sprite.from(assets.images.displacement);
        // image.anchor.set(0.5, 0.5);

        this.layout = new Layout({
            id: 'root',
            content: {
                id: 'adsf',
                content: image,
                styles: {
                    // portrait: {
                    // marginLeft: image.width / 2,
                    // marginTop: image.height / 2,
                    //     visible: true,
                    // },
                    // landscape: {
                    //     marginLeft: image.width / 2,
                    //     marginTop: image.height / 2,
                    //     visible: false,
                    // },
                },
            },
            styles: {
                position: 'center',
                width: image.width,
                height: image.height,
                // background: 'white',
            },
        });
        this.view.addChild(this.layout);
        this.layout.addContent(image);
    }

    public resize(w: number, h: number): void {
        this.w = w;
        this.h = h;

        this.layout?.resize(w, h);
    }
}

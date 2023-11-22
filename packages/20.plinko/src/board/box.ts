import { Container, Sprite } from 'pixi.js';
import { assets } from '../assets';

export class Box {
    public readonly view: Container;

    private readonly _id: number;
    private readonly _position: IPoint;

    public constructor(id: number, position: IPoint) {
        this._id = id;
        this._position = position;

        this.view = this._createView();
        this.view.position.copyFrom(position);
    }

    private _createView(): Container {
        const sprite = Sprite.from(assets.images.box1);
        sprite.anchor.set(0.5, 1);

        const view = new Container();
        view.addChild(sprite);

        return view;
    }
}

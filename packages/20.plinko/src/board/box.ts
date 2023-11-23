import { Container, Sprite, Text } from 'pixi.js';
import { assets } from '../assets';
import { riskConditions } from '../constants';

function getViewConfig(multiplier: number, risk: Risk): { texture: string; color: number } {
    if (multiplier < 1) {
        return {
            texture: 'box3',
            color: 0x05ffd2,
        };
    }

    if (multiplier > riskConditions[risk]) {
        return {
            texture: 'box1',
            color: 0xff48d8,
        };
    }

    return {
        texture: 'box2',
        color: 0xfffa7f,
    };
}

export class Box {
    public readonly view: Container;

    private readonly _id: number;
    private readonly _position: IPoint;

    public constructor(id: number, position: IPoint, multiplier: number, risk: Risk) {
        this._id = id;
        this._position = position;

        this.view = this._createView(multiplier, risk);
        this.view.position.copyFrom(position);
    }

    private _createView(multiplier: number, risk: Risk): Container {
        const { texture, color } = getViewConfig(multiplier, risk);

        const sprite = Sprite.from(assets.images[texture]);
        sprite.anchor.set(0.5, 0);

        const text = new Text(`${multiplier}`, {
            fontFamily: 'BlenderPro',
            fontSize: 44,
            fill: color,
            fontWeight: '900',
        });
        text.height *= 1.08;
        text.anchor.set(0.5, 0.5);
        text.position.set(0, 60);

        const view = new Container();
        view.addChild(sprite, text);

        return view;
    }
}

// function getColor(val: number, risk: Risk) {
//     if (val < 1) return 0x05ffd2; // blue
//     if (val > riskConditions[risk]) return 0xff48d8; // purple

//     return 0xfffa7f;
// }

// function getTexture(val: number, risk: Risk): string {
//     if (val < 1) return 'box3'; // blue
//     if (val > riskConditions[risk]) return 'box1'; // purple

//     return 'box2';
// }

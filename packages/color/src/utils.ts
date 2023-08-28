import type { DisplayObject } from 'pixi.js';

export const getElementById = <T extends HTMLElement>(id: string): T => {
    return <T>document.getElementById(id);
};

export function getResolution(): number {
    return window.devicePixelRatio;
}

export function centralize(obj: DisplayObject): void {
    const { width, height } = window.globals.app.renderer.screen;

    obj.position.set(width / 2, height / 2);
}

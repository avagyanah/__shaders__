/* eslint-disable @typescript-eslint/naming-convention */

import type { PixiApp } from './shared/pixi';

export declare global {
    interface Window {
        globals: {
            pixiApp: PixiApp;
        };
    }
}

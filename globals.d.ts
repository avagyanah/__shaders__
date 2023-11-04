/* eslint-disable @typescript-eslint/naming-convention */

import type { PixiApp } from './shared/pixi';
import type { ThreeApp } from './shared/three';

export declare global {
    interface Window {
        globals: {
            pixiApp?: PixiApp;
            threeApp?: ThreeApp;
        };
    }
}

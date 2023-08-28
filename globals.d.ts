/* eslint-disable @typescript-eslint/naming-convention */

import type { Application } from 'pixi.js';

export declare global {
    interface Window {
        globals: {
            app: Application & { init: () => void };
        };
    }
}

import { PixiApp } from './pixi-app';

window.addEventListener('load', () => {
    window.globals = { app: new PixiApp() };
    window.globals.app.init();
});

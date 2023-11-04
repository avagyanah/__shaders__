import type { Scene } from 'three';

export interface IThreeScene extends Scene {
    update: (dt: number) => void;
    start: () => void;
}

export abstract class ThreeApp {
    public constructor() {
        //     this.loader = new ThreeLoader();
        //     this.renderer = new ThreeRenderer();
        //     this.camera = new ThreeCamera();
        //     this.scene = scene;
        //     window.addEventListener('resize', this.resize);
        //     this.resize();
        //     const controls = new OrbitControls(this.camera, this.renderer.domElement);
        //     controls.enableDamping = true;
        //     // controls.target.y = 0.5;
    }
    // public start(): void {
    //     this.scene.start();
    //     this.update(0);
    // }
    // public resize = (): void => {
    //     const { innerWidth: width, innerHeight: height } = window;
    //     this.renderer.setSize(width, height, false);
    //     this.camera.aspect = width / height;
    //     this.camera.updateProjectionMatrix();
    // };
    // public readonly update = (elapsed: number): void => {
    //     requestAnimationFrame(this.update);
    //     const dt = elapsed - this._now;
    //     this._now = elapsed;
    //     this.scene.update(dt);
    //     this.renderer.render(this.scene, this.camera);
    // };

    public abstract init(): void;
}

// export class ThreeRenderer extends WebGLRenderer {
//     public constructor() {
//         super({
//             canvas: getElementById('game_canvas'),
//             alpha: true,
//             antialias: true,
//         });
//     }
// }

// export class ThreeLoader {
//     //
// }

// export class ThreeCamera extends PerspectiveCamera {
//     public constructor() {
//         super(40, 1, 0.1, 1000);
//         this.position.set(0, 14, 14);
//         this.lookAt(new Vector3(0, 0, 0));
//     }
// }

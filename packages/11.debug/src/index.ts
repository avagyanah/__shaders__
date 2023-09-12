import { PixiApp } from '../../../shared/pixi';
import { Debug } from './debug';
import { V2 } from './vector2';

const TAU = Math.PI * 2;

window.addEventListener('load', () => {
    window.globals = { pixiApp: new App() };
    window.globals.pixiApp.init();
});

const angleToDirection = (radians: number): IVec2 => {
    return [Math.cos(radians), Math.sin(radians)];
};

class App extends PixiApp {
    public init(): void {
        Debug.setParent(this.stage);

        const radius = 200;
        const axisL = radius * 1.25;
        const center: IVec2 = [window.innerWidth * 0.5, window.innerHeight * 0.5];
        const move: IVec2 = [0, 0];

        // coordinate system
        {
            Debug.drawCircle(center, 1, radius, Debug.GRAY);
            Debug.drawVector([center[0] - axisL, center[1]], [center[0] + axisL, center[1]], 1, Debug.RED);
            Debug.drawVector([center[0], center[1] + axisL], [center[0], center[1] - axisL], 1, Debug.GREEN);
        }

        {
            const count = 360 / 10;
            for (let i = 0; i < count; i++) {
                const t = i / count;
                const angRad = t * TAU;
                const pt: IVec2 = angleToDirection(angRad);

                // Debug.drawPoint([center[0] + pt[0], center[1] + y, 0], 2, Debug.GRAY);
                Debug.drawPoint(V2.add(center, V2.multiply(pt, radius)), 2, Debug.GRAY);
            }
        }

        Debug.fix();

        document.onmousemove = (event) => {
            move[0] = event.pageX;
            move[1] = event.pageY;

            const mv = V2.sub(move, center);
            const mvn = V2.normalize(mv);

            const mag = Math.min(V2.mag(mv), radius);
            // const mag = radius;

            const dv = V2.multiply(mvn, mag);
            const dvn = V2.normalize(dv);

            Debug.clear();
            Debug.drawVector(center, V2.add(center, dv), 2, Debug.CYAN);

            const dotX = V2.dot(dvn, V2.right);
            const dotY = V2.dot(dvn, V2.up);

            const vpx: IVec2 = [dotX * mag, 0];
            const vpy: IVec2 = [0, dotY * mag];

            Debug.drawPoint(V2.add(center, vpx), 4, Debug.RED);
            Debug.drawPoint(V2.add(center, vpy), 4, Debug.GREEN);

            Debug.drawLine(V2.add(center, dv), V2.add(center, vpx), 1, Debug.RED);
            Debug.drawLine(V2.add(center, dv), V2.add(center, vpy), 1, Debug.GREEN);
        };
    }
}

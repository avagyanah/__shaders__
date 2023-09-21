export class V2 {
    public static get zero(): IVec2 {
        return [0, 0];
    }

    public static get one(): IVec2 {
        return [1, 1];
    }

    public static get up(): IVec2 {
        return [0, 1];
    }

    public static get down(): IVec2 {
        return [0, -1];
    }

    public static get right(): IVec2 {
        return [1, 0];
    }

    public static get left(): IVec2 {
        return [-1, 0];
    }

    public static magSquared = (v: IVec2): number => {
        return v[0] * v[0] + v[1] * v[1];
    };

    public static mag = (v: IVec2): number => {
        return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
    };

    public static distance = (v1: IVec2, v2: IVec2): number => {
        return V2.mag(V2.sub(v2, v1));
    };

    public static distanceSquared = (v1: IVec2, v2: IVec2): number => {
        return V2.magSquared(V2.sub(v2, v1));
    };

    public static normalize = (v: IVec2): IVec2 => {
        return V2.divide(v, V2.mag(v) || 1);
    };

    public static add = (v1: IVec2, v2: IVec2): IVec2 => {
        return [v1[0] + v2[0], v1[1] + v2[1]];
    };

    public static addScalar = (v1: IVec2, s: number): IVec2 => {
        return [v1[0] + s, v1[1] + s];
    };

    public static sub = (v1: IVec2, v2: IVec2): IVec2 => {
        return [v1[0] - v2[0], v1[1] - v2[1]];
    };

    public static subScalar = (v1: IVec2, s: number): IVec2 => {
        return [v1[0] - s, v1[1] - s];
    };

    public static multiply = (v: IVec2, scalar: number): IVec2 => {
        return [v[0] * scalar, v[1] * scalar];
    };

    public static divide = (v: IVec2, scalar: number): IVec2 => {
        return V2.multiply(v, 1 / (scalar || 1));
    };

    public static dot = (v1: IVec2, v2: IVec2): number => {
        return v1[0] * v2[0] + v1[1] * v2[1];
    };

    public static det = (v1: IVec2, v2: IVec2): number => {
        return v1[0] * v2[1] - v1[1] * v2[0];
    };

    public static angle = (v: IVec2): number => {
        return Math.atan2(v[1], v[0]);
    };

    public static angleBetween = (v1: IVec2, v2: IVec2): number => {
        return Math.atan2(v2[1] - v1[1], v2[0] - v1[0]);
    };

    // function rotate(v1x, v1y, v2x, v2y, angle) {
    //     var radians = (Math.PI / 180) * angle,
    //         cos = Math.cos(radians),
    //         sin = Math.sin(radians),
    //         nx = (cos * (v2x - v1x)) + (sin * (v2y - v1y)) + v1x,
    //         ny = (cos * (v2y - v1y)) - (sin * (v2x - v1x)) + v1y;
    //     return [nx, ny];
    // }

    public static rotateAround = (v1: IVec2, v2: IVec2, angle: number): IVec2 => {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const x = cos * (v2[0] - v1[0]) + sin * (v2[1] - v1[1]) + v1[0];
        const y = cos * (v2[1] - v1[1]) - sin * (v2[0] - v1[0]) + v1[1];

        return [x, y];
    };

    public static fromAngle(radians: number, length: number): IVec2 {
        return [Math.cos(radians) * length, Math.sin(radians) * length];
    }
}

export class V3 {
    public static get normal2D(): IVec3 {
        return [0, 0, 1];
    }

    public static get zero(): IVec3 {
        return [0, 0, 0];
    }

    public static get one(): IVec3 {
        return [1, 1, 1];
    }

    public static get up(): IVec3 {
        return [0, 1, 0];
    }

    public static get down(): IVec3 {
        return [0, -1, 0];
    }

    public static get right(): IVec3 {
        return [1, 0, 0];
    }

    public static get left(): IVec3 {
        return [-1, 0, 0];
    }

    public static get back(): IVec3 {
        return [0, 0, -1];
    }

    public static get forward(): IVec3 {
        return [0, 0, 1];
    }

    public static magSquared = (v: IVec3): number => {
        return v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
        // return V3.dot(v, v);
    };

    public static mag = (v: IVec3): number => {
        return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
        // return Math.sqrt(V3.dot(v, v));
    };

    public static distance = (v1: IVec3, v2: IVec3): number => {
        return V3.mag(V3.sub(v2, v1));
    };

    public static distanceSquared = (v1: IVec3, v2: IVec3): number => {
        return V3.magSquared(V3.sub(v2, v1));
    };

    public static normalize = (v: IVec3): IVec3 => {
        return V3.divide(v, V3.mag(v) || 1);
    };

    public static add = (v1: IVec3, v2: IVec3): IVec3 => {
        return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]];
    };

    public static addScalar = (v1: IVec3, s: number): IVec3 => {
        return [v1[0] + s, v1[1] + s, v1[2] + s];
    };

    public static sub = (v1: IVec3, v2: IVec3): IVec3 => {
        return [v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2]];
    };

    public static subScalar = (v1: IVec3, s: number): IVec3 => {
        return [v1[0] - s, v1[1] - s, v1[2] - s];
    };

    public static multiply = (v: IVec3, scalar: number): IVec3 => {
        return [v[0] * scalar, v[1] * scalar, v[2] * scalar];
    };

    public static divide = (v: IVec3, scalar: number): IVec3 => {
        return V3.multiply(v, 1 / (scalar || 1));
    };

    public static dot = (v1: IVec3, v2: IVec3): number => {
        return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
    };

    public static fromAngle(radians: number, length: number): IVec3 {
        return [Math.cos(radians) * length, Math.sin(radians) * length, 0];
    }
}

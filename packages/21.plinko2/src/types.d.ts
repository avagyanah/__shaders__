type Risk = 'LOW' | 'MEDIUM' | 'HIGH';
type Side = 'LEFT' | 'RIGHT';
type Direction = 0 | 1 | -1;
type PinPositionType = 'common' | 'side' | 'bottom';
type PinID = number;

interface IPoint {
    x: number;
    y: number;
}

type Path = Array<TransformEntry | CollisionEntry>;

type TransformEntry = [number, number, number];
type CollisionEntry = { pinID: PinID; row: number; col: number };

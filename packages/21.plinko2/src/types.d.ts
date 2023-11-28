type Risk = 'LOW' | 'MEDIUM' | 'HIGH';
type Side = 'LEFT' | 'RIGHT';
type Direction = 0 | 1 | -1;

interface IPoint {
    x: number;
    y: number;
}

type PathEntry = [number, number, number];
type Path = PathEntry[];

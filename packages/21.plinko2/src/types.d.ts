type Risk = 'LOW' | 'MEDIUM' | 'HIGH';
type Side = 'LEFT' | 'RIGHT';
// type Direction = 0 | 1 | -1;

interface IPoint {
    x: number;
    y: number;
}

type PathEntry = { x: number; y: number; r: number } | { id: string };
type Path = PathEntry[];

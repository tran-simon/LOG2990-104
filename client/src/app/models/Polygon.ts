import { BaseShape } from './BaseShape';
import { Coordinate } from './Coordinate';

export const MIN_POLY_EDGE = 3;
export const MAX_POLY_EDGE = 12;

export class Polygon extends BaseShape {
    startCoordinate: Coordinate;
    endCoordinate: Coordinate;
    readonly nEdge: number;

    constructor(nEdge: number = MIN_POLY_EDGE) {
        super();
        this.nEdge = nEdge <= MAX_POLY_EDGE && nEdge >= MIN_POLY_EDGE ? nEdge : MIN_POLY_EDGE;
    }

    getCenter(): Coordinate {
        this.origin.x = (this.startCoordinate.x + this.endCoordinate.x) / 2;
        this.origin.y = (this.startCoordinate.y + this.endCoordinate.y) / 2;
        return this.origin;
    }
}

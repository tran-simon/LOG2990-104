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
}

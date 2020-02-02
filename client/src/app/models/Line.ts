import { BaseShape } from './BaseShape';
import { Coordinate } from './Coordinate';

export class Line extends BaseShape {
    startCoordinate: Coordinate;
    endCoordinate: Coordinate;

    get Center(): Coordinate {
        if (this.startCoordinate === null || this.endCoordinate === null) {
            this.center = new Coordinate();
            return this.center;
        } else {
            this.center.x = (this.startCoordinate.x + this.endCoordinate.x) / 2;
            this.center.y = (this.startCoordinate.y + this.endCoordinate.y) / 2;
            return this.center;
        }
    }

    constructor() {
        super();
        this.startCoordinate = new Coordinate();
        this.endCoordinate = new Coordinate();
    }
}

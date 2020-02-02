import { BaseShape } from './BaseShape';
import { Coordinate } from './Coordinate';

export class Ellipse extends BaseShape {
    radiusX: number;
    radiusY: number;

    get Center(): Coordinate {
        this.center.x = this.origin.x + this.radiusX;
        this.center.y = this.origin.y + this.radiusY;
        return this.center;
    }

    constructor(rx: number = 0, ry: number = 0) {
        super();
        this.radiusX = rx;
        this.radiusY = ry;
    }
}

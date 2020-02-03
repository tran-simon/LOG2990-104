import { BaseShape } from './BaseShape';
import { Coordinate } from './Coordinate';

export class Ellipse extends BaseShape {
    private radiusX: number;

    get RadiusX(): number {
        return this.radiusX;
    }

    set RadiusX(rx: number) {
        this.radiusX = !rx ? 0 : Math.abs(rx);
    }

    private radiusY: number;

    get RadiusY(): number {
        return this.radiusY;
    }

    set RadiusY(ry: number) {
        this.radiusY = !ry ? 0 : Math.abs(ry);
    }

    constructor(rx: number = 0, ry: number = 0) {
        super();
        this.RadiusX = rx;
        this.RadiusY = ry;
    }

    get center(): Coordinate {
        return new Coordinate(this.origin.x + this.RadiusX, this.origin.y + this.RadiusY);
    }
}

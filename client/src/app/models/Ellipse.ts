import { BaseShape } from './BaseShape';

export class Ellipse extends BaseShape {
    radiusX: number;
    radiusY: number;

    constructor(rx: number = 0, ry: number = 0) {
        super();
        this.radiusX = rx;
        this.radiusY = ry;
    }
}

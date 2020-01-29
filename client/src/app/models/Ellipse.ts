import { BaseShape } from './BaseShape';

export class Ellipse extends BaseShape {
    radiusX: number;
    radiusY: number;

    constructor(rx: number = 0, ry: number = 0) {
        super();
        this.radiusX = this.getGoodRadius(rx);
        this.radiusY = this.getGoodRadius(ry);
    }

    getGoodRadius(value: number): number {
        return value >= 0 ? Math.trunc(value) : 0;
    }
}

import { Polygon } from './Polygon';

export class Rectangle extends Polygon {
    height: number;
    width: number;

    constructor() {
        super(4);
        this.height = 0;
        this.width = 0;
    }

    getHeight(): number {
        return this.endCoordinate.y - this.startCoordinate.y;
    }

    getWidth(): number {
        return this.endCoordinate.x - this.startCoordinate.x;
    }
}

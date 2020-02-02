import { Polygon } from './Polygon';

export class Rectangle extends Polygon {
    height: number;

    get Height(): number {
        if (this.endCoordinate === null || this.startCoordinate === null) {
            this.height = 0;
        } else {
            this.height = this.endCoordinate.y - this.startCoordinate.y;
        }
        return this.height;
    }

    width: number;

    get Width(): number {
        if (this.endCoordinate === null || this.startCoordinate === null) {
            this.width = 0;
        } else {
            this.width = this.endCoordinate.x - this.startCoordinate.x;
        }
        return this.width;
    }

    constructor() {
        super(4);
        this.height = 0;
        this.width = 0;
    }
}

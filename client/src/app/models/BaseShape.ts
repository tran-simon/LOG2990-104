import { Coordinate } from './Coordinate';
import { ShapeProperties } from './ShapeProperties';

export class BaseShape {
    properties: ShapeProperties;
    origin: Coordinate;

    constructor() {
        this.properties = new ShapeProperties();
        this.origin = new Coordinate();
    }

    getCenter(): Coordinate {
        return this.origin;
    }
}

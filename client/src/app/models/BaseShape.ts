import { Coordinate } from './Coordinate';
import { ShapeProperties } from './ShapeProperties';

export abstract class BaseShape {
    properties: ShapeProperties;
    origin: Coordinate;
    startCoord: Coordinate;
    endCoord: Coordinate;

    get center(): Coordinate {
        return this.origin;
    }

    constructor() {
        this.properties = new ShapeProperties();
        this.origin = new Coordinate();
        this.startCoord = new Coordinate();
        this.endCoord = new Coordinate();
    }
}

import { Coordinate } from './Coordinate';
import { ShapeProperties } from './ShapeProperties';

export class BaseShape {
    properties: ShapeProperties;
    origin: Coordinate;
    protected center: Coordinate;

    get Center(): Coordinate {
        this.center = this.origin;
        return this.center;
    }

    constructor() {
        this.properties = new ShapeProperties();
        this.center = this.origin = new Coordinate();
    }
}

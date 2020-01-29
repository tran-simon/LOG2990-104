import { Coordinate } from './Coordinate';
import { ShapeProperties } from './ShapeProperties';

export abstract class BaseShape {
    properties: ShapeProperties;

    protected constructor() {
        this.properties = new ShapeProperties();
    }

    getOrigin(): Coordinate {
        return this.properties.origin;
    }
}

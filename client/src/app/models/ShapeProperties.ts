import { Color } from './Color';
import { Coordinate } from './Coordinate';

export class ShapeProperties {
    // Style
    strokeWidth: number;
    strokeColor: Color;
    strokeOpacity: number;
    fillColor: Color;
    fillOpacity: number;

    // Transformation
    origin: Coordinate;
    angle: number;
    xScale: number;
    yScale: number;

    constructor() {
        this.strokeWidth = 1;
        this.strokeOpacity = 1.0;
        this.strokeColor = new Color(0, 0, 0, 1);
        this.fillOpacity = 1.0;
        this.fillColor = new Color(255, 255, 255, 1);

        this.origin = new Coordinate();
        this.angle = 0; // In degrees
        this.xScale = 1;
        this.yScale = 1;
    }
}

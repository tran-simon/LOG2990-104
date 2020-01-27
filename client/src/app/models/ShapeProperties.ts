import {Color} from './Color';
import {Coordinate} from './Coordinate';

export class ShapeProperties {
  strokeWidth: number;
  fillColor: Color;
  strokeColor: Color;
  rotation: number;
  origin: Coordinate;

  constructor() {
    this.strokeWidth = 1;
    this.fillColor = new Color();
    this.strokeColor = new Color(0, 0, 0);
    this.rotation = 0; // In degrees
    this.origin = new Coordinate();
  }
}

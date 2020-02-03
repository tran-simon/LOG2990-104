import { Color } from './Color';

export class ShapeProperties {
  // Style
  strokeWidth: number;
  strokeColor: Color;
  strokeOpacity: number;
  fillColor: Color;
  fillOpacity: number;
  visible: boolean;

  constructor() {
    this.strokeWidth = 1;
    this.strokeOpacity = 1.0;
    this.strokeColor = new Color(0, 0, 0, 1);
    this.fillOpacity = 1.0;
    this.fillColor = new Color(255, 255, 255, 1);
    this.visible = true;
  }
}

import { Color } from '../utils/color/color';

export class ShapeProperties {
  // Style
  strokeWidth: number;
  strokeColor: Color;
  strokeOpacity: number;
  fillColor: Color;
  fillOpacity: number;
  visible: boolean;

  get visibility(): string {
    return this.visible ? 'visible' : 'hidden';
  }

  constructor() {
    this.strokeWidth = 1;
    this.strokeOpacity = 1.0;
    this.strokeColor = new Color(0, 0, 0);
    this.fillOpacity = 1.0;
    this.fillColor = new Color(255, 255, 255);
    this.visible = true;
  }
}

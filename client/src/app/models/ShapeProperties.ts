import { Color } from 'src/app/utils/color/color';

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
    this.strokeColor = Color.BLACK;
    this.fillOpacity = 1.0;
    this.fillColor = Color.WHITE;
    this.visible = true;
  }
}

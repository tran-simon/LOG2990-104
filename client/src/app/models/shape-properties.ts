import { Color } from 'src/app/utils/color/color';

export class ShapeProperties {
  thickness: number;
  strokeWidth: number;
  strokeColor: Color;
  strokeOpacity: number;
  fillColor: Color;
  visible: boolean;

  get visibility(): string {
    return this.visible ? 'visible' : 'hidden';
  }

  constructor() {
    this.thickness = 1;
    this.strokeWidth = 1;
    this.strokeOpacity = 1.0;
    this.strokeColor = Color.BLACK;
    this.fillColor = Color.WHITE;
    this.visible = true;
  }
}

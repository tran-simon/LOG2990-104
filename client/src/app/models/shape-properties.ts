import { Color } from 'src/app/utils/color/color';

export class ShapeProperties {
  strokeWidth: number;
  strokeColor: Color;
  strokeOpacity: number;
  fillColor: Color;
  visible: boolean;

  get visibility(): string {
    return this.visible ? 'visible' : 'hidden';
  }

  constructor() {
    this.strokeWidth = 1;
    this.strokeOpacity = 1.0;
    this.strokeColor = Color.BLACK;
    this.fillColor = Color.WHITE;
    this.visible = true;
  }
}

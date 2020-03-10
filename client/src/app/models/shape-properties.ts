import { Color } from 'src/app/utils/color/color';

export class ShapeProperties {
  thickness: number;
  strokeWidth: number;
  secondaryColor: Color;
  primaryColor: Color;
  visible: boolean;

  get visibility(): string {
    return this.visible ? 'visible' : 'hidden';
  }

  constructor() {
    this.thickness = 1;
    this.strokeWidth = 1;
    this.secondaryColor = Color.BLACK;
    this.primaryColor = Color.WHITE;
    this.visible = true;
  }
}

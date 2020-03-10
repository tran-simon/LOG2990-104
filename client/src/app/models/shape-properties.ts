import { Color } from 'src/app/utils/color/color';

export class ShapeProperties {
  thickness: number;
  strokeWidth: number;
  secondaryColor: Color;
  primaryColor: Color;

  constructor() {
    this.thickness = 1;
    this.strokeWidth = 1;
    this.secondaryColor = Color.BLACK;
    this.primaryColor = Color.WHITE;
  }
}

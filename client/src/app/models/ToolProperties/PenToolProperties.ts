import { Color } from 'src/app/utils/color/color';
import { ToolProperties } from './ToolProperties';

export class PenToolProperties extends ToolProperties {
  static readonly MIN_THICKNESS = 1;
  static readonly MAX_THICKNESS = 50;

  minThickness = PenToolProperties.MIN_THICKNESS;
  maxThickness = PenToolProperties.MAX_THICKNESS;

  thickness: number;

  constructor(primaryColor: Color, secondaryColor: Color, thickness: number = PenToolProperties.MIN_THICKNESS) {
    super('Pen', primaryColor, secondaryColor);

    this.thickness = thickness;
  }
}

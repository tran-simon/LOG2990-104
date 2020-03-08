import { ToolProperties } from 'src/app/models/tool-properties/tool-properties';
import { ToolType } from 'src/app/models/tools/tool-type';

export class PenToolProperties extends ToolProperties {
  static readonly MIN_THICKNESS: number = 1;
  static readonly MAX_THICKNESS: number = 50;

  minThickness: number;
  maxThickness: number;

  constructor(thickness: number = PenToolProperties.MIN_THICKNESS) {
    super(ToolType.Pen);

    this.strokeWidth = thickness;
    this.minThickness = PenToolProperties.MIN_THICKNESS;
    this.maxThickness = PenToolProperties.MAX_THICKNESS;
  }
}

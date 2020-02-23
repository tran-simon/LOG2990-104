import { ToolProperties } from 'src/app/models/tool-properties/tool-properties';
import { ToolType } from '../tools/tool';

export class PenToolProperties extends ToolProperties {
  static readonly MIN_THICKNESS = 1;
  static readonly MAX_THICKNESS = 50;

  minThickness: number = PenToolProperties.MIN_THICKNESS;
  maxThickness: number = PenToolProperties.MAX_THICKNESS;

  constructor(thickness: number = PenToolProperties.MIN_THICKNESS) {
    super(ToolType.Pen);

    this.strokeWidth = thickness;
  }
}

import { ToolProperties } from 'src/app/models/tool-properties/tool-properties';

export class PenToolProperties extends ToolProperties {
  static readonly MIN_THICKNESS = 1;
  static readonly MAX_THICKNESS = 50;

  minThickness = PenToolProperties.MIN_THICKNESS;
  maxThickness = PenToolProperties.MAX_THICKNESS;

  thickness: number;

  constructor(thickness: number = PenToolProperties.MIN_THICKNESS) {
    super('Pen');

    this.thickness = thickness;
  }
}

import { ToolProperties } from 'src/app/models/tool-properties/tool-properties';

export class PenToolProperties extends ToolProperties {
  static readonly MIN_THICKNESS = 1;
  static readonly MAX_THICKNESS = 50;

  constructor(thickness: number = PenToolProperties.MIN_THICKNESS) {
    super('Pen', PenToolProperties.MIN_THICKNESS, PenToolProperties.MAX_THICKNESS);

    this.thickness = thickness;
  }
}

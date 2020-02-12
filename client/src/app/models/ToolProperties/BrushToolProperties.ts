import { ToolProperties } from './ToolProperties';

export class BrushToolProperties extends ToolProperties {
  static readonly MIN_THICKNESS = 1;
  static readonly MAX_THICKNESS = 50;

  minThickness = BrushToolProperties.MIN_THICKNESS;
  maxThickness = BrushToolProperties.MAX_THICKNESS;

  thickness: number;
  texture: any;

  constructor(thickness: number = BrushToolProperties.MIN_THICKNESS, texture: any = 'TODO') {
    super('Brush');

    this.thickness = thickness;
    this.texture = texture;
  }
}

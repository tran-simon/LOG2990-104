import { BrushTextureType } from 'src/app/models/tool-properties/brush-texture-type';
import { ToolProperties } from 'src/app/models/tool-properties/tool-properties';
import { ToolType } from 'src/app/models/tools/tool-type';

export class BrushToolProperties extends ToolProperties {
  static readonly MIN_THICKNESS = 1;
  static readonly MAX_THICKNESS = 50;

  minThickness: number = BrushToolProperties.MIN_THICKNESS;
  maxThickness: number = BrushToolProperties.MAX_THICKNESS;

  texture: BrushTextureType;

  constructor(thickness: number = BrushToolProperties.MIN_THICKNESS, texture: BrushTextureType = BrushTextureType.TEXTURE_1) {
    super(ToolType.Brush);

    this.strokeWidth = thickness;
    this.texture = texture;
  }
}

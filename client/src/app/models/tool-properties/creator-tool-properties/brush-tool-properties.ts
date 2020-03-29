import { BrushTextureType } from 'src/app/models/tool-properties/creator-tool-properties/brush-texture-type.enum';
import { CreatorToolProperties } from 'src/app/models/tool-properties/creator-tool-properties/creator-tool-properties';

export class BrushToolProperties extends CreatorToolProperties {
  static readonly MIN_THICKNESS: number = 1;
  static readonly MAX_THICKNESS: number = 50;

  minThickness: number = BrushToolProperties.MIN_THICKNESS;
  maxThickness: number = BrushToolProperties.MAX_THICKNESS;

  texture: BrushTextureType;

  constructor(thickness: number = BrushToolProperties.MIN_THICKNESS, texture: BrushTextureType = BrushTextureType.TEXTURE_1) {
    super();

    this.strokeWidth = thickness;
    this.texture = texture;
  }
}

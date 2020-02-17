import { ToolProperties } from 'src/app/models/tool-properties/tool-properties';

export enum BrushTextureType {
  TEXTURE_1 = 'Texture 1',
  TEXTURE_2 = 'Texture 2',
  TEXTURE_3 = 'Texture 3',
  TEXTURE_4 = 'Texture 4',
  TEXTURE_5 = 'Texture 5',
}

export class BrushToolProperties extends ToolProperties {
  static readonly MIN_THICKNESS = 1;
  static readonly MAX_THICKNESS = 50;

  minThickness: number = BrushToolProperties.MIN_THICKNESS;
  maxThickness: number = BrushToolProperties.MAX_THICKNESS;

  texture: BrushTextureType;

  constructor(thickness: number = BrushToolProperties.MIN_THICKNESS, texture: BrushTextureType = BrushTextureType.TEXTURE_1) {
    super('Brush');

    this.thickness = thickness;
    this.texture = texture;
  }
}
